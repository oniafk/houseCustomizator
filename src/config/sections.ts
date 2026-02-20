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
      "Cube005", // Child of mainStructure_f2_left
      "Cube004", // Child of mainStructure_f2_right
    ],
    meshes: [],
  },
  {
    id: "windows",
    label: "Windows",
    objects: [
      "window_f2", // Group — all children are window glass/frames
      "Plane003_1", // Window glass — child of mainStructure_f1_wallEntranceRight
      "Plane003", // Steel border — child of mainStructure_f1_wallEntranceRight
      "Cube005_1", // Frame — child of mainStructure_f2_left
      "Cube004_1", // Frame — child of mainStructure_f2_right
    ],
    meshes: [],
  },
  {
    id: "doors",
    label: "Doors",
    objects: ["wood_door_entrance", "wood_PanelDoor_f1_left", "doorBell"],
    meshes: [],
  },
  {
    id: "floor",
    label: "Floor",
    objects: ["floor_f1", "ourside_road_stairs"],
    meshes: [],
  },
  {
    id: "ceiling",
    label: "Ceiling",
    objects: ["wood_cieling", "lights_cieling"],
    meshes: [],
  },
  {
    id: "wood-elements",
    label: "Wood Elements",
    objects: ["wood_Pannels", "wood_supportColumns"],
    meshes: [],
  },
  {
    id: "brick-walls",
    label: "brick pannels",
    objects: ["brick_walls"],
    meshes: [],
  },
  {
    id: "outside_bricks",
    label: "bricks road front",
    objects: ["outside_bricks"],
    meshes: [],
  },
];
