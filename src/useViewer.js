// React related imports
import {
  useState, useMemo, useEffect, useRef,
} from 'react';

// Xeokit related imports
import { Viewer } from 'xeokit-sdk/src/viewer/Viewer';
import { BCFViewpointsPlugin } from 'xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin';
import { pickEntity } from './utils';

const useViewer = (
  LoaderPlugin,
  model,
  { bcfViewpoint, eventToPickOn = 'mouseclicked' } = {},
) => {
  // Store canvas reference of main viewer
  const [viewerCanvas, setViewerCanvas] = useState(null);

  // A piece of state that tells us if the model has been loaded
  const [modelHasLoaded, setModelHasLoaded] = useState(false);

  // A piece of state that returns the picked entity's ID
  const [pickedEntityID, setPickedEntityID] = useState(null);

  // ref for the Viewer that xeokit creates
  const viewerRef = useRef();

  // ref for the model loader plugin
  const modelLoaderRef = useRef();

  // Performance model ref
  const perfModelRef = useRef();

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
    if (perfModelRef.current && modelHasLoaded) {
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

      // Load model
      perfModelRef.current = modelLoaderRef.current.load(model);

      // If model has been loaded, set the state
      perfModelRef.current.on('loaded', () => setModelHasLoaded(true));

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
  }, [viewerCanvas, LoaderPlugin, model, eventToPickOn]);

  useEffect(() => {
    // BCF Viewpoint loading logic
    // bcf viewpoints are only tied to models in that there might
    // be some entities pre-selected on the model(s)
    if (bcfViewpoint && modelHasLoaded) {
      // Only instantiate the BCFViewpointsPlugin if there are any
      // bcfViewpoints passed through props
      bcfViewpointPluginRef.current = new BCFViewpointsPlugin(
        viewerRef.current,
      );
      bcfViewpointPluginRef.current.setViewpoint(bcfViewpoint);
    }
  }, [bcfViewpoint, modelHasLoaded]);

  return {
    viewerCanvasProps,
    takeScreenshot,
    setBcfViewpoint,
    pickedEntityID,
  };
};

export default useViewer;
