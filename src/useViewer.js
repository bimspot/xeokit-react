// React related imports
import {
  useState, useMemo, useEffect, useRef,
} from 'react';

// Xeokit related imports
import { Viewer } from 'xeokit-sdk/src/viewer/Viewer';
import { BCFViewpointsPlugin } from 'xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin';

const useViewer = (LoaderPlugin, model, { bcfViewpoint } = {}) => {
  // Store canvas reference of main viewer
  const [viewerCanvas, setViewerCanvas] = useState(null);

  // ref for the Viewer that xeokit creates
  const viewerRef = useRef();

  // ref for the model loader plugin
  const modelLoaderRef = useRef();

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
  // break up useEffect
  // handle model, bcfViewpoint, etc loading individually
  useEffect(() => {
    if (viewerCanvas) {
      // Initialise xeokit features

      // Initialise Viewer with canvas
      viewerRef.current = new Viewer({ canvasElement: viewerCanvas });

      // Initialise loader plugin (eg. gltfLoader, xktLoader)
      modelLoaderRef.current = new LoaderPlugin(viewerRef.current);

      // Load model
      const perfModel = modelLoaderRef.current.load(model);

      // BCF Viewpoint loading logic
      // bcf viewpoints are only tied to models in that there might
      // be some entities pre-selected on the model(s)
      if (bcfViewpoint) {
        // Only instantiate the BCFViewpointsPlugin if there are any
        // bcfViewpoints passed through props
        perfModel.on('loaded', () => new BCFViewpointsPlugin(viewerRef.current).setViewpoint(bcfViewpoint));
      }
    }
    return () => {
      if (viewerCanvas) {
        // Clean up stuff (destroy Viewer, etc.)

        // Destroy the viewer
        viewerRef.current.destroy();
      }
    };
  }, [viewerCanvas, LoaderPlugin, model, bcfViewpoint]);

  return { viewerCanvasProps, takeScreenshot };
};

export default useViewer;
