import React from 'react';
import { sampleModel1 } from '../models';
import { GLTFViewer } from 'xeokit-react';

const Highlighting = () => (
  <GLTFViewer
    canvasID="canvas-3"
    width={600}
    height={600}
    models={[sampleModel1]}
    eventToPickOn={'mouseclicked'}
  />
);

export default Highlighting;
