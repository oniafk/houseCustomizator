import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PI = Math.PI;

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("App container not found");
}

//* scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

//* camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(1, 2, 5);

//* renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

//* controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//* floor - planeGeometry
const plane = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshBasicMaterial({ color: "white" });
const planeMesh = new THREE.Mesh(plane, material);
planeMesh.rotation.x = -PI / 2;
planeMesh.position.set(-1, -0.51, 0);
scene.add(planeMesh);

//* model
const loader = new GLTFLoader();
loader.load(
  "/models/house_construction.glb",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.25, 0.25, 0.25);
    model.position.set(0, -0.5, 0);
    scene.add(model);

    const addIfMesh = (
      obj: THREE.Object3D | undefined | null,
      arr: THREE.Mesh[],
    ) => {
      if (obj instanceof THREE.Mesh) arr.push(obj);
    };

    //* --- EXTERIOR WALLS ---
    const wallMeshes: THREE.Mesh[] = [];

    //* Direct mesh objects
    addIfMesh(model.getObjectByName("mainStructure_1f_back"), wallMeshes);
    addIfMesh(model.getObjectByName("mainStructure_f1"), wallMeshes);
    addIfMesh(model.getObjectByName("mainStructure_f1_entrance"), wallMeshes);
    addIfMesh(model.getObjectByName("mainStructure_f2_right2"), wallMeshes);

    const wallEntranceGroup = model.getObjectByName(
      "mainStructure_f1_wallEntranceRight",
    );
    addIfMesh(wallEntranceGroup?.getObjectByName("Plane003_2"), wallMeshes);

    const leftGroup = model.getObjectByName("mainStructure_f2_left");
    addIfMesh(leftGroup?.getObjectByName("Cube005"), wallMeshes);
    const rightGroup = model.getObjectByName("mainStructure_f2_right");
    addIfMesh(rightGroup?.getObjectByName("Cube004"), wallMeshes);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    wallMeshes.forEach((mesh) => {
      mesh.material = wallMaterial;
    });

    if (wallEntranceGroup) {
      const plane0 = wallEntranceGroup.getObjectByName("Plane003");
      const plane1 = wallEntranceGroup.getObjectByName("Plane003_1");
      if (plane0 instanceof THREE.Mesh) {
        plane0.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); //*steel border window
      }
      if (plane1 instanceof THREE.Mesh) {
        plane1.material = new THREE.MeshStandardMaterial({ color: 0x0000ff }); //* window
      }
    }

    // mainStructure_f2_left frames
    const left1 = leftGroup?.getObjectByName("Cube005_1");
    if (left1 instanceof THREE.Mesh) {
      left1.material = new THREE.MeshStandardMaterial({ color: 0xff4444 }); //* silver frame
    }

    // mainStructure_f2_right frames
    const right1 = rightGroup?.getObjectByName("Cube004_1");
    if (right1 instanceof THREE.Mesh) {
      right1.material = new THREE.MeshStandardMaterial({ color: 0xffff44 }); //* silver frame
    }

    const brick_walls = model.getObjectByName("brick_walls");
    if (brick_walls instanceof THREE.Mesh) {
      brick_walls.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
    }

    const doorBell = model.getObjectByName("doorBell");
    if (doorBell instanceof THREE.Group) {
      doorBell.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshStandardMaterial({ color: 0xff8844 });
        }
      });
    }

    const floor_f1 = model.getObjectByName("floor_f1");
    if (floor_f1 instanceof THREE.Mesh) {
      floor_f1.material = new THREE.MeshStandardMaterial({
        color: 0x8d8d8d,
      });
    }

    const lights_cieling = model.getObjectByName("lights_cieling");
    if (lights_cieling instanceof THREE.Group) {
      lights_cieling.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshStandardMaterial({ color: 0x8dd3ff });
        }
      });
    }

    const ourside_road_stairs = model.getObjectByName("ourside_road-stairs");
    if (ourside_road_stairs instanceof THREE.Mesh) {
      ourside_road_stairs.material = new THREE.MeshStandardMaterial({
        color: 0x5f6063,
      });
    }

    const outside_bricks = model.getObjectByName("outside_bricks");
    if (outside_bricks instanceof THREE.Mesh) {
      outside_bricks.material = new THREE.MeshStandardMaterial({
        color: 0x111199,
      });
    }

    const window_f2 = model.getObjectByName("window_f2");
    if (window_f2 instanceof THREE.Group) {
      window_f2.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshStandardMaterial({ color: 0x7fc8f8 });
        }
      });
    }

    const wood_cieling = model.getObjectByName("wood_cieling");
    if (wood_cieling instanceof THREE.Group) {
      wood_cieling.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshStandardMaterial({ color: 0xc69c6d });
        }
      });
    }

    const wood_door_entrance = model.getObjectByName("wood_door_entrance");
    if (wood_door_entrance instanceof THREE.Mesh) {
      wood_door_entrance.material = new THREE.MeshStandardMaterial({
        color: 0xb07a4a,
      });
    }

    const wood_PanelDoor_f1_left = model.getObjectByName(
      "wood_PanelDoor_f1_left",
    );
    if (wood_PanelDoor_f1_left instanceof THREE.Mesh) {
      wood_PanelDoor_f1_left.material = new THREE.MeshStandardMaterial({
        color: 0xa36d3b,
      });
    }

    const wood_Pannels = model.getObjectByName("wood_Pannels");
    if (wood_Pannels instanceof THREE.Mesh) {
      wood_Pannels.material = new THREE.MeshStandardMaterial({
        color: 0x8b5a2b,
      });
    }

    const wood_supportColumns = model.getObjectByName("wood_supportColumns");
    if (wood_supportColumns instanceof THREE.Mesh) {
      wood_supportColumns.material = new THREE.MeshStandardMaterial({
        color: 0x7a4a21,
      });
    }
  },
  undefined,
  (error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to load model", error);
  },
);

//* lights
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(3, 3, 3);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const clock = new THREE.Clock();

//* resize function
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);

//* animation
const animate = () => {
  clock.getElapsedTime();
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
import "./style.css";
