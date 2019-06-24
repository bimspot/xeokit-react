# BCF Viewpoints

## Usage
The `bcfViewpoint` is an **optional** prop that expects a viewpoints *object*. See the `bcf_viewpoints.json` file in the `demo/src` directory for an example of the viewpoint file's structure. After some experimentation, I have found that BCF viewpoints are more tied to the scene object itself rather than the models on the scene. They seem to be only connected to models in that a *selection* array of objects can be supplied to select entities on models. As a result, instead of a bcfViewpoints prop that accepts an array of viewpoints, a bcfViewpoint (singular) prop has been implemented that accepts **one** viewpoints obejct.
See [this issue](https://github.com/bimspot/xeokit-react-demo/issues/3) for further details.

An example of how to pass through a viewpoints object:

```js
<GLTFViewer
    canvasID="canvas-2"
    models={[sampleModel3, sampleModel1]}
    bcfViewpoint={bcfViewpoints[0]}
/>
```

For performance reasons, the `BCFViewpointsPlugin` is only initialised if the `bcfViewpoint` prop has been passed through with a viewpoint.

## Implementation details
As previously noted, BCF viewpoints seem to be only connected to models in that a *selection* array of objects can be supplied to select entities on models.

In a use case that involves loading more than one model into the scene, we have to make sure that all models have actually been properly loaded into the scene before calling the `setViewpoint` method on the plugin. 

Since the xeokit-sdk has no convenience method that lets us perform actions when **all** models have been loaded into a scene, we have to wrap each model `loaded` event with a **promise**. On the `loaded` event, we immediately resolve. Once all the models have been loaded and thus all the promises have been resolved, we can finally load our viewpoint (=call `setViewpoint`).

See the exact implementation in the `GLTFViewer.js` file in the `src` directory.
