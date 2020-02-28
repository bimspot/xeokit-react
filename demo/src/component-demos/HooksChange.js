import React, { useState } from 'react';
import useViewer from 'xeokit-react/useViewer';
import { hooksModel, hooksSchep } from '../models';

const myModels = [hooksModel, hooksSchep].map(model => ({
  ...model,
  isChecked: false,
}));

const HooksChange = () => {
  const [show, setShow] = useState(true);
  const [models, setModels] = useState(myModels);
  const handleChange = id => () => {
    const result = models.map(model =>
      id === model.id ? { ...model, isChecked: !model.isChecked } : model
    );
    setModels(result);
  };

  const modelsToLoad = models.filter(model => model.isChecked);

  const {
    viewerCanvasProps,
    faces,
    setCameraPreset,
    pickedEntityID,
  } = useViewer(modelsToLoad);

  return (
    <div>
      <div>{pickedEntityID}</div>
      <button onClick={() => setShow(!show)}>Toggle viewer</button>
      {faces.map(face => (
        <button
          className="btn btn-light border my-2 mr-2"
          key={face}
          onClick={() => setCameraPreset(face)}
        >
          {face}
        </button>
      ))}

      {models.map(({ id, isChecked }) => (
        <div key={id}>
          <label htmlFor={id}>{id}</label>
          <input
            type="checkbox"
            name={id}
            id={id}
            checked={isChecked}
            onChange={handleChange(id)}
          />
        </div>
      ))}
      {show ? (
        <canvas
          id="hooks-change"
          {...viewerCanvasProps}
          width="600"
          height="600"
        />
      ) : null}
    </div>
  );
};

export default HooksChange;
