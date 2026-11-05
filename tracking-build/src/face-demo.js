
// src/face-demo.js - Demonstrasi 2: face tracking (MindAR + Three.js)
// Kacamata berbentuk LOVE

import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-face-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

const ANCHOR_INDEX = 168;
const GLASSES_SCALE = 1.0;
const GLASSES_OFFSET = { x: 0, y: -0.05, z: 0.05 };

const LENS_SIZE = 0.32;
const LENS_SPACING = 0.2;
const RIM_DEPTH = 0.02;
const RIM_COLOR = 0xe11d48;
const LENS_COLOR = 0xf9a8d4;

// Mengatur ukuran dan posisi titik love
function scalePoints(pts, size) {
  const xs = pts.map(p => p.x);
  const ys = pts.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const s = size / (maxX - minX);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  return pts.map(p =>
    new THREE.Vector2(
      (p.x - cx) * s,
      (p.y - cy) * s
    )
  );
}

// Membuat bentuk hati (LOVE)
function heartPoints(size) {
  const pts = [];

  for (let i = 0; i < 128; i++) {
    const t = (i / 128) * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    pts.push(new THREE.Vector2(x, y));
  }

  return scalePoints(pts, size);
}

// Membuat satu lensa berbentuk love
function buildLens(pts) {
  const center = new THREE.Vector2();

  pts.forEach(p => center.add(p));
  center.divideScalar(pts.length);

  const holePts = pts.map(p =>
    p.clone().sub(center).multiplyScalar(0.78).add(center)
  );

  const rimShape = new THREE.Shape(pts);
  rimShape.holes.push(new THREE.Path(holePts));

  const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
    depth: RIM_DEPTH,
    bevelEnabled: false
  });

  rimGeo.translate(0, 0, -RIM_DEPTH / 2);

  const rim = new THREE.Mesh(
    rimGeo,
    new THREE.MeshStandardMaterial({
      color: RIM_COLOR,
      roughness: 0.4,
      metalness: 0.2,
      side: THREE.DoubleSide
    })
  );

  const glass = new THREE.Mesh(
    new THREE.ShapeGeometry(new THREE.Shape(holePts)),
    new THREE.MeshStandardMaterial({
      color: LENS_COLOR,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    })
  );

  const lens = new THREE.Group();
  lens.add(rim, glass);

  return lens;
}

// Membuat object kacamata love
function buildGlasses() {
  const g = new THREE.Group();

  const frameMat = new THREE.MeshStandardMaterial({
    color: RIM_COLOR,
    roughness: 0.4,
    metalness: 0.2
  });

  const pts = heartPoints(LENS_SIZE);

  for (const sx of [-1, 1]) {
    const lens = buildLens(pts);
    lens.position.x = sx * LENS_SPACING;

    const temple = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.4, 8),
      frameMat
    );

    temple.rotation.x = Math.PI / 2;
    temple.position.set(
      sx * (LENS_SPACING + LENS_SIZE / 2 + 0.01),
      0,
      -0.2
    );

    g.add(lens, temple);
  }

  // Penghubung kedua lensa
  const gap = Math.max(
    0.04,
    2 * LENS_SPACING - LENS_SIZE + 0.02
  );

  const bridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, gap, 8),
    frameMat
  );

  bridge.rotation.z = Math.PI / 2;
  bridge.position.y = 0.03;

  g.add(bridge);

  g.scale.setScalar(GLASSES_SCALE);
  g.position.set(
    GLASSES_OFFSET.x,
    GLASSES_OFFSET.y,
    GLASSES_OFFSET.z
  );

  return g;
}

async function start() {
  const mindarThree = new MindARThree({
    container: document.getElementById('container')
  });

  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(ANCHOR_INDEX);
  anchor.group.add(buildGlasses());

  scene.add(
    new THREE.HemisphereLight(0xffffff, 0x667788, 1.4)
  );

  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(0, 1, 2);
  scene.add(dir);

  await mindarThree.start();
  setStatus('Mencari wajah', 'searching');

  let hadFace = false;
  let lostCount = 0;

  renderer.setAnimationLoop(() => {
    const hasFace = mindarThree.getLatestEstimate() !== null;

    if (hasFace !== hadFace) {
      hadFace = hasFace;

      if (hasFace) {
        setStatus('Wajah terdeteksi', 'found');
      } else {
        lostCount++;
        setStatus(
          'Wajah tidak terdeteksi - mencari wajah',
          'searching'
        );
      }

      document.getElementById('info').textContent =
        'Wajah hilang ' + lostCount + ' kali.';
    }

    renderer.render(scene, camera);
  });
}

setupStartButton(start);
