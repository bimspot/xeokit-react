import React, { useState, useEffect } from 'react';
import useViewer from 'xeokit-react/useViewer';
import { hooksModel, hooksModelv2, holterTower } from '../models';

const myModels = [hooksModel, hooksModelv2, holterTower].map(model => ({
  ...model,
  isChecked: false,
}));

const HooksChange = () => {
  const [show, setShow] = useState(true);
  const [xrayed, setXrayed] = useState(false);
  const [xraySettings, setXRaySettings] = useState({
    preset: 'sepia',
    fillAlpha: 0.5,
    edgeAlpha: 1,
  });
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
    setModelsVisible,
    setObjectsVisible,
    setObjectsColorized,
    setObjectsXRayed,
    xrayPresets,
    pickedEntity,
  } = useViewer(modelsToLoad, { xraySettings });

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
      <button
        onClick={() => setObjectsXRayed([pickedEntity.entityId], true, false)}
      >
        Wireframe selected
      </button>
      <button
        onClick={() => setObjectsColorized([pickedEntity.entityId], '#09cad8')}
      >
        Colorize selected
      </button>
      <button onClick={() => setModelsVisible(['xkt-model'], false)}>
        Hide xkt-model
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
          value={xraySettings.preset}
          onChange={evt =>
            setXRaySettings({ ...xraySettings, preset: evt.target.value })
          }
        >
          {xrayPresets.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="fillAlpha">Fill opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={xraySettings.fillAlpha}
          id="fillAlpha"
          onChange={evt =>
            setXRaySettings({ ...xraySettings, fillAlpha: +evt.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="edgeAlpha">Edge opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={xraySettings.edgeAlpha}
          id="edgeAlpha"
          onChange={evt =>
            setXRaySettings({ ...xraySettings, edgeAlpha: +evt.target.value })
          }
        />
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
