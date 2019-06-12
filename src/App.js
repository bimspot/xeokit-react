import React from "react";
import ChangeModels from "./component-demos/ChangeModels";

const App = () => (
    <div className="container my-5">
        <h1 className="text-center text-light my-5">
            Xeokit-SDK React integration demo
        </h1>
        <div className="card bg-light">
            <div className="card-header">Feature</div>
            <div className="card-body">
                <h4 class="card-title">Changing models</h4>
                <ChangeModels />
            </div>
        </div>
    </div>
);

export default App;
