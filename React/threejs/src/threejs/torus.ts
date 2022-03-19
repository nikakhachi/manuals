import * as THREE from "three";

export default (scene: THREE.Scene) => {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    wireframe: true,
  });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);

  return torus;
};
