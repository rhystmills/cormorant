import * as THREE from 'three';
import { addText, addTextToCanvas, canvas } from './ts/canvas';
import { makeScreenMaterial } from './ts/material';
import { getOtherMeshes, getScreenMesh, screenModel } from './ts/meshes';
import { initialiseScene } from './ts/scene';
import { loadBackgroundTexture, loadMaskTexture, loadShaderSource } from './ts/texture';
import { interpretKeyEvent } from './ts/userInput';

const { scene, camera, renderer } = initialiseScene();

let text = 'All work and no play makes Jack a dull boy';

window.addEventListener('keypress', (event) => {
  text += interpretKeyEvent(event);
});

const screenMesh = getScreenMesh(screenModel, 'Glass');
const otherMeshes = getOtherMeshes(screenModel, 'Glass');
otherMeshes.forEach((mesh) => {
  if (mesh.name.includes('Case')) {
    // Actually a group of meshes
    console.log(mesh);
    mesh.children.forEach((plane) => {
      plane.receiveShadow = true;
    });
  }
  if (mesh.name.includes('dial') || mesh.name.includes('Power')) {
    console.log(mesh);
    mesh.castShadow = true;
  }
});

const [
  maskTexture,
  screenPrologFragment,
  screenEmissiveFragment,
  screenEpilogFragment,
  backgroundTexture,
] = await Promise.all(
  [
    loadMaskTexture(),
    loadShaderSource('./src/assets/textureMaps/screen_prolog.glsl'),
    loadShaderSource('./src/assets/textureMaps/screen_emissive.glsl'),
    loadShaderSource('./src/assets/textureMaps/screen_epilog.glsl'),
    loadBackgroundTexture('./src/assets/background/equirectangular-bg.jpeg', renderer, scene),
  ],
);
const canvasTexture = new THREE.CanvasTexture(canvas);
canvasTexture.flipY = false;

const material = makeScreenMaterial(
  maskTexture,
  screenPrologFragment,
  screenEmissiveFragment,
  screenEpilogFragment,
  canvasTexture,
  backgroundTexture,
);
screenMesh.material = material;

for (let i = 0; i < 20; i++) {
  setTimeout(() => { addTextToCanvas(i, text); }, i * 1000);
}

const animate = () => {
  requestAnimationFrame(animate);
  // gltf.scene.rotation.y += 0.005;
  // eslint-disable-next-line no-plusplus
  // addText(text);
  canvasTexture.needsUpdate = true;
  // if (gltfMesh && (gltfMesh as THREE.Mesh).material && (gltfMesh as THREE.Mesh).material.map) {
  //   console.log("updating");
  //   gltfMesh.
  //   (gltfMesh as THREE.Mesh).material.map.needsUpdate = true;
  // }
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
