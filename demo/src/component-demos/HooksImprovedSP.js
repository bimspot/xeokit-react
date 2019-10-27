import React, { useState } from 'react';
import { hooksModel, hooksSchep } from '../models';

import useViewer from 'xeokit-react/useViewer';

const models = [
  {
    name: 'xkt-model',
    modelObj: [hooksModel],
  },
  {
    name: 'xkt-schependomlaan',
    modelObj: [hooksSchep],
  },
];

const planes = [
  {
    id: 'mySectionPlane1',
    pos: [0, 0, 0],
    dir: [0, 0, 1],
  },
  {
    id: 'mySectionPlane2',
    pos: [0, 0, 0],
    dir: [1, 1, 1],
  },
];

const HooksImprovedSP = () => {
  const [activeModel, setActiveModel] = useState(models[0].modelObj);
  const [activePlane, setActivePlane] = useState(planes[0]);
  const { viewerCanvasProps, sectionPlanesControl } = useViewer(activeModel, {
    sectionPlane: activePlane,
  });
  return (
    <div>
      <select
        value={activeModel[0].id}
        onChange={event => {
          const modelToSet = models.find(
            ({ name }) => name === event.target.value
          );
          setActiveModel(modelToSet.modelObj);
        }}
      >
        <option value={''} disabled hidden>
          Select a model
        </option>
        {models.map(({ name, modelObj }) => (
          <option key={modelObj[0].id} value={modelObj[0].id}>
            {name}
          </option>
        ))}
      </select>
      <select
        value={activePlane.id}
        onChange={event => {
          const planeToSet = planes.find(({ id }) => event.target.value === id);
          setActivePlane(planeToSet);
        }}
      >
        {planes.map(({ id }) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <div>
        <button
          className="btn btn-light border my-2 mr-2"
          onClick={sectionPlanesControl.toggleStatus}
        >
          Toggle section plane control
        </button>
        {sectionPlanesControl.enabled ? (
          <button
            className="btn btn-light border my-2 mr-2"
            onClick={sectionPlanesControl.toggleVisibility}
          >
            Toggle visibility
          </button>
        ) : null}
      </div>

      <canvas width="600" height="600" {...viewerCanvasProps} />
    </div>
  );
};

export default HooksImprovedSP;
