import App from './app/app.mjs';
import * as blocks from './blockkit/blocks.mjs';
import * as elements from './blockkit/elements.mjs';
import * as objects from './blockkit/objects.mjs';
import home from './views/home.mjs';
import modal from './views/modal.mjs';
import {formatDate, parseAction, parseBlock, parseView} from './utils/utils.mjs';

export default {
  App,
  blocks,
  elements,
  objects,
  home,
  modal,
  utils: {
    formatDate,
    parseView,
    parseBlock,
    parseAction,
  }
}