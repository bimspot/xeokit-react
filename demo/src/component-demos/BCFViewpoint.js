import React from "react";
import { sampleModel3, sampleModel1 } from "../models";
import { GLTFViewer } from "xeokit-react";
import bcfViewpoints from "../bcf_viewpoints.json";

const BCFViewpoint = () => (
    <GLTFViewer
        canvasID="canvas-2"
        width={600}
        height={600}
        models={[sampleModel3, sampleModel1]}
        bcfViewpoint={bcfViewpoints[0]}
    />
);

export default BCFViewpoint;
