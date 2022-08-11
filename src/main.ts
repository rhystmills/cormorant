import * as THREE from 'three';
import {
  addTextToCanvas, canvas, clearCanvas, ctx,
} from './ts/canvas';
import { makeScreenMaterial } from './ts/material';
import { getScreenMesh, modifyNonScreenMeshes, screenModel } from './ts/meshes';
import { initialiseScene } from './ts/scene';
import { loadAllTextures, loadShaderFragments } from './ts/texture';
import { handleKeyEvent } from './ts/userInput';

const { scene, camera, renderer } = initialiseScene();

const screenData = {
  text: [''],
  currentRow: 0,
  maxLength: 66,
  rows: 18,
};

for (let i = 0; i < screenData.rows; i++) {
  screenData.text.push('');
}

screenData.text.forEach((text: string, i: number) => {
  if (i === screenData.currentRow) { text += '_'; }
  addTextToCanvas(text, i);
});

window.addEventListener('keydown', (event) => {
  handleKeyEvent(event, screenData);
  clearCanvas(ctx);
  screenData.text.forEach((text: string, i: number) => {
    let thisRowText = screenData.text[i];
    if (i === screenData.currentRow) { thisRowText += '_'; }
    addTextToCanvas(thisRowText, i);
  });

  // TODO: redraw all text rows in relative position as a function each refresh
  // Increment row on enter
  // Remove char from current row on backspace
  // Stick all this in a separate file!
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
