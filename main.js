import './style.css';

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("canvas"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: "#70848f"});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


const light = new THREE.AmbientLight(0xfffffff)
light.position.set(20,20,5)
const pointLight = new THREE.PointLight(0xfffffff)
pointLight.position.set(-15,0,15)
scene.add(light);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(50, 50);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(lightHelper, gridHelper)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const blockTexture = new THREE.TextureLoader().load('test_img.jpg');
const block = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: blockTexture }))
scene.add(block);

const moonTexture = new THREE.TextureLoader().load('moon-4k.png');
const moonNormal = new THREE.TextureLoader().load('moon_normal.png');

const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormal}))
moon.position.z = 30;
moon.position.setX(-10);
scene.add(moon);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.05;
  torus.rotation.y += 0.05;

  renderer.render(scene, camera);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  block.rotation.y += 0.01;
  block.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: "#70848f"});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z);

  scene.add(star);
}

document.body.onscroll = moveCamera;
Array(200).fill().forEach(addStar);
animate();

