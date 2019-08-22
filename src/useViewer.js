// React related imports
import {
  useState, useMemo, useEffect, useRef,
} from 'react';

// Xeokit related imports
import { Viewer } from 'xeokit-sdk/src/viewer/Viewer';
import { BCFViewpointsPlugin } from 'xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin';
import { pickEntity, setCamera } from './utils';

const useViewer = (
  LoaderPlugin,
  models,
  { bcfViewpoint, eventToPickOn = 'mouseclicked', camera } = {},
) => {
  // Store canvas reference of main viewer
  const [viewerCanvas, setViewerCanvas] = useState(null);

  // A piece of state that tells us if the models have been loaded
  const [modelsHaveLoaded, setModelsHaveLoaded] = useState(false);

  // A piece of state that returns the picked entity's ID
  const [pickedEntityID, setPickedEntityID] = useState(null);

  // ref for the Viewer that xeokit creates
  const viewerRef = useRef();

  // ref for the model loader plugin
  const modelLoaderRef = useRef();

  // Performance model ref
  const perfModelsRef = useRef();

  // BCF Viewpoint Plugin ref
  const bcfViewpointPluginRef = useRef();

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
  const setBcfViewpoint = (viewpoint) => {
    if (!bcfViewpointPluginRef.current && viewerRef.current) {
      bcfViewpointPluginRef.current = new BCFViewpointsPlugin(
        viewerRef.current,
      );
    }
    if (perfModelsRef.current && modelsHaveLoaded) {
      bcfViewpointPluginRef.current.setViewpoint(viewpoint);
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

      // Initialise loader plugin (eg. gltfLoader, xktLoader)
      modelLoaderRef.current = new LoaderPlugin(viewerRef.current);

      // Load models
      perfModelsRef.current = models.map(model => modelLoaderRef.current.load(model));

      // If models have been loaded, set the state
      const promises = perfModelsRef.current.map(
        model => new Promise(resolve => model.on('loaded', resolve)),
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

        // Destroy the viewer
        viewerRef.current.destroy();
      }
    };
  }, [viewerCanvas, LoaderPlugin, models, eventToPickOn]);

  useEffect(() => {
    // BCF Viewpoint loading logic
    // bcf viewpoints are only tied to models in that there might
    // be some entities pre-selected on the model(s)
    if (bcfViewpoint && modelsHaveLoaded) {
      // Only instantiate the BCFViewpointsPlugin if there are any
      // bcfViewpoints passed through props
      bcfViewpointPluginRef.current = new BCFViewpointsPlugin(
        viewerRef.current,
      );
      bcfViewpointPluginRef.current.setViewpoint(bcfViewpoint);
    }
  }, [bcfViewpoint, modelsHaveLoaded]);

  useEffect(() => {
    if (viewerRef.current && camera) {
      setCamera(viewerRef.current, camera);
    }
  }, [camera, viewerCanvas]);

  useEffect(() => {
    if (!camera && modelsHaveLoaded) {
      viewerRef.current.cameraFlight.flyTo(perfModelsRef.current[0]);
    }
  }, [modelsHaveLoaded, camera]);

  return {
    viewerCanvasProps,
    takeScreenshot,
    setBcfViewpoint,
    pickedEntityID,
  };
};

export default useViewer;
