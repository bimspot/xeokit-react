import React, { Component } from "react";
import { sampleModel1, sampleModel2, sampleModel3 } from "../models";
import { GLTFViewer } from "xeokit-react";

const sampleModels = [sampleModel1, sampleModel2, sampleModel3];
const models = sampleModels.map(model => ({ ...model, isChecked: false }));

class ChangeModels extends Component {
    constructor(props) {
        super(props);

        this.state = { models, modelsToLoad: [] };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        const { checked, id } = event.target;
        const newModels = this.state.models.map(model =>
            model.id === id ? { ...model, isChecked: checked } : model
        );
        const newModelsToLoad = newModels.filter(model => model.isChecked);
        this.setState({ models: newModels, modelsToLoad: newModelsToLoad });
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-around my-5">
                    {this.state.models.map(model => (
                        <div
                            key={model.id}
                            className="custom-control custom-checkbox"
                        >
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={model.id}
                                checked={model.isChecked}
                                onChange={this.handleCheckboxChange}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={model.id}
                            >
                                {model.id}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="my-5">
                    <GLTFViewer
                        canvasID="canvas-1"
                        width={600}
                        height={600}
                        models={this.state.modelsToLoad}
                    />
                </div>
            </div>
        );
    }
}

export default ChangeModels;
