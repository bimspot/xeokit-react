import { GLTFLoaderPlugin } from 'xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import { XKTLoaderPlugin } from 'xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';

export const pickEntity = (viewer, eventToPickOn, setPickedEntityID) => {
  let lastEntity = null;
  let lastColorize = null;

  const { scene } = viewer;

  scene.input.on(eventToPickOn, (coords) => {
    const hit = scene.pick({
      canvasPos: coords,
    });

    if (hit) {
      // eslint-disable-next-line no-console
      console.log(hit.entity.id);
      setPickedEntityID(hit.entity.id);
      if (!lastEntity || hit.entity.id !== lastEntity.id) {
        if (lastEntity) {
          lastEntity.colorize = lastColorize;
        }
        lastEntity = hit.entity;
        lastColorize = hit.entity.colorize.slice();
        hit.entity.colorize = [0.0, 1.0, 0.0];
      }
    } else if (lastEntity) {
      lastEntity.colorize = lastColorize;
      lastEntity = null;
    }
  });
};

export const setCamera = (viewer, cameraSettings) => {
  const { camera } = viewer.scene;

  const keys = Object.keys(cameraSettings);

  keys.forEach((key) => {
    const prop = camera[key];
    const val = cameraSettings[key];
    if (typeof prop === 'function') {
      prop.call(camera, val);
    } else {
      camera[key] = val;
    }
  });
};

const loaders = {
  gltf: GLTFLoaderPlugin,
  xkt: XKTLoaderPlugin,
};

const getExtension = (fileName) => {
  const extension = fileName.match(/\.(\w+)$/);
  return extension && extension[1].toLowerCase();
};

export const getLoaderByExtension = fileName => loaders[getExtension(fileName)];

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
