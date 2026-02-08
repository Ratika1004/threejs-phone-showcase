import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 6;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const phoneGeometry = new THREE.BoxGeometry(2, 4, 0.2);

const phoneMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111,
  metalness: 0.6,
  roughness: 0.3,
});

const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
scene.add(phone);

// Soft ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Directional light (like studio light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);

  phone.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

window.addEventListener('mousedown',(e) => {
  isDragging = true;
  previousMouseX = e.clientX;
  previousMouseY = e.clientY;
});

window.addEventListener('mouseup',() => {
  isDragging = false;
});

window.addEventListener('mousemove',(e) => {
  if(!isDragging) return;

  const deltaX = e.clientX - previousMouseX;
  const deltaY = e.clientY - previousMouseY;
  
  phone.rotation.y += deltaX * 0.01;
  phone.rotation.x += deltaY * 0.01;

  previousMouseX = e.clientX;
  previousMouseY = e.clientY;
});
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

