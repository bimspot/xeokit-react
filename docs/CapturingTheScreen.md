# Capturing The Screen

A `Take Screenshot` button can **optionally** be rendered with the viewer if the `enableScreenshot` prop is supplied with a *truthy* value:

```js
<GLTFViewer
    canvasID="canvas-5"
    models={[sampleModel1]}
    enableScreenshot={true}
/>
```

This functionality has been tested on Windows 7 and MacOS; will need to be tested on other OSes and devices too.