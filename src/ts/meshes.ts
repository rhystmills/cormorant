import { Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const getModel = async () => {
  const loader = new GLTFLoader();

  return loader.loadAsync('./src/assets/models/comp wip 11.gltf', (gltf) => gltf);
};

export const screenModel = await getModel();

export const getScreenMesh = (screenModel: GLTF, name: string) => {
  const screenMesh = screenModel.scene.children.find(
    (child) => child.getObjectByName(name),
  ) as Mesh;
  return screenMesh;
};

export const getOtherMeshes = (screenModel: GLTF, exclude: string) => {
  const meshes = screenModel.scene.children;
  return meshes.filter((mesh) => mesh.name !== exclude);
};
