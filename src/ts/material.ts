/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { Texture } from 'three';

export const makeScreenMaterial = (
  maskTexture: any,
  screenPrologFragment: any,
  screenEmissiveFragment: any,
  screenEpilogFragment: any,
  myTexture: any,
  backgroundTexture: Texture,
) => {
  const screenMaterial = new THREE.MeshPhysicalMaterial({
    transparent: false,
    color: 0x040504,
    emissiveMap: myTexture,
    roughness: 0.0,
    emissive: 0xffffff,
    reflectivity: 0.05,
    envMap: backgroundTexture,
    side: THREE.DoubleSide,
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
      '#include <aomap_fragment>' + '\n' + screenEpilogFragment
    );

    // console.log("--- Shader Begin ---");
    // console.log(shader.fragmentShader);
    // console.log("--- Shader End ---");

    screenMaterial.shaderUniforms = shader.uniforms;
  };

  return screenMaterial;
};
