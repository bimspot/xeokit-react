import React, { useEffect } from 'react';
import { useViewer } from 'xeokit-react';
import { hooksModel } from '../models';

const myModels = [hooksModel];

const HooksPick = () => {
  const { viewerCanvasProps, pickedEntityID } = useViewer(myModels);

  useEffect(() => {
    if (pickedEntityID) {
      console.log(`Execute order ${pickedEntityID}`);
    }
  }, [pickedEntityID]);

  return (
    <div>
      <canvas id="hooks" {...viewerCanvasProps} width="600" height="600" />
      <div>{pickedEntityID}</div>
    </div>
  );
};

export default HooksPick;
