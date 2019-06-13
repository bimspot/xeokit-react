import React from "react";
import { sampleModel3 } from "../models";
import GLTFViewer from "../GLTFViewer";
import bcfViewpoints from "../bcf_viewpoints.json";

const BCFViewpoint = () => (
    <GLTFViewer
        canvasID="canvas-2"
        width={600}
        height={600}
        models={[sampleModel3]}
        bcfViewpoints={[bcfViewpoints[0]]}
    />
);

export default BCFViewpoint;
