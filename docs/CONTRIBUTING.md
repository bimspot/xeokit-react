# Contribution guide

Thank you for your interest in contributing to the [xeokit-react](https://github.com/bimspot/xeokit-react) library.

There are a couple of ways in which you can contribute.

## Reporting bugs

Please use our [github issues](https://github.com/bimspot/xeokit-react/issues) page for bug reports. We kindly ask you to check the closed issues tab first before submitting your bug report. You may find that your issue has already been solved.

When making a submission, please keep the following in mind:

- describe the exact steps that caused the bug so that we can reproduce them as closely as possible
- if possible, provide/share the code you're using; some possible ways to share include:
  - github repo links
  - codepen, codesandbox, etc.
  - for smaller snippets, gists or even inline code blocks provided in the issue itself would suffice (in the latter case, please make sure to use markdown syntax highlighting)
- explain the desired behaviour

In general, please be as thorough and include as much detail as you possibly can.

## Suggesting features/enhancements

Please use our [github issues](https://github.com/bimspot/xeokit-react/issues) page for feature requests.

Before making a feature request, please make sure that the desired feature has not been proposed already.

A good feature request would:

- include a brief summary and/or a bullet point list with the key aspects of the requested feature
- explain in detail the ways in which it would improve the current offering of the package
- include specific use case examples
- point to similar features in other libraries (if applicable)

## Code contributions

We would also, of course, very much appreciate your pull requests that improve the library's feature set, fix bugs, improve documentation, etc.

Please read the guide below before submitting your pull request.

### Gitflow

Our preferred git workflow is [gitflow](https://nvie.com/posts/a-successful-git-branching-model/). We urge you to give the link above a good read but the key points are as follows:

- `develop` is used for the ongoing development
- `feature` branches are created off of `develop`
- `release` branches are used to test and roll-out new versions of the app
- `hotfix` is used for patching the production version
- `master` branch is always the current production version

If you were to, say, add some new feature, this may be an optimal workflow:

- fork the repo and clone it
- create a feature branch from `develop`: `feature/awesome-feature`
- work on your feature, following the code style guide below
- when you're done, push to your forked repo
- create a pull request to the xeokit-react develop branch
- please include an appropriate message with your pull request (following the spirit of the bug report or feature request guidelines outlined above)

### Code quality, style

To keep things neat & tidy and above all consistent, we use [ESLint](https://eslint.org) for development. We use [`airbnb`'s ESLint config](https://www.npmjs.com/package/eslint-config-airbnb) with a couple of modifications (such as allowing JSX in `.js` files).

Some of the key points are:

- 2 space indents
- line length: 80
- single quotes
- use semicolons

You can inspect the full ruleset in the `.eslintrc` and `.prettierrc` files.

Since ESLint is added as a dev dependency, adhering to our style guide should be relatively straightforward and largely automated.

Please note that the above mostly concerns the core xeokit-react package residing in the src directory. The various demo examples in the demo directory may be edited/changed/added to more freely.

## Versioning

This project follows the [Semantic Versioning Specification, SemVer](https://semver.org) for short.

The essence of this approach can be summarised as follows (quoted from the official semver site):

> Consider a version format of X.Y.Z (Major.Minor.Patch). Bug fixes not affecting the API increment the patch version, backwards compatible API additions/changes increment the minor version, and backwards incompatible API changes increment the major version.

## Conclusion

If you are still in doubt about anything after reading this guide, please don't hesitate to get in touch.

We strive to respond to bug reports, feature requests, PRs and all other inquires as soon as possible; but please do keep in mind that we may not always be able to get back to you immediately.

Once more, thank you for any potential contributions,

Your friends @ [BIMSpot](https://www.bimspot.io)
