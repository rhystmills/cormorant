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
  const maskTexture = await promisifyLoad(new THREE.TextureLoader(), './src/mask.png');
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
