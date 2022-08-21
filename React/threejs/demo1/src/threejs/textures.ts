import * as THREE from "three";

const boxTexture = (scene: THREE.Scene) => {
  const meTexture = new THREE.TextureLoader().load("/owl.jpeg");
  const me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: meTexture }));
  scene.add(me);
  return me;
};

const sphereTexture = (scene: THREE.Scene) => {
  const moonTexture = new THREE.TextureLoader().load("chameleon.jpg");
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
  moon.position.set(10, 10, -20);
  scene.add(moon);
  return moon;
};

const backgroundTexture = (scene: THREE.Scene) => {
  const spaceTexture = new THREE.TextureLoader().load("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg");
  scene.background = spaceTexture;
  scene.background.encoding = THREE.sRGBEncoding;
};

export { boxTexture, sphereTexture, backgroundTexture };
