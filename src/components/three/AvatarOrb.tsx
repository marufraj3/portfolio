"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDome;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Lens dome: pushes the centre of the disc toward the viewer.
    float r = clamp(length(pos.xy) / 1.0, 0.0, 1.0);
    float dome = sqrt(max(0.0, 1.0 - r * r));
    vDome = dome;
    pos.z += dome * 0.26;

    // Breathing ripple around the rim.
    pos.z += sin(r * 9.0 - uTime * 0.9) * 0.012 * r;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform vec3 uCyan;
  uniform vec3 uViolet;

  varying vec2 vUv;
  varying float vDome;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec2 c = uv - 0.5;
    float d = length(c) * 2.0;

    // Parallax: the face shifts slightly against the frame with the cursor.
    vec2 par = uMouse * 0.014 * (1.0 - d * 0.65);
    vec2 suv = uv + par;

    // Subtle barrel warp so the portrait reads as a curved surface.
    suv = 0.5 + (suv - 0.5) * (1.0 - 0.055 * d * d);

    // Chromatic aberration, stronger toward the rim.
    float ca = 0.0022 + d * 0.006;
    float rC = texture2D(uTex, suv + vec2(ca, 0.0)).r;
    vec3 gC = texture2D(uTex, suv).rgb;
    float bC = texture2D(uTex, suv - vec2(ca, 0.0)).b;
    vec3 col = vec3(rC, gC.g, bC);

    // Grade: lift blacks slightly into blue, add contrast.
    col = (col - 0.5) * 1.09 + 0.5;
    col += vec3(0.008, 0.022, 0.05) * (1.0 - d);

    // Neon rim light.
    float rim = smoothstep(0.52, 1.0, d);
    vec3 rimCol = mix(uCyan, uViolet, 0.5 + 0.5 * sin(atan(c.y, c.x) * 1.5 + uTime * 0.4));
    col += rimCol * pow(rim, 2.0) * 0.85;

    // Inner edge line.
    float edge = smoothstep(0.965, 0.995, d) - smoothstep(0.995, 1.0, d);
    col += rimCol * edge * 1.6;

    // Holographic scan sweep.
    float sweep = smoothstep(0.0, 0.06, abs(fract(uv.y * 0.5 - uTime * 0.06) - 0.5) * 2.0 - 0.94);
    col += uCyan * sweep * 0.10;

    // Fine scanlines + grain keep it from looking like a flat photo.
    col += sin(uv.y * 900.0) * 0.008;
    col += (hash(uv * 900.0 + uTime) - 0.5) * 0.02;

    // Specular highlight that tracks the pointer.
    vec2 hl = c - uMouse * 0.22;
    float spec = exp(-dot(hl, hl) * 9.0) * vDome;
    col += vec3(0.55, 0.78, 1.0) * spec * 0.10;

    // Soft feathered circular mask.
    float alpha = 1.0 - smoothstep(0.90, 1.0, d);
    alpha *= uReveal;

    if (alpha < 0.004) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

export default function AvatarOrb({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const tex = useLoader(THREE.TextureLoader, "/avatar.webp");
  const mesh = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  const material = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;

    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTex: { value: tex },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uReveal: { value: 0 },
        uCyan: { value: new THREE.Color("#4fd7ff") },
        uViolet: { value: new THREE.Color("#8b7cff") },
      },
    });
  }, [tex, gl]);

  const smooth = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uReveal.value = THREE.MathUtils.damp(u.uReveal.value, 1, 2.2, delta);

    smooth.current.lerp(pointer.current, Math.min(1, delta * 3.4));
    u.uMouse.value.copy(smooth.current);

    if (mesh.current) {
      // Slow signature rotation + cursor lean, both damped.
      const t = state.clock.elapsedTime;
      const targetY = Math.sin(t * 0.16) * 0.30 + smooth.current.x * 0.34;
      const targetX = Math.sin(t * 0.11) * 0.07 - smooth.current.y * 0.22;
      mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetY, 3, delta);
      mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetX, 3, delta);
      mesh.current.position.y = Math.sin(t * 0.55) * 0.055;
    }
  });

  return (
    <mesh ref={mesh} material={material} renderOrder={2}>
      <circleGeometry args={[1, 128]} />
    </mesh>
  );
}
