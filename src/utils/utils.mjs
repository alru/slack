import {option} from '../blockkit/objects.mjs';

export function arrayToOptions(array = []) {
  return array.map(item => option({text: item.text, value: item.value, description: item.description, url: item.url}));
}

export function objectToOption(object = {}) {
  return option({text: object.text, value: object.value, description: object.description, url: object.url});
}

/**
 * Format date for slack
 * @param {number} ms - timestamp
 * @param {object} [options]
 * @param {string} [options.token_string] - token string
 * @param {string} [options.optional_link] - optional link
 * @param {string} [options.fallback_text] - fallback text
 * @return {string} - formatted date string
 */
export function formatDate(ms, {token_string, optional_link, fallback_text} = {}) {
  token_string = token_string || '{date_short_pretty} {time_secs}';
  fallback_text = fallback_text || 'Error displaying date';
  optional_link = optional_link ? `^${optional_link}` : '';
  return `<!date^${Math.floor(ms / 1000)}^${token_string}${optional_link}|${fallback_text}>`;
}

/**
 * Parse slack view to data object
 * @param {object} view - slack view
 * @param {boolean} [collapseActions] - collapse actions to values
 * @return {object} - data object in format {blockId: {actionId: value}} or {blockId: value} if collapseActions is true
 */
export function parseView(view, collapseActions) {
  const values = view.state.values;
  return Object.keys(values).reduce((data, blockId) => {
    data[blockId] = parseBlock(values[blockId], collapseActions);
    return data;
  }, {});
}

/**
 * Parse slack block to data object
 * @param {object} block - slack block
 * @param {boolean} [collapseActions] - collapse actions to values
 * @return {object} - data object in format {actionId: value} or value if collapseActions is true
 */
export function parseBlock(block, collapseActions) {
  if (Object.keys(block).length === 1 && collapseActions) return parseAction(block[Object.keys(block)[0]]);
  return Object.keys(block).reduce((data, actionId) => {
    data[actionId] = parseAction(block[actionId]);
    return data;
  }, {});
}

/**
 * Parse slack action to value
 * @param {object} action - slack action
 * @return value
 */
export function parseAction(action) {
  if (action.value) return action.value;
  if (action.selected_option) return action.selected_option.value;
  if (action.selected_date) return action.selected_date;
  if (action.selected_time) return action.selected_time;
  if (action.selected_date_time) return action.selected_date_time;
  if (action.selected_conversation) return action.selected_conversation;
  if (action.selected_users) return action.selected_users;
  if (action.selected_user) return action.selected_user;
  if (action.selected_options) return action.selected_options.map(opt => opt.value);
}