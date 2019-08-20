import React from 'react';
import useViewer from 'xeokit-react/useViewer';
import { sampleModel3 } from '../models';
import { GLTFLoaderPlugin } from 'xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import bcfViewpoints from '../bcf_viewpoints.json';

const HooksWithGLTF = () => {
  const { viewerCanvasProps } = useViewer(GLTFLoaderPlugin, sampleModel3, {
    bcfViewpoint: bcfViewpoints[0],
  });

  return (
    <div>
      <canvas id="hooks-gltf" {...viewerCanvasProps} />
    </div>
  );
};

export default HooksWithGLTF;
