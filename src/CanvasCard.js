import React from "react";
import GLTFViewer from "./GLTFViewer";

const CanvasCard = ({ canvasID, width, height, models }) => (
    <div className="card m-5">
        <div className="card-body">
            <h5 className="card-title">{canvasID}</h5>
            <div className="position-relative overflow-hidden">
                <GLTFViewer
                    canvasID={canvasID}
                    width={width}
                    height={height}
                    models={models}
                />
            </div>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                Native canvas dimensions (W x H): {width} x {height}
            </li>
            <li className="list-group-item">
                Number of models on canvas/viewer: {models.length}
            </li>
            <li className="list-group-item">
                Models: {models.map(model => `${model.id}`).join(", ")}
            </li>
        </ul>
    </div>
);

export default CanvasCard;
