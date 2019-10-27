// React related imports
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// Xeokit related imports
import { Viewer } from 'xeokit-sdk/src/viewer/Viewer';
import { BCFViewpointsPlugin } from 'xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin';
import { math } from 'xeokit-sdk/src/viewer/scene/math/math';
import {
  pickEntity,
  setCamera,
  getLoaderByExtension,
  cameraPresets,
} from './utils';
import { useSectionPlanes } from './sectionPlanes';

const useViewer = (
  models,
  { bcfViewpoint, eventToPickOn = 'mouseclicked', camera, sectionPlane } = {}
) => {
  // Store canvas reference of main viewer
  const [viewerCanvas, setViewerCanvas] = useState(null);

  // A piece of state that tells us if the models have been loaded
  const [modelsHaveLoaded, setModelsHaveLoaded] = useState(false);

  // A piece of state that returns the picked entity's ID
  const [pickedEntityID, setPickedEntityID] = useState(null);

  // A piece of state that returns the preset angles the viewer can face
  const [faces, setFaces] = useState([]);

  // ref for the Viewer that xeokit creates
  const viewerRef = useRef();

  // Controls for section planes
  const sectionPlanesControl = useSectionPlanes(
    viewerRef.current,
    sectionPlane
  );

  // Props to use with the canvas
  const viewerCanvasProps = useMemo(() => ({ ref: setViewerCanvas }), [
    setViewerCanvas,
  ]);

  // Take screenshot feature
  const takeScreenshot = () => {
    if (viewerRef.current) {
      const imageData = viewerRef.current.getSnapshot({
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

  // TODO:
  // don't reload if viewpoint hasn't changed
  const setBcfViewpoint = useCallback(
    viewpoint => {
      if (viewerRef.current && modelsHaveLoaded) {
        const plugin =
          viewerRef.current.plugins.BCFViewpoints ||
          new BCFViewpointsPlugin(viewerRef.current);

        plugin.setViewpoint(viewpoint);
      }
    },
    [modelsHaveLoaded]
  );

  // set camera preset
  const setCameraPreset = preset => {
    const faceObj = cameraPresets.find(({ label }) => label === preset);
    // console.log('faces');
    // console.log(faces);
    // console.log('faceObj');
    // console.log(faceObj);

    if (modelsHaveLoaded) {
      const center = math.vec3();
      const { aabb } = viewerRef.current.scene;
      const diag = math.getAABB3Diag(aabb);
      math.getAABB3Center(aabb, center);
      const dist = Math.abs(diag / Math.tan(55.0 / 2));

      viewerRef.current.cameraFlight.flyTo({
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

  // TODO:
  // break up useEffect
  // handle model, etc loading individually
  useEffect(() => {
    if (viewerCanvas) {
      // Initialise xeokit features

      // Initialise Viewer with canvas
      viewerRef.current = new Viewer({ canvasElement: viewerCanvas });

      // Initialise loader plugin (eg. gltfLoader, xktLoader) and load models
      const promises = models.map(
        model =>
          new Promise(resolve => {
            const LoaderPlugin = getLoaderByExtension(model.src);
            if (!LoaderPlugin) {
              resolve();
              return;
            }
            const loader =
              viewerRef.current.plugins[LoaderPlugin.name] ||
              new LoaderPlugin(viewerRef.current, { id: LoaderPlugin.name });
            const perfModel = loader.load(model);
            perfModel.on('loaded', resolve);
          })
      );

      // once all the models have been loaded and thus all the promises
      // have been resolved, we can finally load our viewpoint
      Promise.all(promises).then(() => setModelsHaveLoaded(true));

      // Pick entities
      pickEntity(viewerRef.current, eventToPickOn, setPickedEntityID);
    }
    return () => {
      if (viewerCanvas) {
        // Clean up stuff (destroy Viewer, etc.)
        setModelsHaveLoaded(false);

        // Clean up entity ID
        setPickedEntityID(null);

        // Destroy the viewer
        viewerRef.current.destroy();
      }
    };
  }, [viewerCanvas, models, eventToPickOn]);

  useEffect(() => {
    // BCF Viewpoint loading logic
    if (bcfViewpoint) {
      setBcfViewpoint(bcfViewpoint);
    }
  }, [bcfViewpoint, setBcfViewpoint]);

  useEffect(() => {
    if (viewerRef.current && camera) {
      setCamera(viewerRef.current, camera);
    }
  }, [camera, viewerCanvas]);

  useEffect(() => {
    if (!camera && !bcfViewpoint && modelsHaveLoaded) {
      viewerRef.current.cameraFlight.flyTo(
        viewerRef.current.scene.models[models[0].id]
      );
    }
  }, [models, modelsHaveLoaded, camera, bcfViewpoint]);

  useEffect(() => {
    const localFaces = cameraPresets.map(({ label }) => label);
    setFaces(localFaces);
  }, [setFaces]);

  return {
    viewerCanvasProps,
    takeScreenshot,
    setBcfViewpoint,
    pickedEntityID,
    faces,
    setCameraPreset,
    sectionPlanesControl,
  };
};

export default useViewer;
