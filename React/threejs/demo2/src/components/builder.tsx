import * as THREE from "three";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { initialize } from "../threejs/initialize";
import { getLights } from "../threejs/lights";
import { getHelpers } from "../threejs/helpers";
import { getTorus } from "../threejs/torus";
import { backgroundTexture, boxTexture, sphereTexture } from "../threejs/textures";
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from "react-dat-gui";
import { buildInitialFloorWithWalls } from "../threejs/buildInitialFloorWithWalls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { Mesh, MeshBasicMaterial } from "three";
import styles from "./styles.module.css";
import { OrbitControls } from "@three-ts/orbit-controls";
import { modifyDragControls } from "./modifyDragControls";

interface IProps {
  floorY: number;
  floorX: number;
  floorZ: number;
}

interface INewWallProperties {
  x: number;
  y: number;
  z: number;
  rotated: boolean;
}

const floorPosX = 0;
const floorPosY = 0;
const floorPosZ = 0;

const wallX = 0.1;
const wallY = 5;

const Builder = ({ floorY, floorX, floorZ }: IProps) => {
  const floorStartingPoint = wallY / 2 + floorY / 2;
  const [customizeNewWall, setCustomizeNewWall] = useState(false);
  const [newWallProperties, setNewWallProperties] = useState<INewWallProperties>({
    z: 100,
    x: 40,
    y: 50,
    rotated: false,
  });
  const [wallPreview, setWallPreview] = useState<THREE.Mesh | undefined>();

  const [controllableWalls, setControllableWalls] = useState<THREE.Mesh[]>([]);

  const customWallTexture: MutableRefObject<THREE.Texture | undefined> = useRef();

  const controlsRef: MutableRefObject<OrbitControls | undefined> = useRef();
  const sceneRef: MutableRefObject<THREE.Scene | undefined> = useRef();
  const dragControlsRef: MutableRefObject<DragControls | undefined> = useRef();
  const cameraRef: MutableRefObject<THREE.Camera | undefined> = useRef();
  const rendererRef: MutableRefObject<THREE.Renderer | undefined> = useRef();
  const floorRef: MutableRefObject<THREE.Mesh | undefined> = useRef();
  const mainWallsRef: MutableRefObject<THREE.Mesh[]> = useRef([]);

  useEffect(() => {
    const { scene, camera, renderer, controls } = initialize();

    controlsRef.current = controls;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    customWallTexture.current = new THREE.TextureLoader().load("/wall1.png");

    scene.background = new THREE.Color("lightgray");
    const { pointLight } = getLights(scene);
    getHelpers(scene, pointLight);

    const floorGeometry = new THREE.BoxGeometry(floorX, floorY, floorZ);
    const floorTexture = new THREE.TextureLoader().load("/floor.jpg");
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    floorMaterial.depthWrite = false;
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.renderOrder = 1;
    floor.position.set(floorPosX, floorPosY, floorPosZ);
    scene.add(floor);

    const wallGeometry1 = new THREE.BoxGeometry(wallX, wallY, floorZ);
    const wallTexture = new THREE.TextureLoader().load("/wall.jpg");
    const wall1Material = new THREE.MeshBasicMaterial({ map: wallTexture, opacity: 0 });
    const wall2Material = new THREE.MeshBasicMaterial({ map: wallTexture, opacity: 0 });
    const wall3Material = new THREE.MeshBasicMaterial({ map: wallTexture, opacity: 0 });
    const wall4Material = new THREE.MeshBasicMaterial({ map: wallTexture, opacity: 0 });
    // wallMaterial.depthWrite = false;
    const wall1 = new THREE.Mesh(wallGeometry1, wall1Material);
    wall1.position.set(floorX / -2 + wallX / 2, floorStartingPoint, floorPosZ);
    const wall2 = new THREE.Mesh(wallGeometry1, wall2Material);
    wall2.position.set(floorX / 2 - wallX / 2, floorStartingPoint, floorPosZ);
    const wallGeometry2 = new THREE.BoxGeometry(wallX, wallY, floorX);
    const wall3 = new THREE.Mesh(wallGeometry2, wall3Material);
    wall3.rotation.y = Math.PI / 2;
    wall3.position.set(floorPosX, floorStartingPoint, floorZ / 2 - wallX / 2);
    const wall4 = new THREE.Mesh(wallGeometry2, wall4Material);
    wall4.rotation.y = Math.PI / 2;
    wall4.position.set(floorPosX, floorStartingPoint, floorZ / -2 - wallX / 2);
    scene.add(wall1);
    scene.add(wall2);
    scene.add(wall3);
    scene.add(wall4);

    floorRef.current = floor;
    mainWallsRef.current = [wall1, wall2, wall3, wall4];

    const handleWindowResize = (camera: any, renderer: THREE.WebGL1Renderer) => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      handleWindowResize(camera, renderer);
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  useEffect(() => {
    if (controlsRef.current && sceneRef.current) {
      if (customizeNewWall) {
        if (wallPreview) {
          wallPreview.geometry.dispose();
          if (!Array.isArray(wallPreview.material)) wallPreview.material.dispose();
          sceneRef.current.remove(wallPreview);
        }
        const customWallGeometry = new THREE.BoxGeometry(newWallProperties.x / 10, newWallProperties.y / 10, newWallProperties.z / 10);
        const customWallMaterial = new THREE.MeshBasicMaterial({ map: customWallTexture.current, opacity: 0 });
        const customWall = new THREE.Mesh(customWallGeometry, customWallMaterial);
        customWall.position.y = floorStartingPoint;
        customWall.userData = {
          x: newWallProperties.x / 10,
          y: newWallProperties.y / 10,
          z: newWallProperties.z / 10,
        };
        setWallPreview(customWall);
        sceneRef.current.add(customWall);
      }
    }
  }, [newWallProperties, customizeNewWall]);

  const handleWallAdd = () => {
    if (
      cameraRef.current &&
      rendererRef.current &&
      wallPreview &&
      controlsRef.current &&
      customWallTexture.current &&
      mainWallsRef.current
    ) {
      const dragControls = new DragControls([wallPreview], cameraRef.current, rendererRef.current.domElement);
      modifyDragControls(dragControls, controlsRef.current, {
        floorX,
        floorZ,
        floorStartingPoint,
        customWallTexture: customWallTexture.current,
        mainWalls: mainWallsRef.current,
      });
      setWallPreview(undefined);
      setCustomizeNewWall(false);
    }
  };

  return (
    <>
      <div className={styles["tooltip"]}>
        <button onClick={() => setCustomizeNewWall((b) => !b)}>Customize New Wall</button>
        {customizeNewWall && (
          <div className={styles["wall-add-div"]}>
            <label>სიგრძე</label>
            <input
              min="1"
              type="number"
              value={newWallProperties.z}
              onChange={(e) => setNewWallProperties((obj) => ({ ...obj, z: Number(e.target.value) }))}
            />
            <hr />
            <label>სიგანე</label>
            <input
              min="1"
              type="number"
              value={newWallProperties.x}
              onChange={(e) => setNewWallProperties((obj) => ({ ...obj, x: Number(e.target.value) }))}
            />
            <hr />
            <label>rotate</label>
            <input
              min="0"
              max="360"
              type="checkbox"
              checked={newWallProperties.rotated}
              onChange={(e) => setNewWallProperties((obj) => ({ ...obj, rotated: e.target.checked }))}
            />
            <hr />
            <button onClick={handleWallAdd}>Add Wall</button>
          </div>
        )}
      </div>
      <canvas id="bg" />
    </>
  );
};

export default Builder;
