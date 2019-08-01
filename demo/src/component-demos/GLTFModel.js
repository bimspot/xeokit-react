import React from 'react';
import { sampleModel1 } from '../models';
import { GLTFViewer } from 'xeokit-react';

const GLTFModel = () => (
  <div>
    <GLTFViewer
      canvasID="canvas-gltf"
      width={600}
      height={600}
      models={[sampleModel1]}
    />
  </div>
);

export default GLTFModel;
