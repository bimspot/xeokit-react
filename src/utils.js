import { GLTFLoaderPlugin } from '@xeokit/xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import { XKTLoaderPlugin } from '@xeokit/xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';
import { math } from '@xeokit/xeokit-sdk/src/viewer/scene/math/math';

export const pickEntity = (viewer, eventToPickOn, setPickedEntity) => {
  const { scene } = viewer;

  scene.input.on(eventToPickOn, coords => {
    scene.setObjectsSelected(scene.selectedObjectIds, false);

    const hit = scene.pick({
      canvasPos: coords,
    });

    if (hit) {
      setPickedEntity(hit.entity);
      hit.entity.selected = true;
    } else {
      setPickedEntity(null);
    }
  });
};

export const setCamera = (viewer, cameraSettings) => {
  const { camera } = viewer.scene;

  const keys = Object.keys(cameraSettings);

  keys.forEach(key => {
    const prop = camera[key];
    const val = cameraSettings[key];
    if (typeof prop === 'function') {
      prop.call(camera, val);
    } else {
      camera[key] = val;
    }
  });
};

export const defaultLoaders = {
  gltf: { loader: GLTFLoaderPlugin },
  xkt: { loader: XKTLoaderPlugin },
};

export const getExtension = fileName => {
  const extension = fileName.match(/\.(\w+)$/);
  return extension && extension[1].toLowerCase();
};

// camera presets
export const cameraPresets = [
  {
    label: 'front',
    boundaries: [[7, 7, 4, 4]],
    dir: [0, 0, -1],
    up: [0, 1, 0],
  },
  {
    label: 'back',
    boundaries: [[19, 7, 4, 4]],
    dir: [0, 0, 1],
    up: [0, 1, 0],
  },
  {
    label: 'right',
    boundaries: [[13, 7, 4, 4]],
    dir: [-1, 0, 0],
    up: [0, 1, 0],
  },
  {
    label: 'left',
    boundaries: [[1, 7, 4, 4]],
    dir: [1, 0, 0],
    up: [0, 1, 0],
  },
  {
    label: 'top',
    boundaries: [[7, 1, 4, 4]],
    dir: [0, -1, 0],
    up: [0, 0, -1],
  },
  {
    label: 'bottom',
    boundaries: [[7, 13, 4, 4]],
    dir: [0, 1, 0],
    up: [0, 0, 1],
  },
];

// set camera preset
export const setCameraPreset = (viewer, modelsHaveLoaded) => preset => {
  const faceObj = cameraPresets.find(({ label }) => label === preset);

  if (modelsHaveLoaded) {
    const center = math.vec3();
    const { aabb } = viewer.scene;
    const diag = math.getAABB3Diag(aabb);
    math.getAABB3Center(aabb, center);
    const dist = Math.abs(diag / Math.tan(55.0 / 2));

    viewer.cameraFlight.flyTo({
      look: center,
      eye: [
        center[0] - dist * faceObj.dir[0],
        center[1] - dist * faceObj.dir[1],
        center[2] - dist * faceObj.dir[2],
      ],
      up: faceObj.up || [0, 1, 0],
      orthoScale: diag * 1.3,
      fitFOV: 45,
      duration: 0.5,
    });
  }
};

// given an invalid hex value it will return a default green colour
export const hexToRgb = hex => {
  const match = hex.match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
  return match ? match.slice(1).map(hex => parseInt(hex, 16) / 255) : [0, 1, 0];
};
