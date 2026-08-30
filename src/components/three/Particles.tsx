"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "@/lib/utils";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uDpr;

  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Orbit around the avatar.
    float ang = uTime * aSpeed * 0.10 + aPhase;
    float c = cos(ang);
    float s = sin(ang);
    p.xz = mat2(c, -s, s, c) * p.xz;

    // Vertical drift + gentle breathing of the whole shell.
    p.y += sin(uTime * 0.42 + aPhase * 5.0) * 0.16;
    p *= 1.0 + sin(uTime * 0.25 + aPhase) * 0.015;

    // Cursor parallax — closer particles move more.
    p.xy += uMouse * (0.10 + aScale * 0.28);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uDpr * (26.0 / max(0.001, -mv.z));

    vColor = aColor;
    float twinkle = 0.45 + 0.55 * sin(uTime * 1.35 + aPhase * 9.0);
    float depthFade = smoothstep(-14.0, -2.0, mv.z);
    vAlpha = twinkle * depthFade;
  }
`;

const fragment = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float glow = exp(-d * 6.5);
    float a = (core * 0.85 + glow * 0.55) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (0.85 + core * 0.9), a);
  }
`;

export default function Particles({
  count = 1100,
  radius = 3.1,
  pointer,
}: {
  count?: number;
  radius?: number;
  pointer: React.RefObject<THREE.Vector2>;
}) {
  const points = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const rand = seeded(20260804);
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const speed = new Float32Array(count);
    const phase = new Float32Array(count);
    const color = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#4fd7ff"),
      new THREE.Color("#8b7cff"),
      new THREE.Color("#c9f2ff"),
      new THREE.Color("#ff5fa2"),
      new THREE.Color("#ffffff"),
    ];
    const weights = [0.42, 0.24, 0.18, 0.06, 0.1];

    for (let i = 0; i < count; i++) {
      // Shell distribution with a hollow centre so the face stays clear.
      const r = radius * (0.62 + Math.pow(rand(), 0.7) * 0.72);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const flat = 0.62; // squash into a disc-ish halo

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * flat;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.75;

      scale[i] = 0.35 + Math.pow(rand(), 2.4) * 1.5;
      speed[i] = 0.35 + rand() * 1.1;
      phase[i] = rand() * Math.PI * 2;

      let pick = rand();
      let idx = 0;
      for (let w = 0; w < weights.length; w++) {
        pick -= weights[w];
        if (pick <= 0) {
          idx = w;
          break;
        }
      }
      const col = palette[idx];
      color[i * 3] = col.r;
      color[i * 3 + 1] = col.g;
      color[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 2);

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1.35 },
        uDpr: { value: 1 },
        uMouse: { value: new THREE.Vector2() },
      },
    });

    return { geometry: geo, material: mat };
  }, [count, radius]);

  const smooth = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uDpr.value = state.viewport.dpr as number;
    smooth.current.lerp(pointer.current, Math.min(1, delta * 2.2));
    material.uniforms.uMouse.value.copy(smooth.current);
    if (points.current) {
      points.current.rotation.y += delta * 0.014;
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
