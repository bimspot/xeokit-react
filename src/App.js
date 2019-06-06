import React from "react";
import { sampleModel1, sampleModel2, sampleModel3 } from "./models";
import CanvasCard from "./CanvasCard";
import GLTFViewer from "./GLTFViewer";

const sampleCameraProps = {
    eye: [-10, 0, 0],
    look: [-1, 0, 0],
    up: [0, 1, 0],
    zoom: -10
};

const App = () => (
    <div className="container my-5">
        <h1 className="text-center text-light">
            Xeokit-SDK React integration demo
        </h1>
        <CanvasCard
            canvasID="canvas-1"
            width={600}
            height={600}
            models={[sampleModel2]}
        />
        <CanvasCard
            canvasID="canvas-2"
            width={1200}
            height={800}
            models={[sampleModel1, sampleModel3]}
        />
        <div className="m-5">
            <GLTFViewer
                canvasID="canvas-3"
                width={600}
                height={600}
                models={[sampleModel1]}
                camera={sampleCameraProps}
            />
        </div>
    </div>
);

export default App;
