import React from 'react';
import useViewer from 'xeokit-react/useViewer';
import { sampleModel3 } from '../models';
import bcfViewpoints from '../bcf_viewpoints.json';

const sampleBcfViewpoints = [bcfViewpoints[0], bcfViewpoints[1]];

const myModels = [sampleModel3];

const HooksBCF = () => {
  const { viewerCanvasProps, setBcfViewpoint } = useViewer(myModels, {
    bcfViewpoint: sampleBcfViewpoints[0],
  });

  return (
    <div>
      <canvas id="hooks-gltf" {...viewerCanvasProps} width="600" height="600" />
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
