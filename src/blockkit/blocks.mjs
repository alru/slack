import {text_object} from './objects.mjs';

export function actions({elements, block_id}) {
  return {
    type: 'actions',
    elements: elements,
    ...(block_id && {block_id: block_id})
  }
}

export function context({elements, block_id}) {
  return {
    type: 'context',
    elements: elements,
    ...(block_id && {block_id: block_id})
  }
}

export function divider({block_id} = {}) {
  return {
    type: 'divider',
    ...(block_id && {block_id: block_id})
  }
}

export function header({text, block_id}) {
  return {
    type: 'header',
    text: text_object(text),
    ...(block_id && {block_id: block_id})
  }
}

export function image({image_url, alt_text = 'image', title, block_id}) {
  return {
    type: 'image',
    image_url: image_url,
    alt_text: alt_text,
    ...(title && {title: text_object(title)}),
    ...(block_id && {block_id: block_id})
  }
}

export function input({label, element, dispatch_action, block_id, hint, optional = true}) {
  return {
    type: 'input',
    label: text_object(label),
    element: element,
    optional: optional,
    ...(dispatch_action && {dispatch_action: dispatch_action}),
    ...(block_id && {block_id: block_id}),
    ...(hint && {hint: text_object(hint)})
  }
}

export function section({text, fields, accessory, block_id}) {
  return {
    type: 'section',
    ...(text && {text: text_object(text, true)}),
    ...(fields && {fields: fields.map(field => text_object(field, true))}),
    ...(accessory && {accessory: accessory}),
    ...(block_id && {block_id: block_id})
  }
}
