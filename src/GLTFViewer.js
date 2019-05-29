import React, { Component } from "react";
import { Viewer } from "xeokit-sdk/src/viewer/Viewer";
import { GLTFLoaderPlugin } from "xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin";

class GLTFViewer extends Component {
    constructor(props) {
        super(props);

        console.log("Props: ", props);
    }

    componentDidMount() {
        this.setupCanvas();
    }

    setupCanvas() {
        const viewer = new Viewer({
            canvasId: this.props.canvasID
        });

        const gltfLoader = new GLTFLoaderPlugin(viewer);

        const models = this.props.models.map(model => gltfLoader.load(model));
        console.log(models);
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
