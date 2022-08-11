import * as THREE from 'three';
import {
  Scene, Texture, TextureLoader, WebGLRenderer,
} from 'three';

async function promisifyLoad(loader: TextureLoader, asset: any): Promise<Texture> {
  return new Promise((resolve, reject) => {
    loader.load(asset, resolve, undefined, reject);
  });
}

export async function loadMaskTexture() {
  const maskTexture = await promisifyLoad(new THREE.TextureLoader(), './src/assets/textureMaps/mask.png');
  maskTexture.magFilter = THREE.LinearFilter;
  maskTexture.minFilter = THREE.LinearMipmapLinearFilter;

  maskTexture.wrapS = THREE.RepeatWrapping;
  maskTexture.wrapT = THREE.RepeatWrapping;

  maskTexture.encoding = THREE.sRGBEncoding;

  return maskTexture;
}

export async function loadShaderSource(fileName: string) {
  const response = await fetch(fileName);
  return response.text();
}

export async function loadTextureFromPath(fileName: string) {
  const texture = await promisifyLoad(new THREE.TextureLoader(), fileName);
  texture.encoding = THREE.LinearEncoding;
  return texture;
}

export const loadBackgroundTexture = async (
  fileName: string,
  renderer: WebGLRenderer,
  scene: Scene,
) => {
  const bgTexture = await promisifyLoad(new THREE.TextureLoader(), fileName);
  const bgTarget = new THREE.WebGLCubeRenderTarget(bgTexture.image.height);
  bgTarget.fromEquirectangularTexture(renderer, bgTexture);
  bgTarget.texture.encoding = THREE.sRGBEncoding;
  scene.background = bgTarget.texture;
  return bgTarget.texture;
};

export const loadAllTextures = async (renderer: WebGLRenderer, scene: Scene) => {
  const [
    maskTexture,
    backgroundTexture,
    normalMap,
    roughnessMap,
    bumpMap,
    shadowMap,
  ] = await Promise.all(
    [
      loadMaskTexture(),
      loadBackgroundTexture('./src/assets/background/office.jpeg', renderer, scene),
      loadTextureFromPath('./src/assets/textureMaps/Painted-metal_normal_4k.jpg'),
      loadTextureFromPath('./src/assets/textureMaps/Matte-Plastic_roughness_4k.jpg'),
      loadTextureFromPath('./src/assets/textureMaps/Matte-Plastic_roughness_4k.jpg'),
      loadTextureFromPath('./src/assets/textureMaps/bump_map.jpg'),
      loadTextureFromPath('./src/assets/textureMaps/shadow_map.jpg'),
    ],
  );

  return {
    maskTexture,
    backgroundTexture,
    normalMap,
    roughnessMap,
    bumpMap,
    shadowMap,
  };
};

export const loadShaderFragments = async () => {
  const [
    screenPrologFragment,
    screenEmissiveFragment,
    screenEpilogFragment,
  ] = await Promise.all(
    [
      loadShaderSource('./src/assets/shaders/screen_prolog.glsl'),
      loadShaderSource('./src/assets/shaders/screen_emissive.glsl'),
      loadShaderSource('./src/assets/shaders/screen_epilog.glsl'),
    ],
  );

  return {
    screenPrologFragment,
    screenEmissiveFragment,
    screenEpilogFragment,
  };
};
