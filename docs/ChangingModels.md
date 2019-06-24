# Changing Models

The `models` prop is **required** to be passed through. It expects an *array* of model objects. Each model object needs to have an `id` and a `src` property at a minimum:

```js
const sampleModel1 = {
    id: "duplex",
    src: "./models/duplex/scene.gltf"
}
```

Please see the `models.js` file in `demo/src` for a couple more examples.

An empty array can also be given here if models are to be added dynamically from a UI interface or possibly fetched from a network resource.

```js
<GLTFViewer
    canvasID="canvas-1"
    models={this.state.modelsToLoad}
/>
```

Where `modelsToLoad` is by default an empty array on your component's local state and can be, say, set to an array of models fetched from an API in the constructor or one of React's lifecycle events.

See the `ChangeModels.js` file for a concrete example in the `demo/src/component-demos` folder.