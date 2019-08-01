import { GLTFLoaderPlugin } from 'xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import { XKTLoaderPlugin } from 'xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';
import { makeViewer } from './Viewer';

export const GLTFViewer = makeViewer(GLTFLoaderPlugin);
export const XKTViewer = makeViewer(XKTLoaderPlugin);
