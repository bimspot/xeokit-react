# Highlighting Elements

Highlighting/picking entities in a scene is **enabled by default** and cannot be opted out of. Should this later be a requirement/request, it certainly seems possible to change this behaviour. Picking happens on a **mouse click** event by default but this can be overridden by supplying the `eventToPickOn` prop that expects a *string* with the desired event name. 

```js
<GLTFViewer
    canvasID="canvas-3"
    models={[sampleModel1]}
    eventToPickOn={"mouseclicked"}
/>
```

Possible event types are not yet fully documented but should later be available in full. Follow [this issue](https://github.com/xeokit/xeokit-sdk/issues/87) on the xeokit-sdk repo to get updates.

For now, the highlighted entity's ID is merely logged to the console. This functionality is likely to be extended in the future.