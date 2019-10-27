import React, { useState } from 'react';
import { hooksSchep, hooksModel, sampleModel2, sampleModel3 } from '../models';
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

// const models = [
//   {
//     name: 'OTCConferenceCenter',
//     modelObj: [sampleModel2],
//   },
//   {
//     name: 'schependomlaan',
//     modelObj: [sampleModel3],
//   },
// ];

const HookSwitchModelsWithSP = () => {
  const [activeModel, setActiveModel] = useState(models[0].modelObj);
  const { viewerCanvasProps, sectionPlanesControl } = useViewer(activeModel);
  return (
    <div>
      <select
        value={activeModel[0].id}
        onChange={event => {
          const modelToSet = models.filter(model => {
            console.log(model);
            console.log(event.target.value);
            return model.name === event.target.value;
          })[0].modelObj;
          setActiveModel(modelToSet);
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

export default HookSwitchModelsWithSP;
