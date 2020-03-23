import React, { Fragment, useState } from 'react';
import useViewer from 'xeokit-react/useViewer';
import { models } from '../models';

const mapObj = (fn, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key);
    return acc;
  }, {});

const getModelsToLoad = (selected, xrayed) => {
  const modelsToLoad = [];
  for (const id in selected) {
    if (selected[id] !== 'none') {
      modelsToLoad.push({
        ...models[id].model,
        id,
        xrayed,
        pickable: !xrayed,
        guids: models[id].guids?.[selected[id]],
      });
    }
  }
  return modelsToLoad;
};

const HooksGuids = () => {
  const [show, setShow] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [selected, setSelected] = useState(mapObj(() => 'none', models));

  const handleChange = ({ target: { id, value } }) =>
    setSelected({ ...selected, [id]: value });

  const { viewerCanvasProps, modelsHaveLoaded, pickedEntity } = useViewer(
    getModelsToLoad(selected, wireframe),
    {
      flyToModels: true,
    }
  );

  return (
    <div>
      <div>
        {modelsHaveLoaded ? 'Loaded' : 'Not loaded'} | Picked entity:{' '}
        {pickedEntity?.entityId
          ? `${pickedEntity.entityId} from ${pickedEntity.modelId}`
          : 'None'}
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="show"
          checked={show}
          onChange={evt => setShow(evt.target.checked)}
        />
        <label className="form-check-label" htmlFor="show">
          Show viewer
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="wireframe"
          checked={wireframe}
          onChange={evt => setWireframe(evt.target.checked)}
        />
        <label className="form-check-label" htmlFor="wireframe">
          Wireframe mode
        </label>
      </div>
      <div className="form-group row">
        {Object.keys(models).map(key => (
          <Fragment key={key}>
            <div className="col-auto col-form-label">{models[key].label}</div>
            <div className="col">
              <select
                className="custom-select"
                id={key}
                onChange={handleChange}
                value={selected[key]}
              >
                <option value="none">None</option>
                {models[key].guids?.map((_, idx) => (
                  <option key={idx} value={idx}>
                    Parts {idx + 1}
                  </option>
                ))}
                <option value="all">All</option>
              </select>
            </div>
          </Fragment>
        ))}
      </div>
      {show ? <canvas {...viewerCanvasProps} width="500" height="600" /> : null}
    </div>
  );
};

export default HooksGuids;
