import { useEffect, useState } from 'react';

import { SectionPlanesPlugin } from 'xeokit-sdk/src/plugins/SectionPlanesPlugin/SectionPlanesPlugin';

// Section planes states
const VISIBLE = 'VISIBLE';
const HIDDEN = 'HIDDEN';
const DISABLED = 'DISABLED';

const isEnabled = state => state !== DISABLED;

const toggleStatus = state => (isEnabled(state) ? DISABLED : VISIBLE);
const toggleVisibility = state => (state === VISIBLE ? HIDDEN : VISIBLE);

const defaultPlane = {
  id: 'mySectionPlane',
  pos: [0, 0, 0],
  dir: [0, 0, 1],
};

export const useSectionPlanes = (viewer, plane = defaultPlane) => {
  const [state, setState] = useState(DISABLED);

  useEffect(
    () => () => {
      if (
        viewer &&
        viewer.scene.sectionPlanes &&
        viewer.scene.sectionPlanes[plane.id]
      ) {
        viewer.scene.sectionPlanes[plane.id].destroy();
      }
    },
    [viewer, plane]
  );

  useEffect(() => {
    if (viewer) {
      const sectionPlane = viewer.scene.sectionPlanes[plane.id];

      if (state === DISABLED) {
        if (sectionPlane) {
          sectionPlane.destroy();
        }
      } else {
        const sectionPlanesPlugin =
          viewer.plugins.SectionPlanes || new SectionPlanesPlugin(viewer);

        if (!sectionPlane) {
          sectionPlanesPlugin.createSectionPlane(plane);
        }

        if (state === VISIBLE) {
          sectionPlanesPlugin.showControl(plane.id);
        } else {
          sectionPlanesPlugin.hideControl();
        }
      }
    }
  }, [viewer, state, plane]);

  return {
    enabled: isEnabled(state),
    toggleStatus: () => setState(toggleStatus),
    toggleVisibility: () => setState(toggleVisibility),
  };
};
