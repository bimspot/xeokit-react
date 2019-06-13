import React from "react";
import ChangeModels from "./component-demos/ChangeModels";
import BCFViewpoint from "./component-demos/BCFViewpoint";

const App = () => (
    <div className="container my-5">
        <h1 className="text-center text-light my-5">
            Xeokit-SDK React integration demo
        </h1>
        <div className="card bg-light my-5">
            <div className="card-header">Feature</div>
            <div className="card-body">
                <h4 className="card-title mb-5">Changing models</h4>
                <ChangeModels />
            </div>
        </div>
        <div className="card bg-light my-5">
            <div className="card-header">Feature</div>
            <div className="card-body">
                <h4 className="card-title mb-5">Load BCF Viewpoint</h4>
                <BCFViewpoint />
            </div>
        </div>
    </div>
);

export default App;
