import React from 'react';
import useViewer from 'xeokit-react/useViewer';
import { xktModel, sampleModel3 } from '../models';

const myModels = [xktModel, sampleModel3];
const cameraSettings = {
  eye: [1, 0, 10],
  look: [1, 0, 0],
  up: [0, 1, 0],
  zoom: 20,
};

const HooksMultiple = () => {
  console.log('hooks multiple');
  const { viewerCanvasProps } = useViewer(myModels, {
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
