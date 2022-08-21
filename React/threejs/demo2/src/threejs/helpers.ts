import * as THREE from "three";

const getHelpers = (scene: THREE.Scene, pointLight: THREE.PointLight) => {
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper);
  return { lightHelper, gridHelper };
};

export { getHelpers };
