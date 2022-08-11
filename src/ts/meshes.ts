import { Mesh, MeshStandardMaterial, Texture } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const getModel = async () => {
  const loader = new GLTFLoader();

  return loader.loadAsync('./src/assets/models/comp wip 14.gltf', (gltf) => gltf);
};

export const screenModel = await getModel();

export const getScreenMesh = (screenModel: GLTF, name: string) => {
  const screenMesh = screenModel.scene.children.find(
    (child) => child.getObjectByName(name),
  ) as Mesh;
  return screenMesh;
};

const identifyMesh = (mesh: Mesh) => {
  const nameLower = mesh.name.toLowerCase();
  // Assume object is a Mesh
  if (nameLower.includes('dial')) return 'dial';
  if (nameLower.includes('power')) return 'power';
  // Object is the Case, a group of two meshes
  const material = mesh.material as MeshStandardMaterial;
  if (material?.name === 'Matte Plastic') return 'case-front';
  if (material?.name === 'Painted Metal') return 'case-back';
  return '';
};

export const modifyNonScreenMeshes = (
  screenModel: GLTF,
  exclude: string,
  textures: { roughnessMap: Texture, bumpMap: Texture, normalMap: Texture},
) => {
  const meshes = screenModel.scene.children;
  const { roughnessMap, bumpMap, normalMap } = textures;
  const nonScreenMeshes = meshes.filter((mesh) => mesh.name !== exclude);

  nonScreenMeshes.forEach((object) => {
    const nameLower = object.name.toLowerCase();
    // the main case
    if (nameLower.includes('case')) {
      object.children.forEach((plane) => {
        plane.receiveShadow = true;

        const material = (plane as Mesh).material as MeshStandardMaterial;
        const meshName = identifyMesh(plane as Mesh);
        if (meshName === 'case-front') {
          material.roughnessMap = roughnessMap;
          material.bumpMap = bumpMap;
          material.bumpScale = 0.002;
        }

        if (meshName === 'case-back') {
          material.normalMap = normalMap;
        }
      });
      return;
    }
    // the detail meshes
    const mesh = object as Mesh;
    const meshName = identifyMesh(mesh);
    if (['dial', 'power'].includes(meshName)) {
      mesh.castShadow = true;
    }
    if (meshName === 'dial') {
      const material = mesh.material as MeshStandardMaterial;
      material.roughness = 0.6;
      material.metalness = 0.2;
      material.bumpMap = bumpMap;
      material.bumpScale = 0.02;
    }
  });
};
