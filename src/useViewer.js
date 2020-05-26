// React related imports
import { useState, useMemo, useEffect, useCallback } from 'react';

// Xeokit related imports
import { Viewer } from '@xeokit/xeokit-sdk/src/viewer/Viewer';
import { NavCubePlugin } from '@xeokit/xeokit-sdk/src/plugins/NavCubePlugin/NavCubePlugin';

import {
  setCameraPreset,
  cameraPresets,
  hexToRgb,
  setProperties,
} from './utils';
import { useLoaders } from './loaders';
import { deselect, usePickEntity } from './pickEntity';

const faces = cameraPresets.map(({ label }) => label);

const useViewer = (
  models,
  {
    eventToPickOn = 'mouseclicked',
    loaders,
    xraySettings,
    cameraControlSettings,
    flyToModels = false,
  } = {}
) => {
  const [viewer, setViewer] = useState(null);
  const [pickedEntity, setPickedEntity] = usePickEntity(viewer, eventToPickOn);

  const modelsHaveLoaded = useLoaders(
    viewer,
    models,
    loaders,
    pickedEntity,
    setPickedEntity,
    flyToModels
  );

  useEffect(() => {
    setProperties(xraySettings, viewer?.scene.xrayMaterial);
  }, [xraySettings, viewer]);

  useEffect(() => {
    setProperties(cameraControlSettings, viewer?.cameraControl);
  }, [cameraControlSettings, viewer]);

  // Props to use with the viewer canvas
  const viewerCanvasProps = useMemo(
    () => ({
      ref: canvasElement =>
        setViewer(canvasElement ? new Viewer({ canvasElement }) : null),
    }),
    [setViewer]
  );

  // Props to use with the nav cube canvas
  const navCubeCanvasProps = useMemo(
    () => ({
      ref: canvasElement =>
        canvasElement && viewer
          ? new NavCubePlugin(viewer, { canvasElement })
          : viewer?.plugins?.NavCubePlugin.destroy(),
    }),
    [viewer]
  );

  // Take screenshot feature
  const takeScreenshot = () => {
    if (viewer) {
      const imageData = viewer.getSnapshot({
        format: 'png',
      });

      // The anchor element's download tag enables us to save the
      // screenshot to the file system
      // we don't actually append the link to the page
      // we just call the click event on it to start/prompt the download
      const link = document.createElement('a');
      link.setAttribute('href', imageData);
      link.setAttribute('download', 'model-screenshot');
      link.click();
    }
  };

  useEffect(
    () => () => {
      if (viewer) {
        viewer.destroy();
      }
    },
    [viewer]
  );

  const setModelsXRayed = useCallback(
    (modelIds, xrayed, pickable = true) =>
      modelIds.forEach(id => {
        const model = viewer?.scene.models[id];
        if (model) {
          model.xrayed = xrayed;
          model.pickable = pickable || !xrayed;
        }
      }),
    [viewer]
  );

  const setModelsVisible = useCallback(
    (modelIds, visible) =>
      modelIds.forEach(id => {
        const model = viewer?.scene.models[id];
        if (model) {
          model.visible = visible;
        }
      }),
    [viewer]
  );

  const setObjectsVisible = useCallback(
    (objectIds, visible) => viewer?.scene.setObjectsVisible(objectIds, visible),
    [viewer]
  );

  const setObjectsXRayed = useCallback(
    (objectIds, xrayed, pickable = true) => {
      viewer?.scene.setObjectsXRayed(objectIds, xrayed);
      viewer?.scene.setObjectsPickable(objectIds, pickable || !xrayed);
    },
    [viewer]
  );

  const setObjectsColorized = useCallback(
    (objectIds, hexColour) =>
      viewer?.scene.setObjectsColorized(objectIds, hexToRgb(hexColour)),
    [viewer]
  );

  const xrayPresets = useMemo(
    () => (viewer ? Object.keys(viewer.scene.xrayMaterial.presets) : []),
    [viewer]
  );

  return {
    viewerCanvasProps,
    navCubeCanvasProps,
    takeScreenshot,
    setCameraPreset: setCameraPreset(viewer, modelsHaveLoaded),
    pickedEntity: pickedEntity
      ? { entityId: pickedEntity.id, modelId: pickedEntity.model.id }
      : { entityId: '', modelId: '' },
    clearEntitySelection: () => setPickedEntity(deselect),
    faces,
    setObjectsVisible,
    setObjectsColorized,
    setObjectsXRayed,
    setModelsXRayed,
    setModelsVisible,
    xrayPresets,
    modelsHaveLoaded,
  };
};

export default useViewer;
