// React related imports
import {
  useState, useMemo, useEffect, useRef,
} from 'react';

// Xeokit related imports
import { Viewer } from 'xeokit-sdk/src/viewer/Viewer';

const useViewer = (LoaderPlugin, model) => {
  // Store canvas reference of main viewer
  const [viewerCanvas, setViewerCanvas] = useState(null);

  // ref for the Viewer that xeokit creates
  const viewerRef = useRef(null);

  // ref for the model loader plugin
  const modelLoaderRef = useRef(null);

  // Props to use with the canvas
  const viewerCanvasProps = useMemo(() => ({ ref: setViewerCanvas }), [
    setViewerCanvas,
  ]);

  useEffect(() => {
    if (viewerCanvas) {
      // Initialise xeokit features

      // Initialise Viewer with canvas
      viewerRef.current = new Viewer({ canvasElement: viewerCanvas });

      // Initialise loader plugin (eg. gltfLoader, xktLoader)
      modelLoaderRef.current = new LoaderPlugin(viewerRef.current);

      // Load model
      modelLoaderRef.current.load(model);
    }
    return () => {
      if (viewerCanvas) {
        // Clean up stuff (destroy Viewer, etc.)

        // Destroy the viewer
        viewerRef.current.destroy();

        viewerRef.current = null;
        modelLoaderRef.current = null;
      }
    };
  }, [viewerCanvas, LoaderPlugin, model]);

  return { viewerCanvasProps };
};

export default useViewer;
