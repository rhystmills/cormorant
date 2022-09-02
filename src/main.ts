import * as THREE from 'three';
import {
  canvas, ctx, redrawCanvas,
} from './ts/canvas';
import { makeScreenMaterial } from './ts/material';
import { getScreenMesh, modifyNonScreenMeshes, screenModel } from './ts/meshes';
import { initialiseScene } from './ts/scene';
import { loadAllTextures, loadShaderFragments } from './ts/texture';
import { handleKeyEvent } from './ts/userInput';
import { View } from './ts/view';

const { scene, camera, renderer } = initialiseScene();

const view = new View(66, 18);

redrawCanvas(ctx, view);

window.addEventListener('keydown', (event) => {
  handleKeyEvent(event, view);
  redrawCanvas(ctx, view);
});

const textures = await loadAllTextures(renderer, scene);
const shaderFragments = await loadShaderFragments();

const canvasTexture = new THREE.CanvasTexture(canvas);
canvasTexture.flipY = false;

const screenMesh = getScreenMesh(screenModel, 'Glass');
modifyNonScreenMeshes(screenModel, 'Glass', textures);
const material = makeScreenMaterial(
  textures,
  shaderFragments,
  canvasTexture,
);
screenMesh.material = material;

const animate = () => {
  requestAnimationFrame(animate);
  // scene.rotation.y += 0.005;
  canvasTexture.needsUpdate = true;
  renderer.render(scene, camera);
};

animate();
