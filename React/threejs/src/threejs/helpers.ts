import * as THREE from "three";

export default (scene: THREE.Scene, pointLight: THREE.PointLight) => {
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper, lightHelper);
  return { lightHelper, gridHelper };
};
