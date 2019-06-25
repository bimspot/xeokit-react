import React, { Component } from 'react';
import { sampleModel1 } from '../models';
import { GLTFViewer } from 'xeokit-react';

class Screenshot extends Component {
  constructor() {
    super();
    this.viewerRef = React.createRef();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.viewerRef.current.takeScreenshot()}>
          Take Screenshot
        </button>
        <GLTFViewer
          canvasID="canvas-5"
          width={600}
          height={600}
          models={[sampleModel1]}
          enableScreenshot={false}
          ref={this.viewerRef}
        />
      </div>
    );
  }
}

export default Screenshot;
