# xeokit-sdk React integration

This attempt to integrate the [xeokit-sdk](https://github.com/xeokit/xeokit-sdk)'s GLTF viewer into a React application aims to largely satisfy/provide the following requirements/features:

- specify the dimensions of the viewer/canvas
- render one or multiple viewer components
- load scene with predefined camera settings
- load one or multiple models into one scene
- provide convenient camera presets/controls
- dynamically add/remove models to/from a scene
- load BCF viewpoint
- highlight/pick entities
- take screenshots of scene

At a minimum, the `GLTFViewer` component expects a `canvasID` prop (of *string* type). An HMTL canvas element will be created and for the viewer to work, it needs an ID. If multiple `GLTFViewer`s are desired, then each `canvasID` neeeds to be **unique**.

The canvas dimensions can optionally be controlled by the `width` and `height` props, both of which expect integers.

The optional `camera` prop can be passed through to load the scene with predefined camera settings. It expects an object and can set the camera's `eye`, `look`, `up` and `zoom` properties. A sample camera object may look like this:

```js
{
  eye: [-10, 0, 0],
  look: [-1, 0, 0],
  up: [0, 1, 0],
  zoom: -10
}
```

The `models` prop is also one that one will probably want to pass through. It expects an *array* of model objects. Please see the `models.js` file for a couple of examples. An empty array can also be given here if models are to be added dynamically from a UI interface or possibly fetched from a network resource. See the `ChangeModels.js` file for an example in the `component-demos` folder.

The `bcfViewpoint` is an optional prop that expects a viewpoints *object*. See the `bcf_viewpoints.json` file for an example of the viewpoint file's structure. After some experimentation, I have found that BCF viewpoints are more tied to the scene object itself rather than the models on the scene. They seem to be only connected to models in that a *selection* array of objects can be supplied to select entities on models. As a result, instead of a bcfViewpoints prop that accepts an array of viewpoints, a bcfViewpoint (singular) prop has been implemented that accepts one viewpoints obejct. See [this issue](https://github.com/bimspot/xeokit-react-demo/issues/3) for further details.

Highlighting/picking entities in a scene is enabled by default and cannot be opted out of. Should this later be a requirement/request, it certainly seems possible to change this behaviour. Picking happens on a mouse click event by default but this can be overridden by supplying the `eventToPickOn` prop that expects a *string* with the desired event name. Possible event types are not yet fully documented but should later be available in full. Follow [this issue](https://github.com/xeokit/xeokit-sdk/issues/87) on the xeokit-sdk repo to get updates.

The [NavCube plugin](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_NavCubePlugin) can optionally be enabled to provide convenient camera controls. The optional `navCubeSettings` prop expects an object with the navcube configs. Please see the `navcube_settings.js` file for an example.

A `Take Screenshot` button can optionally be rendered with the viewer if the `enableScreenshot` prop is supplied with a *truthy* value.

---

Some things to consider and watch out for that have yet to be tackled:

- Proper canvas sizing that takes into account, among other things, responsive design, aspect ratios, container sizes, etc might prove to be a bit tricky. Some reading material on the subject for the future: https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html

---

### TODOS:
- [ ] proper organisation (files, folders, utilities, etc)
- [ ] add prop-types
- [ ] administrative stuff (add/edit license, description, package.json, etc)

### DONE:
- [x] create individual demo components to keep App.js clean
- [x] update readme as the individual features are incorporated into master
- [x] clean up readme/comments/code (console.logs, etc)
- [x] conditional loading/instantiating (only use what we've passed through props, etc)

---

Further todos, feature additions, enchancements requests and bugs will likely be indicated and tracked on the issues page from now on.

---


## Standard CRA docs below:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
