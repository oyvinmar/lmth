import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigato;
