# xeokit-sdk React integration

This attempt to integrate the [xeokit-sdk](https://github.com/xeokit/xeokit-sdk)'s GLTF viewer into a React application aims to largely satisfy/provide the following requirements/features:

## Initially supported set of features:

- specify the dimensions of the viewer/canvas
- render one or multiple viewer components
- load scene with predefined camera settings
- load one or multiple models into one scene
- provide convenient camera presets/controls
- dynamically add/remove models to/from a scene
- load BCF viewpoint
- highlight/pick entities
- take screenshots of scene

## Documentation

Documentation can be found at https://bimspot.gitbook.io/xeokit-react/. Please note that the documentation is a work in progress. Nevertheless, if you find any errors or can't find proper documentation on a particular feature, do let us know and we'll do our best to remedy the situation.

## Bug tracking, feature requests

Indicate bugs, feature requests and any other issues here: https://github.com/bimspot/xeokit-react/issues.

## Todos, ideas

Some open questions:

- Proper canvas sizing that takes into account, among other things, responsive design, aspect ratios, container sizes, etc might prove to be a bit tricky. Some reading material on the subject for the future: https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
- styling
- publishing to npm repo

## Contributing

Please find our contribution guidelines @ our [docs pages](https://bimspot.gitbook.io/xeokit-react/); look for the `Contribution guidelines` menu in the sidebar.

---

## create-react-app docs for the demo application:

Please refer to the official [create-react-app documentation](https://facebook.github.io/create-react-app/docs/getting-started) to run and/or build the demo application.
