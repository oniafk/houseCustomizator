import * as THREE from "three";

export type Section = {
  id: string;
  label: string;
  objects: string[]; // The GLB object names (or unique child names)
  meshes: THREE.Mesh[]; // Populated at runtime
};

export const SECTIONS: Section[] = [
  {
    id: "exterior-walls",
    label: "Exterior Walls",
    objects: [
      "mainStructure_1f_back",
      "mainStructure_f1",
      "mainStructure_f1_entrance",
      "mainStructure_f2_right2",
      "Plane003_2", // Child of mainStructure_f1_wallEntranceRight
      "Cube005",    // Child of mainStructure_f2_left
      "Cube004",    // Child of mainStructure_f2_right
    ],
    meshes: [], // To be populated in main.ts
  },
];
