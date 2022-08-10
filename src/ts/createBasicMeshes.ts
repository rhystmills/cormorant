import * as THREE from 'three';

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000cc, dithering: true, shininess: 100,
  });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
};

export const createLine = () => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const points = [];
  points.push(new THREE.Vector3(1, 2, 1));
  points.push(new THREE.Vector3(1, 1, 1));
  points.push(new THREE.Vector3(2, 1, 1));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  return line;
};
