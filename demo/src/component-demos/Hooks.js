import React, { useState } from 'react';
import { useViewer } from 'xeokit-react';
import { hooksModel, hooksSchep } from '../models';

const Hooks = () => {
  const [model, setModel] = useState([hooksModel]);
  const { viewerCanvasProps, takeScreenshot } = useViewer(model);
  return (
    <div>
      <button onClick={() => setModel([hooksSchep])}>Change model</button>
      <canvas id="hooks" {...viewerCanvasProps} width="600" height="600" />
      <button onClick={takeScreenshot}>Take screenshot</button>
    </div>
  );
};

export default Hooks;
