import * as THREE from 'three';

export const addLighting = (scene: THREE.Scene) => {
  // const light = new THREE.PointLight(0xffffff, 1, 100);
  // light.position.set(20, 40, 20);
  // light.castShadow = true;
  // scene.add(light);

  // const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // soft white light
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x040303, 0.9); // soft white light

  scene.add(ambientLight);

  const color = 0xffffff;
  const intensity = 0.8;
  const directionalLight = new THREE.DirectionalLight(color, intensity);

  // Set up shadow properties for the light
  directionalLight.shadow.mapSize.width = 512; // default
  directionalLight.shadow.mapSize.height = 512; // default
  directionalLight.shadow.camera.near = 0.5; // default
  directionalLight.shadow.camera.far = 5; // default
  directionalLight.castShadow = true;
  directionalLight.position.set(0.5, 2, 1);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.shadow.camera.left = -4;
  directionalLight.shadow.camera.right = 4;
  directionalLight.shadow.camera.top = -4;
  directionalLight.shadow.camera.bottom = 4;

  scene.add(directionalLight);

  const color2 = 0xffffff;
  const intensity2 = 0.5;
  const directionalLight2 = new THREE.DirectionalLight(color2, intensity2);
  directionalLight2.position.set(0, 3, 1);
  // directionalLight2.castShadow = true;
  // directionalLight.target.position.set(0, 0, 0);
  scene.add(directionalLight2);
  // const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(helper);
};
