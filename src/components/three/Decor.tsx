"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Additive radial glow that sits behind the avatar. */
export function BackGlow() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uA: { value: new THREE.Color("#1c7fd6") },
          uB: { value: new THREE.Color("#6d5bff") },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          uniform float uTime;
          uniform vec3 uA;
          uniform vec3 uB;
          varying vec2 vUv;
          void main() {
            vec2 c = vUv - 0.5;
            float d = length(c) * 2.0;
            float pulse = 0.86 + 0.14 * sin(uTime * 0.6);
            float halo = exp(-d * 3.4) * pulse;
            float ringA = smoothstep(0.42, 0.36, abs(d - 0.36 - sin(uTime * 0.35) * 0.015));
            vec3 col = mix(uA, uB, 0.5 + 0.5 * sin(atan(c.y, c.x) + uTime * 0.25));
            float a = halo * 0.5 + ringA * 0.05;
            gl_FragColor = vec4(col * a * 1.5, a);
          }
        `,
      }),
    [],
  );

  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -0.9]} material={material} renderOrder={0}>
      <planeGeometry args={[7.4, 7.4]} />
    </mesh>
  );
}

/** Tilted neon rings + orbiting nodes that frame the portrait. */
export function Rings() {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Group>(null);

  const mats = useMemo(
    () => ({
      cyan: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#4fd7ff"),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      violet: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#8b7cff"),
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      faint: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#9fdcff"),
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        wireframe: true,
      }),
      node: new THREE.MeshBasicMaterial({ color: new THREE.Color("#d8f4ff") }),
    }),
    [],
  );

  useFrame((s, delta) => {
    const t = s.clock.elapsedTime;
    if (g1.current) g1.current.rotation.z += delta * 0.12;
    if (g2.current) {
      g2.current.rotation.z -= delta * 0.08;
      g2.current.rotation.x = 1.25 + Math.sin(t * 0.2) * 0.08;
    }
    if (g3.current) g3.current.rotation.y += delta * 0.05;
    if (nodes.current) nodes.current.rotation.z = t * 0.24;
  });

  return (
    <group>
      {/* Flat halo ring */}
      <group ref={g1} rotation={[0, 0, 0]}>
        <mesh material={mats.cyan} renderOrder={1}>
          <torusGeometry args={[1.32, 0.004, 8, 220]} />
        </mesh>
        <mesh material={mats.violet} rotation={[0.42, 0.2, 0]} renderOrder={1}>
          <torusGeometry args={[1.55, 0.0035, 8, 220]} />
        </mesh>
      </group>

      {/* Perspective ellipse, like an orbital plane */}
      <group ref={g2} rotation={[1.25, 0, 0]}>
        <mesh material={mats.cyan} renderOrder={1}>
          <torusGeometry args={[1.95, 0.0035, 8, 240]} />
        </mesh>
      </group>

      {/* Wireframe shell for depth */}
      <group ref={g3}>
        <mesh material={mats.faint} scale={2.35} renderOrder={0}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
      </group>

      {/* Orbiting nodes */}
      <group ref={nodes}>
        {[0, 2.1, 4.2].map((a, i) => (
          <mesh
            key={i}
            material={mats.node}
            position={[Math.cos(a) * 1.32, Math.sin(a) * 1.32, 0.02]}
            renderOrder={3}
          >
            <sphereGeometry args={[0.018 + i * 0.004, 12, 12]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Two coloured lights that slowly sweep for a neon studio feel. */
export function NeonLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (a.current) {
      a.current.position.set(Math.sin(t * 0.32) * 3, 1.6, 2.4);
    }
    if (b.current) {
      b.current.position.set(Math.cos(t * 0.26) * -3, -1.4, 2.0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={a} color="#4fd7ff" intensity={22} distance={12} />
      <pointLight ref={b} color="#8b7cff" intensity={16} distance={12} />
    </>
  );
}
