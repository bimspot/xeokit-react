# Getting Started

## Installation
This package should hopefully be available as an npm module in the near future. Until then, you may head on over to our [github repo](https://github.com/bimspot/xeokit-react) and clone it should you wish to experiment with it.

The `src` directory contains the actual package, which for now consists of the GLTFViewer.js file. A `demo` dir has been set up with a demo application (bootstrapped by create-react-app) and a couple of demo components in which you can inspect and try the module's capabilites.

So, in a few simple steps:
- cd into `src`
- `npm install`
- `npm run build` or `npm run dev` (the only difference is that `npm run dev` starts webpack with the watch flag)
- open a new terminal window/tab
- cd into `demo`
- `npm install`
- `npm start`

## Usage
In general, using this package is as simple as importing the GLTFViewer component and then putting it in your React application as such:

```js
import { GLTFViewer } from "xeokit-react";

<GLTFViewer
    canvasID="canvas-1"
    models={[sampleModel1]}
/>
```

### Minimally required props
There are only 2 props **required** to be supplied and those are the ones you see above. A `canvasID` (of *string* type) and a `models` prop.

An HMTL canvas element will be created and for the viewer to work, it needs an ID. If multiple `GLTFViewer` components are desired, then each `canvasID` neeeds to be **unique**.

The `models` prop expects an *array* of model objects. See the `models.js` file in the `demo/src` directory for a couple of examples.

### Optional props
The canvas dimensions can **optionally** be controlled by the `width` and `height` props, both of which expect numbers.

```js
<GLTFViewer
    canvasID="canvas-1"
    width={600}
    height={600}
    models={[sampleModel1]}
/>
```

The **optional** `camera` prop can be passed through to load the scene with predefined camera settings. It expects an object and can set the camera's `eye`, `look`, `up` and `zoom` properties.

```js
<GLTFViewer
    canvasID="canvas-1"
    models={[sampleModel1]}
    camera={sampleCameraObj}
/>
```

A sample camera object may look like this:

```js
const sampleCameraObj = {
  eye: [-10, 0, 0],
  look: [-1, 0, 0],
  up: [0, 1, 0],
  zoom: -10
}
```

### Other features
For all other supported features, see the **Features** section in the sidebar.