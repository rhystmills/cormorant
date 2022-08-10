import * as THREE from 'three';
import { addLighting } from './lighting';
import { screenModel } from './meshes';

const rendererOptions = {
  alpha: true,
  antialias: true,
  precision: 'highhp',
};

export const initialiseScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.z = 2;
  camera.position.y = 0;
  // camera.rotation.x = -0.4;
  scene.add(screenModel.scene);
  // screenModel.scene.rotation.y = 1.2;

  addLighting(scene);

  const renderer = new THREE.WebGLRenderer(rendererOptions);
  renderer.setClearColor(0xffffff, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return ({ scene, camera, renderer });
};
