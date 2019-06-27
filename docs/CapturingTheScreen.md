# Capturing The Screen

There are currently 2 ways to take a screenshot of a given scene.

## Option 1

A `Take Screenshot` button can **optionally** be rendered with the viewer if the `enableScreenshot` prop is supplied:

```js
<GLTFViewer canvasID="canvas-5" models={[sampleModel1]} enableScreenshot />
```

With this option, a button element will be rendered for you. We currently have some standard Bootstrap 4 styles applied to the button but you may of course overwrite it with your own; the button has a `take-screenshot` id that can be used as a styling hook.

There is room for further enhancements here, such as providing styling props or even passing in your very own component so that you have more control over what gets rendered and how.

There is one key drawback with this sort of approach, however. The button/component has to be rendered in the GLTFViewer component. In this way, you never would have full control over its position in the DOM for instance.

Enter option 2.

## Option 2

The functionality that enables capturing the scene is a fairly simple method on the GLTFViewer component instance. We would have to somehow expose this method for you to be able to attach it to any element you like. In React, there's no straightforward way to share data/methods/etc between sibling components, so we'll have to get a bit creative.

We suggest that you use [refs](https://reactjs.org/docs/refs-and-the-dom.html) to gain access to the GLTFViewer component instance and thereby the appropriate method.

```js
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
          models={[sampleModel1]}
          ref={this.viewerRef}
        />
      </div>
    );
  }
}
```

As per the react documentation, "refs are created using `React.createRef()` and attached to React elements via the `ref` attribute" and "when a ref is passed to an element in render, a reference to the node becomes accessible at the `current` attribute of the ref". Also, "when the ref attribute is used on a _custom class component_, the ref object receives the **mounted instance** of the component as its current".

This is exactly what we need. Now you may supply your very own, completely custom element to which you can attach the `takeScreenshot` method that is now available on the ref's `current` attribute.

---

This functionality has been tested on Windows 7 and MacOS; will need to be tested on other OSes and devices too.
