import { OrbitControls } from "@three-ts/orbit-controls";
import { Mesh } from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";

type PropsType = {
  floorX: number;
  floorZ: number;
  floorStartingPoint: number;
  customWallTexture: THREE.Texture;
  mainWalls: Mesh[];
};

const detectCollisionCubes = (object1: Mesh, object2: Mesh) => {
  object1.geometry.computeBoundingBox();
  object2.geometry.computeBoundingBox();
  object1.updateMatrixWorld();
  object2.updateMatrixWorld();

  const box1 = object1.geometry.boundingBox?.clone();
  box1?.applyMatrix4(object1.matrixWorld);

  const box2 = object2.geometry.boundingBox?.clone();
  box2?.applyMatrix4(object2.matrixWorld);

  if (box1?.intersectsBox(box2!)) {
    // console.log(box1, box2);
    return { object1, object2 };
  }

  return false;
};

export const modifyDragControls = (
  dragControls: DragControls,
  controls: OrbitControls,
  { floorX, floorZ, floorStartingPoint, customWallTexture, mainWalls }: PropsType
) => {
  dragControls.addEventListener("dragstart", (e) => {
    controls.enabled = false;
  });

  dragControls.addEventListener("drag", (e) => {
    const mesh: THREE.Mesh = e.object;
    mesh.position.setY(floorStartingPoint);

    mainWalls.forEach((wall) => {
      const collision = detectCollisionCubes(mesh, wall);
      if (collision) {
        if (mesh.position.x < collision.object2.position.x) {
          mesh.position.x = collision.object2.position.x - collision.object1.userData.x / 2;
        } else if (mesh.position.x > collision.object2.position.x) {
          mesh.position.x = collision.object2.position.x + collision.object1.userData.x / 2;
        }
        // if (mesh.position.z > collision.object2.position.z) {
        //   mesh.position.z = collision.object2.position.z + collision.object1.userData.z / 2;
        // } else if (mesh.position.z < collision.object2.position.z) {
        //   mesh.position.z = collision.object2.position.z - collision.object1.userData.z / 2;
        // }
      }
    });

    // const collisionToWall1 = detectCollisionCubes(mesh, mainWalls[0]);
    // if (collisionToWall1) {
    //   const object1Width = collisionToWall1.object1.userData.z;
    //   mesh.position.x = collisionToWall1.object2.position.x;
    // }

    // const collisionToWall2 = detectCollisionCubes(mesh, mainWalls[1]);
    // if (collisionToWall2) {
    //   const object1Width = collisionToWall2.object1.userData.z;
    //   mesh.position.x = collisionToWall2.object2.position.x;
    // }

    // const collisionToWall3 = detectCollisionCubes(mesh, mainWalls[2]);
    // if (collisionToWall3) {
    //   console.log("Z3");
    //   const object1Depth = collisionToWall3.object1.userData.z;
    //   mesh.position.z = collisionToWall3.object2.position.z - object1Depth / 2;
    // }

    // const collisionToWall4 = detectCollisionCubes(mesh, mainWalls[3]);
    // if (collisionToWall4) {
    //   console.log("Z4");
    //   const object1Depth = collisionToWall4.object1.userData.z;
    //   mesh.position.z = collisionToWall4.object2.position.z + object1Depth / 2;
    // }

    // const collisionToWall4 = detectCollisionCubes(mesh, mainWalls[3]);
    // if (collisionToWall4) {
    //   const object1Width = collisionToWall4.object1.userData.z;
    //   mesh.position.x = collisionToWall4.object2.position.x + object1Width / 2;
    // }
  });

  dragControls.addEventListener("hoveron", (e) => {
    const mesh: THREE.Mesh = e.object;
    mesh.position.setY(floorStartingPoint);
    // @ts-ignore
    const material: MeshBasicMaterial = mesh.material;
    if (Array.isArray(material)) return;
    material.color.setRGB(255, 0, 0);
  });

  dragControls.addEventListener("hoveroff", (e) => {
    const mesh: THREE.Mesh = e.object;
    mesh.position.setY(floorStartingPoint);
    // @ts-ignore
    const material: MeshBasicMaterial = mesh.material;
    if (Array.isArray(material)) return;
    material.color.set(0xffffff);
    material.map = customWallTexture;
  });

  dragControls.addEventListener("dragend", (e) => {
    controls.enabled = true;
  });
};
