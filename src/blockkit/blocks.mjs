import {text_object} from './objects.mjs';

/**
 * Actions block
 * @param {object} params
 * @param {array} params.elements - An array of interactive element objects - buttons, select menus, overflow menus, or date pickers.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - An actions block object.
 */
export function actions({elements, block_id}) {
  return {
    type: 'actions',
    elements: elements,
    ...(block_id && {block_id: block_id})
  };
}

/**
 * Context block
 * @param {object} params
 * @param {array} params.elements - An array of image elements and text objects.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - A context block object.
 */
export function context({elements, block_id}) {
  return {
    type: 'context',
    elements: elements,
    ...(block_id && {block_id: block_id})
  };
}

/**
 * Divider block
 * @param {object} params
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - A divider block object.
 */
export function divider({block_id} = {}) {
  return {
    type: 'divider',
    ...(block_id && {block_id: block_id})
  };
}

/**
 * Header block
 * @param {object} params
 * @param {string} params.text - The text for the block (string), it will be converted to a text object automatically.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - A header block object.
 */
export function header({text, block_id}) {
  return {
    type: 'header',
    text: text_object(text),
    ...(block_id && {block_id: block_id})
  };
}

/**
 * Image block
 * @param {object} params
 * @param {string} params.image_url - The URL of the image to be displayed.
 * @param {string} [params.alt_text] - A plain-text summary of the image. This should not contain any markup.
 * @param {string} [params.title] - The title for the image, it will be converted to a text object automatically.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - An image block object.
 */
export function image({image_url, alt_text = 'image', title, block_id}) {
  return {
    type: 'image',
    image_url: image_url,
    alt_text: alt_text,
    ...(title && {title: text_object(title)}),
    ...(block_id && {block_id: block_id})
  };
}

/**
 * Input block
 * @param {object} params
 * @param {string} params.label - A label string, it will be converted to a text object automatically.
 * @param {object} params.element - An interactive element, like a button or select menu.
 * @param {object} [params.dispatch_action] - Should this input block dispatch action when interacted with. Defaults to false.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @param {string} [params.hint] - An optional hint string, it will be converted to a text object automatically.
 * @param {boolean} [params.optional] - Whether the input block is optional or not. Defaults to true.
 * @returns {object} - An input block object.
 */
export function input({label, element, dispatch_action, block_id, hint, optional = true}) {
  return {
    type: 'input',
    label: text_object(label),
    element: element,
    optional: optional,
    ...(dispatch_action && {dispatch_action: dispatch_action}),
    ...(block_id && {block_id: block_id}),
    ...(hint && {hint: text_object(hint)})
  };
}

/**
 * Section block
 * @param {object} params
 * @param {string} params.text - The text for the block (string), it will be converted to a text object automatically.
 * @param {array} [params.fields] - An alternative to the text parameter. Should be an array of strings (up to 10), each of which gets converted into a text object.
 * @param {object} [params.accessory] - One of the available element objects.
 * @param {string} [params.block_id] - A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated.
 * @returns {object} - A section block object.
 */
export function section({text, fields, accessory, block_id}) {
  return {
    type: 'section',
    ...(text && {text: text_object(text, true)}),
    ...(fields && {fields: fields.map(field => text_object(field, true))}),
    ...(accessory && {accessory: accessory}),
    ...(block_id && {block_id: block_id})
  };
}
