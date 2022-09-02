import * as THREE from 'three';
import { Texture } from 'three';

export const makeScreenMaterial = (
  textures: any,
  shaderFragments: any,
  canvasTexture: Texture,
) => {
  const { maskTexture, backgroundTexture } = textures;
  const { screenPrologFragment, screenEmissiveFragment, screenEpilogFragment } = shaderFragments;
  const screenMaterial = new THREE.MeshPhysicalMaterial({
    transparent: false,
    color: 0x040504,
    emissiveMap: canvasTexture,
    roughness: 0.8,
    emissive: 0xffffff,
    reflectivity: 0.0,
    envMap: backgroundTexture,
    side: THREE.DoubleSide,
    clearcoat: 0.2,
  });

  const newUniforms = {
    maskTexture: { type: 't', value: maskTexture },
  };

  // we use onBeforeCompile() to modify one of the standard threejs shaders
  screenMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.maskTexture = newUniforms.maskTexture;
    shader.uniforms.time = { value: 0 };
    shader.uniforms.maskIntensity = { value: 1 };
    shader.uniforms.screenColR = { type: 'vec3', value: new THREE.Vector3(1, 0, 0) };
    shader.uniforms.screenColG = { type: 'vec3', value: new THREE.Vector3(0, 1, 0) };
    shader.uniforms.screenColB = { type: 'vec3', value: new THREE.Vector3(0, 0, 1) };

    // shader.uniforms.lightMap = shadowMap;
    // shader.uniforms.lightMapIntensity = { type: 'float', value: 0.5 };

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `${screenPrologFragment}\n#include <common>`,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      screenEmissiveFragment,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <aomap_fragment>',
      `#include <aomap_fragment>\n${screenEpilogFragment}`,
    );
  };

  return screenMaterial;
};
