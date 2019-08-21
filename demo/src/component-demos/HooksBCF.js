import React from 'react';
import useViewer from 'xeokit-react/useViewer';
import { sampleModel3 } from '../models';
import { GLTFLoaderPlugin } from 'xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import bcfViewpoints from '../bcf_viewpoints.json';

const sampleBcfViewpoints = [
  bcfViewpoints[0],
  bcfViewpoints[0],
  bcfViewpoints[0],
];

const HooksBCF = () => {
  const { viewerCanvasProps, setBcfViewpoint } = useViewer(
    GLTFLoaderPlugin,
    sampleModel3,
    { bcfViewpoint: bcfViewpoints[0] },
  );

  return (
    <div>
      <canvas id="hooks-gltf" {...viewerCanvasProps} />
      <ul>
        {sampleBcfViewpoints.map((s, i) => (
          <li key={i} onClick={() => setBcfViewpoint(s)}>
            BCF Viewpont # {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HooksBCF;
