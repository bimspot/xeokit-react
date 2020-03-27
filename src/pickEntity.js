import { useState, useEffect } from 'react';

export const deselect = entity => {
  if (entity && !entity.model.destroyed) {
    entity.selected = false;
  }
  return null;
};

const select = entity => prevEntity => {
  deselect(prevEntity);
  entity.selected = true;
  return entity;
};

export const usePickEntity = (viewer, eventToPickOn) => {
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    let escapeHandle, pickHandle;

    if (viewer) {
      const { scene } = viewer;

      escapeHandle = scene.input.on('keydown', keyCode =>
        keyCode === scene.input.KEY_ESCAPE ? setEntity(deselect) : null
      );

      pickHandle = scene.input.on(eventToPickOn, coords => {
        const hit = scene.pick({
          canvasPos: coords,
        });

        setEntity(hit ? select(hit.entity) : deselect);
      });
    }
    return () => {
      if (viewer) {
        const { input } = viewer.scene;
        input.off(escapeHandle);
        input.off(pickHandle);
      }
    };
  }, [viewer, eventToPickOn]);

  useEffect(() => () => setEntity(deselect), [viewer]);

  return [entity, setEntity];
};
