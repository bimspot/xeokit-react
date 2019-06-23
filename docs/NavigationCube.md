# Navigation Cube

The [NavCube plugin](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_NavCubePlugin) can optionally be enabled to provide convenient camera controls. The **optional** `navCubeSettings` prop expects an object with the navcube configs. An example config object might look like this:

```js
const sampleNavCubeSettings = {
    canvasId: "myNavCubeCanvas",
    visible: true,
    cameraFly: true,
    cameraFitFOV: 45,
    cameraFlyDuration: 0.5,
    canvasWidth: 250,
    canvasHeight: 250
};
```

The NavCube plugin is only instantiated if a `navCubeSettings` props was passed through.