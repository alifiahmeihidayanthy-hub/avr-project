
 // src/image-demo.js - Demonstrasi 1: image tracking (MindAR + Three.js)
 // Objek 3D berbentuk LOVE

import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-image-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

const TARGET_SRC = './targets/target-card.mind';
const TARGET_ASPECT = 372 / 674;

let foundCount = 0;

// Membuat bentuk hati 3D
function createHeart() {
  const heartShape = new THREE.Shape();

  heartShape.moveTo(0, 0.3);

  heartShape.bezierCurveTo(
    0, 0.3,
    -0.1, 0.65,
    -0.4, 0.65
  );

  heartShape.bezierCurveTo(
    -0.9, 0.65,
    -0.9, 0.05,
    -0.9, 0.05
  );

  heartShape.bezierCurveTo(
    -0.9, -0.3,
    -0.4, -0.6,
    0, -0.9
  );

  heartShape.bezierCurveTo(
    0.4, -0.6,
    0.9, -0.3,
    0.9, 0.05
  );

  heartShape.bezierCurveTo(
    0.9, 0.05,
    0.9, 0.65,
    0.4, 0.65
  );

  heartShape.bezierCurveTo(
    0.1, 0.65,
    0, 0.3,
    0, 0.3
  );

  const geometry = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 5,
    curveSegments: 32
  });

  const material = new THREE.MeshStandardMaterial({
    color: 0xff69b4,
    roughness: 0.3,
    metalness: 0.15
  });

  return new THREE.Mesh(geometry, material);
}

async function start() {
  const mindarThree = new MindARThree({
    container: document.getElementById('container'),
    imageTargetSrc: TARGET_SRC,
  });

  const { renderer, scene, camera } = mindarThree;

  // Anchor 0 = target pertama
  const anchor = mindarThree.addAnchor(0);

  // Bingkai target
  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(
      new THREE.PlaneGeometry(1, TARGET_ASPECT)
    ),
    new THREE.LineBasicMaterial({ color: 0x14b8a6 })
  );

  anchor.group.add(frame);

  // Objek hati 3D
  const heart = createHeart();

  heart.scale.set(0.35, 0.35, 0.35);
  heart.position.set(0, 0, 0.2);

  anchor.group.add(heart);

  // Pencahayaan
  scene.add(
    new THREE.HemisphereLight(0xffffff, 0x667788, 1.2)
  );

  const dir = new THREE.DirectionalLight(0xffffff, 1.5);
  dir.position.set(0.5, 1, 1);
  scene.add(dir);

  // Status deteksi target
  anchor.onTargetFound = () => {
    foundCount++;
    setStatus('Target terdeteksi', 'found');

    document.getElementById('info').textContent =
      'Target ditemukan ' + foundCount + ' kali.';
  };

  anchor.onTargetLost = () => {
    setStatus('Target hilang - mencari target', 'searching');
  };

  await mindarThree.start();

  setStatus('Mencari target', 'searching');

  // Animasi hati berputar
  const clock = new THREE.Clock();

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();

    heart.rotation.z += delta * 0.8;
    heart.rotation.y += delta * 1.2;

    renderer.render(scene, camera);
  });
}

setupStartButton(start);
