import React from "react";
import { sampleModel1 } from "../models";
import { GLTFViewer } from "xeokit-react";
import { sampleNavCubeSettings } from "../navcube_settings";

const NavCube = () => (
    <GLTFViewer
        canvasID="canvas-4"
        width={600}
        height={600}
        models={[sampleModel1]}
        navCubeSettings={sampleNavCubeSettings}
    />
);

export default NavCube;
