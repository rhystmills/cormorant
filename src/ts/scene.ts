import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { addLighting } from './lighting';
import { screenModel } from './meshes';

const rendererOptions = {
  alpha: true,
  antialias: true,
  precision: 'mediump',
};

const setRendererSettings = (renderer: WebGLRenderer) => {
  renderer.setClearColor(0xffffff, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const {
  fov,
  aspectRatio,
  minDrawDistance,
  maxDrawDistance,
  cameraPositionZ,
  cameraPositionY,
  zoomFactor,
  cameraRotationX,
  modelRotationY,
} = {
  fov: 75,
  aspectRatio: window.innerWidth / window.innerHeight,
  minDrawDistance: 0.1,
  maxDrawDistance: 1000,
  cameraPositionZ: 2,
  cameraPositionY: 0,
  zoomFactor: 1.5,
  cameraRotationX: 0,
  modelRotationY: 0.0,
};

const getCamera = () => {
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, minDrawDistance, maxDrawDistance);
  camera.position.z = cameraPositionZ;
  camera.position.y = cameraPositionY;
  camera.rotation.x = cameraRotationX;

  camera.zoom = zoomFactor;
  // camera.fov *= zoomFactor;

  camera.updateProjectionMatrix();

  return camera;
};

export const initialiseScene = () => {
  const scene = new THREE.Scene();
  scene.add(screenModel.scene);

  const camera = getCamera();

  screenModel.scene.rotation.y = modelRotationY;

  addLighting(scene);

  const renderer = new THREE.WebGLRenderer(rendererOptions);
  setRendererSettings(renderer);

  document.body.appendChild(renderer.domElement);
  return ({ scene, camera, renderer });
};
