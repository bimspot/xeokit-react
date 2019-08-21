export const pickEntity = (viewer, eventToPickOn, setPickedEntityID) => {
  let lastEntity = null;
  let lastColorize = null;

  const { scene } = viewer;

  scene.input.on(eventToPickOn, (coords) => {
    const hit = scene.pick({
      canvasPos: coords,
    });

    if (hit) {
      // eslint-disable-next-line no-console
      console.log(hit.entity.id);
      setPickedEntityID(hit.entity.id);
      if (!lastEntity || hit.entity.id !== lastEntity.id) {
        if (lastEntity) {
          lastEntity.colorize = lastColorize;
        }
        lastEntity = hit.entity;
        lastColorize = hit.entity.colorize.slice();
        hit.entity.colorize = [0.0, 1.0, 0.0];
      }
    } else if (lastEntity) {
      lastEntity.colorize = lastColorize;
      lastEntity = null;
    }
  });
};
