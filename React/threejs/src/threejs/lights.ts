import * as THREE from "three";

const getLights = (scene: THREE.Scene) => {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 0, 0);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);
  return { pointLight, ambientLight };
};

export { getLights };
