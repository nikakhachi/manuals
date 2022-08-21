import * as THREE from "three";
import { useEffect } from "react";
import { initialize } from "./threejs/initialize";
import { getLights } from "./threejs/lights";
import { getHelpers } from "./threejs/helpers";
import { getTorus } from "./threejs/torus";
import {
  backgroundTexture,
  boxTexture,
  sphereTexture,
} from "./threejs/textures";

const App: React.FC = () => {
  useEffect(() => {
    const { scene, camera, renderer, controls } = initialize();
    const { pointLight, ambientLight } = getLights(scene);
    const { gridHelper, lightHelper } = getHelpers(scene, pointLight);
    const torusObject = getTorus(scene);
    const boxTextureObject = boxTexture(scene);
    const sphereTextureObject = sphereTexture(scene);
    backgroundTexture(scene);

    const handleWindowResize = (
      camera: any,
      renderer: THREE.WebGL1Renderer
    ) => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      handleWindowResize(camera, renderer);
      requestAnimationFrame(animate);
      torusObject.rotation.x += 0.01;
      torusObject.rotation.y += 0.005;
      torusObject.rotation.z += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas id="bg" />;
};

export default App;
