# Xeokit-SDK integration into React

This attempt to integrate the [xeokit-sdk](https://github.com/xeokit/xeokit-sdk)'s GLTF viewer into a React application aims to largely satisfy the following requirements:

- specify the dimensions of the viewer
- add more than one viewer
- load multiple models into one viewer

The GLTFViewer component receives the following props:

- canvasID (string)
- width (of the canvas) (integer)
- height (of the canvas) (integer)
- an array of model objects (see the models file for reference) to load into the current viewer/canvas

It returns a canvas element with the specified options (id, size, models to render).

Note: *I wrapped the GLTFViewer with a presentational component (CanvasCard) but that's just for demonstration purposes.*

The GLTFViewer component handles the main business and rendering logic (eg. setting up the canvas, creating the viewer, loading the components, etc).

A couple of example models have been included with this demo. Please refer to the CRA docs below to run and/or install this application locally.

### Closing thoughts:
**This demo app largely satisfies the requirements set forth at the beginning of this README file.** One can add one or multiple viewers by simply adding the GLTFViewer component (or the presentational component it's wrapped in, as desired). By passing the appropriate props to it, one can easily customize its size and contents (=model(s) to load). See the App.js file for a few examples.

Some things to consider and watch out for that are currently beyond the scope of this demo:

- Proper canvas sizing that takes into account, among other things, responsive design, aspect ratios, container sizes, etc might prove to be a bit tricky. Some reading material on the subject for the future: https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html


### Development notes:
- Basic camera control and zooming have been added, these can be passed as props to the viewer component now. For now, the ```eye```, ```look```, ```up``` and ```zoom``` camera properties have been added but it should be relatively easy to extend this with others if required. One open question is whether all camera properties are supposed to be passed through or can we be selective about this? That is, can I pass one component only the ```zoom``` value and another one the whole package?

### TODOS:
- [ ] create individual demo components to keep App.js clean
- [ ] update readme as the individual features are incorporated into master
- [ ] clean up readme/comments/code (console.logs, etc)
- [ ] conditional loading/instantiating (only use what we've passed through props, etc)
- [ ] proper organisation (files, folders, utilities, etc)
___

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
