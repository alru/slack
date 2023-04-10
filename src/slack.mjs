import App from './app/app.mjs';
import * as blocks from './blockkit/blocks.mjs';
import * as elements from './blockkit/elements.mjs';
import * as objects from './blockkit/objects.mjs';
import home from './views/home.mjs';
import modal from './views/modal.mjs';
import {formatDate} from './utils/formatDate.mjs';

export default {
  App: App,
  blocks: blocks,
  elements: elements,
  objects: objects,
  home: home,
  modal: modal,
  utils: {
    formatDate: formatDate
  }
}