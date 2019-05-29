import React from "react";
import { sampleModel1, sampleModel2, sampleModel3 } from "./models";
import GLTFViewer from "./GLTFViewer";

const App = () => (
    <div>
        <GLTFViewer
            canvasID="canvas-1"
            width={200}
            height={200}
            models={[sampleModel1]}
        />
        <GLTFViewer
            canvasID="canvas-2"
            width={1200}
            height={500}
            models={[sampleModel2, sampleModel3]}
        />
    </div>
);

export default App;
