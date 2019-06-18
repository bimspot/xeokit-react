import React, { Component } from "react";
import PropTypes from "prop-types";
import { Viewer } from "xeokit-sdk/src/viewer/Viewer";
import { GLTFLoaderPlugin } from "xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin";
import { BCFViewpointsPlugin } from "xeokit-sdk/src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin";
import { NavCubePlugin } from "xeokit-sdk/src/plugins/NavCubePlugin/NavCubePlugin";
import difference from "lodash/difference";

class GLTFViewer extends Component {
    componentDidMount() {
        // Get the necessary props with some nice destructuring
        const { camera, bcfViewpoint } = this.props;

        // First, we instantiate the viewer with the canvasID
        this.setUpViewer();

        // If there's any camera settings passed through props
        // let's apply them here
        if (camera) this.setCamera();

        // Then we load the necessary plugins
        this.loadPlugins();

        // Then we load the model(s)
        const perfModels = this.loadModels();

        // Set the bcfViewpoint if there's any
        console.log(bcfViewpoint);
        if (bcfViewpoint) this.setBCFViewpoints(perfModels);

        // The picker function is called on the scene with
        // the desired event type (e.g. mouseclicked, mousemove, etc)
        this.pickEntity();
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

            const perfModels = toAdd.map(el => this.gltfLoader.load(el));

            if (currentProps.bcfViewpoint) this.setBCFViewpoints(perfModels);

            toRemove.forEach(el => {
                const elID = el.id;
                const elToRemove = this.viewer.scene.models[elID];
                elToRemove.destroy();
            });
        }
    }

    // Destroy/clean up viewer on component unmount
    componentWillUnmount() {
        this.viewer.destroy();
    }

    // Instantiate the viewer and store it on the component
    // instance so that any of our methods can have access to it
    setUpViewer() {
        this.viewer = new Viewer({
            canvasId: this.props.canvasID
        });
    }

    // We store the plugins on the component instance too for the
    // same reason we did with the viewer
    loadPlugins() {
        this.gltfLoader = new GLTFLoaderPlugin(this.viewer);

        // Only instantiate the BCFViewpointsPlugin if there are any
        // bcfViewpoints passed through props
        if (this.props.bcfViewpoint) {
            this.BCFViewpointsPlugin = new BCFViewpointsPlugin(this.viewer);
        }

        // Only instantiate the NavCubePlugin if there are any
        // navcube settings passed through props
        if (this.props.navCubeSettings) {
            new NavCubePlugin(this.viewer, this.props.navCubeSettings);
        }
    }

    loadModels() {
        return this.props.models.map(model => this.gltfLoader.load(model));
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

    setBCFViewpoints(models) {
        // bcf viewpoints are only tied to models in that there might
        // be some entities pre-selected on the model(s)

        // say we have 2 models and 1 bcf viewpoint
        // in that viewpoint is a selection array with entity IDs
        // we have IDs from both our models
        // for us to be able to load and render them properly, we have to
        // make sure that both those models have loaded

        // since the xeokit sdk has no convenience method that lets us
        // perform actions when all models have been loaded into a scene
        // we have to wrap each model loaded event with a promise
        // on the load event we immediately call the resolve function
        const promises = models.map(
            model => new Promise(resolve => model.on("loaded", resolve))
        );

        // once all the models have been loaded and thus all the promises
        // have been resolved, we can finally load our viewpoint
        Promise.all(promises).then(() =>
            this.BCFViewpointsPlugin.setViewpoint(this.props.bcfViewpoint)
        );
    }

    // Attempt to pick an entity
    // Highlight each entity successfully picked
    // Log picked entity's id to the console
    // the click event will be the default if there's nothing
    // else explicitly passed through
    pickEntity() {
        const eventToPickOn = this.props.eventToPickOn || "mouseclicked";
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

    takeScreenshot(screenShotWidth) {
        // For now we take the screenshot based on the canvas's size
        // so the below is not needed

        // const canvas = this.viewer.scene.canvas;
        // const canvasElement = canvas.canvas;
        // const aspect = canvasElement.height / canvasElement.width;
        // const width = screenShotWidth;
        // const height = Math.floor(width * aspect);

        const imageData = this.viewer.getSnapshot({
            format: "png"
            // width: width,
            // height: height
        });

        // console.log(imageData);

        // The anchor element's download tag enables us to save the
        // screenshot to the file system
        // we don't actually append the link to the page
        // we just call the click event on it to start/prompt the download
        const link = document.createElement("a");
        link.setAttribute("href", imageData);
        link.setAttribute("download", "model-screenshot");
        link.click();
    }

    render() {
        return (
            <div>
                <canvas
                    id={this.props.canvasID}
                    width={this.props.width}
                    height={this.props.height}
                    className="d-block mx-auto border border-secondary m-3 mw-100"
                />
                {this.props.navCubeSettings ? (
                    <canvas
                        id={this.props.navCubeSettings.canvasId}
                        width={this.props.navCubeSettings.canvasWidth}
                        height={this.props.navCubeSettings.canvasHeight}
                        className="d-block mx-auto mw-100"
                    />
                ) : null}
                {this.props.enableScreenshot ? (
                    <button
                        id="take-screenshot"
                        className="btn btn-primary"
                        onClick={() => this.takeScreenshot()}
                    >
                        Take Screenshot
                    </button>
                ) : null}
            </div>
        );
    }
}

GLTFViewer.propTypes = {
    canvasID: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    camera: PropTypes.object,
    models: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired
        })
    ).isRequired,
    bcfViewpoint: PropTypes.object,
    eventToPickOn: PropTypes.string,
    navCubeSettings: PropTypes.shape({ canvasId: PropTypes.string.isRequired }),
    enableScreenshot: PropTypes.bool
};

export default GLTFViewer;
