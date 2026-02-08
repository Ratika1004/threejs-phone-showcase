import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight, //aspect ratio
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
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

scene.add(directionalLight);
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.ShadowMaterial({
  opacity: 0.25,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.2;
ground.receiveShadow = true;

scene.add(ground);



let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  phone.position.y = Math.sin(time) * 0.2;

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

const screenGeometry = new THREE.PlaneGeometry(1.8 , 3.6);
const TextureLoader = new THREE.TextureLoader();
const screenTexture = TextureLoader.load('/screen.jpg');


const screenMaterial = new THREE.MeshStandardMaterial({
  map : screenTexture,
  emissive : 0xffffff, 
  emissiveIntensity : 0.4,
})

const phoneScreen = new THREE.Mesh(screenGeometry, screenMaterial);
phoneScreen.position.z = 0.11;
phone.add(phoneScreen);

scene.remove(ambientLight);
scene.remove(directionalLight);

//softbase light
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

//key light
const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

//fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-5, 0, 5);
scene.add(fillLight);

//back light
const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(0, 5, -5);
scene.add(rimLight);

phoneMaterial.roughness = 0.25;
phoneMaterial.metalness = 0.8;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

phone.castShadow = true;


