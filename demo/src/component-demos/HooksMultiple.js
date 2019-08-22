import React from 'react';
import useViewer from 'xeokit-react/useViewer';
import { xktModel, hooksSchep } from '../models';
import { XKTLoaderPlugin } from 'xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';
import bcfViewpoints from '../bcf_viewpoints.json';

const myModels = [xktModel, hooksSchep];
const cameraSettings = {
  eye: [1, 0, 10],
  look: [1, 0, 0],
  up: [0, 1, 0],
  zoom: 10,
};

const HooksMultiple = () => {
  console.log('hooks multiple');
  const { viewerCanvasProps } = useViewer(XKTLoaderPlugin, myModels, {
    camera: cameraSettings,
  });

  return (
    <div>
      <canvas
        id="hooks-multiple"
        {...viewerCanvasProps}
        width="600"
        height="600"
      />
    </div>
  );
};

export default HooksMultiple;
