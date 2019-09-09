import React, { useState } from 'react';
import { useViewer } from 'xeokit-react';
import { hooksModel, hooksSchep } from '../models';

const Hooks = () => {
  const [model, setModel] = useState([hooksModel]);
  const {
    viewerCanvasProps,
    takeScreenshot,
    setCameraPreset,
    faces,
  } = useViewer(model);
  return (
    <div>
      <canvas id="hooks" {...viewerCanvasProps} width="600" height="600" />
      <div className="mb-3 d-flex">
        {/* <button onClick={() => setCameraPreset('front')}>front</button>
        <button onClick={() => setCameraPreset('right')}>right</button> */}
        {faces.map(face => (
          <button
            className="btn btn-primary my-2 mr-2"
            key={face}
            onClick={() => setCameraPreset(face)}
          >
            {face}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => setModel([hooksSchep])}>Change model</button>
        <button onClick={takeScreenshot}>Take screenshot</button>
      </div>
    </div>
  );
};

export default Hooks;
