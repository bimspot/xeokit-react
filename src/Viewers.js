/* eslint-disable import/order */
import { makeViewer } from './Viewer';
import { GLTFLoaderPlugin } from 'xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin';
import { XKTLoaderPlugin } from 'xeokit-sdk/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin';

export const GLTFViewer = makeViewer(GLTFLoaderPlugin);
export const XKTViewer = makeViewer(XKTLoaderPlugin);
