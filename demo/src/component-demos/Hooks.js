import React, { useState } from 'react';
import { useViewer } from 'xeokit-react';
import { hooksModel, hooksModelv2 } from '../models';
import { XKTLoaderPlugin } from 'xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';

const Hooks = () => {
  const [model, setModel] = useState(hooksModel);
  const { viewerCanvasProps } = useViewer(XKTLoaderPlugin, model);
  return (
    <div>
      <button onClick={() => setModel(hooksModelv2)}>Change model</button>
      <canvas id="hooks" {...viewerCanvasProps} />
    </div>
  );
};

export default Hooks;
