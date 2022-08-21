import * as THREE from "three";

interface IProps {
  floorX: number;
  floorY: number;
  floorZ: number;
}

const floorPosX = 0;
const floorPosY = 0;
const floorPosZ = 0;

const wallX = 0.1;
const wallY = 5;

const buildInitialFloorWithWalls = (scene: THREE.Scene, { floorX, floorY, floorZ }: IProps) => {
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
  const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, opacity: 0 });
  // wallMaterial.depthWrite = false;
  const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial);
  wall1.position.set(floorX / -2 + wallX / 2, wallY / 2 + floorY / 2, floorPosZ);
  const wall2 = new THREE.Mesh(wallGeometry1, wallMaterial);
  wall2.position.set(floorX / 2 - wallX / 2, wallY / 2 + floorY / 2, floorPosZ);
  const wallGeometry2 = new THREE.BoxGeometry(wallX, wallY, floorX);
  const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
  wall3.rotation.y = Math.PI / 2;
  wall3.position.set(floorPosX, wallY / 2 + floorY / 2, floorZ / 2 - wallX / 2);
  const wall4 = new THREE.Mesh(wallGeometry2, wallMaterial);
  wall4.rotation.y = Math.PI / 2;
  wall4.position.set(floorPosX, wallY / 2 + floorY / 2, floorZ / -2 - wallX / 2);
  scene.add(wall1);
  scene.add(wall2);
  scene.add(wall3);
  scene.add(wall4);
  return { floor, wall1, wall2, wall3, wall4, floorStartingPoint: wallY / 2 + floorY / 2 };
};

export { buildInitialFloorWithWalls };
