import React, { Component } from "react";
import { Viewer } from "xeokit-sdk/src/viewer/Viewer";
import { GLTFLoaderPlugin } from "xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin";
import { BCFViewpointsPlugin } from "xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin";
import difference from "lodash/difference";

class GLTFViewer extends Component {
    componentDidMount() {
        // Get the necessary props with some nice destructuring
        const {
            canvasID,
            models,
            camera,
            bcfViewpoints,
            eventToPickOn
        } = this.props;

        // First, we instantiate the viewer with the canvasID
        this.setUpViewer(canvasID);

        // If there's any camera settings passed through props
        // let's apply them here
        if (camera) this.setCamera();

        // Then we load the necessary plugins
        this.loadPlugins();

        // Then we load the model(s)
        const modelsToShow = this.loadModels(models);

        // Set the bcfViewpoints if there's any
        if (bcfViewpoints) this.setBCFViewpoints(bcfViewpoints, modelsToShow);

        // The picker function is called on the scene with
        // the desired event type (e.g. mouseclicked, mousemove, etc)
        this.pickEntity(eventToPickOn);
    }

    // Whenever the props change, this method will run
    componentDidUpdate(prevProps) {
        const currentProps = this.props;

        // Whenever the models prop changes, we want to add/remove
        // the respective models that were added to/removed from the
        // models array
        // We use lodash's difference function to compare the previous &
        // current props
        if (prevProps.models !== currentProps.models) {
            const toAdd = difference(currentProps.models, prevProps.models);
            const toRemove = difference(prevProps.models, currentProps.models);

            toAdd.forEach(el => this.gltfLoader.load(el));

            toRemove.forEach(el => {
                const elID = el.id;
                const elToRemove = this.viewer.scene.models[elID];
                elToRemove.destroy();
            });
        }
    }

    // Instantiate the viewer and store it on the component
    // instance so that any of our methods can have access to it
    setUpViewer(canvasID) {
        this.viewer = new Viewer({
            canvasId: canvasID
        });
    }

    // We store the plugins on the component instance too for the
    // same reason we did with the viewer
    loadPlugins() {
        this.gltfLoader = new GLTFLoaderPlugin(this.viewer);

        // Only instantiate the BCFViewpointsPlugin if there are any
        // bcfViewpoints passed through props
        if (this.props.bcfViewpoints) {
            this.BCFViewpointsPlugin = new BCFViewpointsPlugin(this.viewer);
        }
    }

    loadModels(models) {
        return models.map(model => this.gltfLoader.load(model));
    }

    setCamera() {
        const camera = this.viewer.scene.camera;

        // Get camera settings from props
        const { eye, look, up, zoom } = this.props.camera;

        camera.eye = eye;
        camera.look = look;
        camera.up = up;
        camera.zoom(zoom);
    }

    setBCFViewpoints(viewpoints, models) {
        models.forEach((model, idx) => {
            const viewpoint = viewpoints[idx];
            // Try and set viewpoint only if one exists at all
            // for the corresponding element
            if (viewpoint) {
                model.on("loaded", () =>
                    this.BCFViewpointsPlugin.setViewpoint(viewpoint)
                );
            }
        });
    }

    // Attempt to pick an entity
    // Highlight each entity successfully picked
    // Log picked entity's id to the console
    // the click event will be the default if there's nothing
    // else explicitly passed through
    pickEntity(eventToPickOn = "mouseclicked") {
        let lastEntity = null;
        let lastColorize = null;

        const scene = this.viewer.scene;

        scene.input.on(eventToPickOn, coords => {
            const hit = scene.pick({
                canvasPos: coords
            });

            if (hit) {
                console.log(hit.entity.id);
                if (!lastEntity || hit.entity.id !== lastEntity.id) {
                    if (lastEntity) {
                        lastEntity.colorize = lastColorize;
                    }
                    lastEntity = hit.entity;
                    lastColorize = hit.entity.colorize.slice();
                    hit.entity.colorize = [0.0, 1.0, 0.0];
                }
            } else {
                if (lastEntity) {
                    lastEntity.colorize = lastColorize;
                    lastEntity = null;
                }
            }
        });
    }

    render() {
        return (
            <canvas
                id={this.props.canvasID}
                width={this.props.width}
                height={this.props.height}
                className="d-block mx-auto border border-secondary m-3 mw-100"
            />
        );
    }
}

export default GLTFViewer;
