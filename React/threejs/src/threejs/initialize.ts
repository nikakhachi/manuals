import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";

export default () => {
  const canvas = document.querySelector("#bg");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGL1Renderer({
    //@ts-ignore
    canvas,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  return { scene, camera, renderer, controls };
};
