import React from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, ArcLayer } from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import CONFIG from "./config";
import ReactMapGL from "react-map-gl";
import { max } from "d3-array";

export default function Trips() {
  const [time, setTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());
  const [animation] = React.useState({});
  const [loopLength, setLoopLength] = React.useState(0);

  React.useEffect(() => {
    setLoopLength(
      max(CONFIG.routes, ({ timestamps }) => max(timestamps)) / 2 || 1000
    );
    setTime(0);
    setStartTime(Date.now());
  }, []);

  React.useEffect(() => {
    console.log("start time updating");
    if (CONFIG.routes.length) {
      animate();
    }
  }, [startTime]);

  const animate = () => {
    window.cancelAnimationFrame(animation.id);
    const timestamp = (Date.now() - startTime) / 1000;
    const loopTime = loopLength / CONFIG.SPEED / 2;
    const time = ((timestamp % loopTime) / loopTime) * loopLength;
    setTime(time);
    animation.id = window.requestAnimationFrame(animate);
  };

  const layers = [
    new ArcLayer({
      id: "arc-layer",
      data: [
        {
          from: {
            name: "19th St. Oakland (19TH)",
            coordinates: [44.7948, 41.7107],
          },
          to: {
            name: "12th St. Oakland City Center (12TH)",
            coordinates: [44.7648, 41.7167],
          },
        },
      ],
      pickable: true,
      getWidth: 2,
      getHeight: 1,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: (d) => [255, 140, 0],
      getTargetColor: (d) => [255, 140, 200],
    }),
    new ScatterplotLayer({
      id: "scatterplot-layer-of-arc",
      visible: true,
      data: [
        {
          name: "12th St. Oakland City Center (12TH)",
          coordinates: [44.7648, 41.7167],
          exits: 7103,
        },
        {
          coordinates: [44.7948, 41.7107],
          name: "19th St. Oakland (19TH)",
          exits: 3103,
        },
      ],
      pickable: true,
      opacity: 0.2,
      stroked: false,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 15,
      lineWidthMinPixels: 0,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.exits),
      getFillColor: (d) => [255, 140, 0],
      getLineColor: (d) => [0, 0, 0],
      onClick: (i, event) => console.log(i.object),
    }),
    new TripsLayer({
      id: "trips-layer",
      data: CONFIG.routes,
      getPath: (d) => d.routes,
      getTimestamps: (d) => d.timestamps,
      getColor: [255, 140, 150],
      opacity: 0.8,
      widthMinPixels: 2,
      rounded: true,
      trailLength: 30000,
      currentTime: time,
    }),
  ];

  return (
    <>
      <DeckGL
        initialViewState={CONFIG.INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <ReactMapGL
          mapStyle={CONFIG.MAP_STYLE}
          mapboxApiAccessToken={CONFIG.ACCESS_MAPBOX_TOKEN}
        />
      </DeckGL>
    </>
  );
}
