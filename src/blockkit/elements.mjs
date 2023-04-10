//todo: все элементы

import {text_object} from './objects.mjs';

export function button({text, action_id = 'button', url, value, style, confirm}) {
  return {
    type: 'button',
    text: text_object(text),
    action_id: action_id,
    ...(url && {url}),
    ...(value && {value: value.toString()}),
    ...(style && {style}),
    ...(confirm && {confirm}),
  }
}

export function text_input({action_id = 'text_input', initial_value, multiline, min_length, max_length, focus_on_load, placeholder, triggerOnEnter, triggerOnType}) {
  return {
    type: 'plain_text_input',
    action_id: action_id,
    ...(initial_value && {initial_value: initial_value.toString()}),
    ...(multiline && {multiline}),
    ...(min_length && {min_length}),
    ...(max_length && {max_length}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
    ...(triggerOnEnter || triggerOnType && {dispatch_action_config: {trigger_actions_on: [triggerOnEnter && 'on_enter_pressed', triggerOnType && 'on_character_entered'].filter(Boolean)}}),
  }
}

export function static_select({action_id = 'static_select', options = [], option_groups, initial_option, confirm, focus_on_load, placeholder}) {
  return {
    type: 'static_select',
    action_id: action_id,
    options: options,
    ...(option_groups && {option_groups}),
    ...(initial_option && {initial_option}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }

}