import React from "react";
import { sampleModel1 } from "../models";
import GLTFViewer from "../GLTFViewer";

const Screenshot = () => (
    <GLTFViewer
        canvasID="canvas-5"
        width={600}
        height={600}
        models={[sampleModel1]}
        enableScreenshot={true}
    />
);

export default Screenshot;
