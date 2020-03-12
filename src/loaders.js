import { useRef, useEffect, useState } from 'react';
import { GLTFLoaderPlugin } from '@xeokit/xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import { XKTLoaderPlugin } from '@xeokit/xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';
import { getExtension } from './utils';
import difference from 'lodash.difference';

export const defaultLoaders = {
  gltf: { loader: GLTFLoaderPlugin },
  xkt: { loader: XKTLoaderPlugin },
};

const usePreviousModels = (models, viewer, setModelsHaveLoaded) => {
  const ref = useRef([]);

  useEffect(() => {
    if (viewer) {
      ref.current = models;
    } else {
      ref.current = [];
      setModelsHaveLoaded(false);
    }
  }, [viewer, models, setModelsHaveLoaded]);

  return ref.current;
};

const stringify = arr => arr.map(obj => JSON.stringify(obj));
const parse = arr => arr.map(str => JSON.parse(str));

export const useLoaders = (
  viewer,
  models,
  loaders = defaultLoaders,
  pickedEntity,
  setPickedEntity,
  flyToModels
) => {
  // A piece of state that tells us if the models have been loaded
  const [modelsHaveLoaded, setModelsHaveLoaded] = useState(false);
  const prevModels = usePreviousModels(models, viewer, setModelsHaveLoaded);

  const modelsJSON = stringify(models);
  const prevModelsJSON = stringify(prevModels);

  const toAdd = parse(difference(modelsJSON, prevModelsJSON));
  const toRemove = parse(difference(prevModelsJSON, modelsJSON));

  useEffect(() => {
    // Initialise loader plugin (eg. gltfLoader, xktLoader) and load models
    if (viewer) {
      toRemove.forEach(el => {
        const elID = el.id;
        const elToRemove = viewer.scene.models[elID];
        elToRemove && elToRemove.destroy();
      });
      if (pickedEntity?.model.destroyed) {
        setPickedEntity(null);
      }

      if (toRemove.length && !toAdd.length) {
        flyToModels
          ? viewer.cameraFlight.flyTo(viewer.scene.aabb)
          : viewer.cameraFlight.jumpTo(viewer.scene.aabb);
      }

      if (!toAdd.length) {
        return;
      }

      const promises = toAdd.map(
        model =>
          new Promise(resolve => {
            const { loader: LoaderPlugin, dataSource } =
              loaders[getExtension(model.src)] || {};
            if (!LoaderPlugin) {
              resolve();
              return;
            }

            const plugins = viewer.plugins;
            const loader =
              (plugins && plugins[LoaderPlugin.name]) ||
              new LoaderPlugin(viewer, {
                id: LoaderPlugin.name,
                dataSource,
              });
            const perfModel = loader.load(model);
            perfModel.on('loaded', () => {
              flyToModels
                ? viewer.cameraFlight.flyTo(viewer.scene.aabb)
                : viewer.cameraFlight.jumpTo(viewer.scene.aabb);
              resolve();
            });
          })
      );

      // once all the models have been loaded and thus all the promises
      // have been resolved, we can finally load our viewpoint
      Promise.all(promises).then(() => setModelsHaveLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewer, models, loaders, setModelsHaveLoaded]);

  return modelsHaveLoaded;
};
