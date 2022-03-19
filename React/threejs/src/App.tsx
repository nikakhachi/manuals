import * as THREE from "three";
import { useEffect } from "react";
import initialize from "./threejs/initialize";
import lights from "./threejs/lights";
import helpers from "./threejs/helpers";
import torus from "./threejs/torus";
import {
  backgroundTexture,
  boxTexture,
  sphereTexture,
} from "./threejs/textures";

function App() {
  useEffect(() => {
    const { scene, camera, renderer, controls } = initialize();
    const { pointLight, ambientLight } = lights(scene);
    const { gridHelper, lightHelper } = helpers(scene, pointLight);
    const torusObject = torus(scene);
    const boxTextureObject = boxTexture(scene);
    const sphereTextureObject = sphereTexture(scene);
    backgroundTexture(scene);

    function animate() {
      requestAnimationFrame(animate);
      torusObject.rotation.x += 0.01;
      torusObject.rotation.y += 0.005;
      torusObject.rotation.z += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas id="bg" />;
}

export default App;
