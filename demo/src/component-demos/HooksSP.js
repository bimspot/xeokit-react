import React from 'react';
import { hooksModel } from '../models';
import useViewer from 'xeokit-react/useViewer';

const myModel = [hooksModel];

const sectionPlanePos = [1, 1, 1];

const HooksSP = () => {
  const { viewerCanvasProps, sectionPlanesControl } = useViewer(myModel, {
    sectionPlanePos,
  });
  return (
    <div>
      <div>
        <button onClick={sectionPlanesControl.toggleStatus}>
          Toggle section plane control yo
        </button>
        {sectionPlanesControl.enabled ? (
          <button onClick={sectionPlanesControl.toggleVisibility}>
            Toggle visibility
          </button>
        ) : null}
      </div>
      <canvas id="hooks-sp" {...viewerCanvasProps} width="600" height="600" />
    </div>
  );
};

export default HooksSP;
