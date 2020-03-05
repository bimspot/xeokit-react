import React, { useState, useEffect } from 'react';
import useViewer from 'xeokit-react/useViewer';
import { hooksModel, hooksSchep } from '../models';

const myModels = [hooksModel, hooksSchep].map(model => ({
  ...model,
  isChecked: false,
}));

const HooksChange = () => {
  const [show, setShow] = useState(true);
  const [xrayed, setXrayed] = useState(false);
  const [xrayPreset, setXRayPreset] = useState('sepia');
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
    navCubeCanvasProps,
    setModelsXRayed,
    setObjectsVisible,
    xrayPresets,
    pickedEntity,
  } = useViewer(modelsToLoad, { xrayPreset });

  useEffect(() => {
    setModelsXRayed(models.map(({ id }) => id), xrayed);
  }, [xrayed, models, setModelsXRayed]);

  return (
    <div>
      <div className="float-right">
        <div>{pickedEntity.modelId}</div>
        <div>{pickedEntity.entityId}</div>
      </div>
      <button onClick={() => setShow(!show)}>Toggle viewer</button>
      <button onClick={() => setObjectsVisible([pickedEntity.entityId], false)}>
        Hide selected
      </button>
      <div>
        <label htmlFor="wireframe">Wireframe</label>
        <input
          type="checkbox"
          id="wireframe"
          checked={xrayed}
          onChange={evt => setXrayed(evt.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="preset">Wireframe style</label>
        <select
          id="preset"
          value={xrayPreset}
          onChange={evt => setXRayPreset(evt.target.value)}
        >
          {xrayPresets.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

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
      <canvas {...navCubeCanvasProps} />
    </div>
  );
};

export default HooksChange;
