import {text_object} from './objects.mjs';
import {objectToOption} from '../utils/utils.mjs';

/**
 * Button element
 * @param {object} params
 * @param {string} params.text - a string, will be converted to text object
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.url] - url
 * @param {string} [params.value] - value
 * @param {string} [params.style] - style
 * @param {object} [params.confirm] - confirmation object
 * @returns {object} - button object
 */
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

/**
 * Text Input element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_value] - initial value string
 * @param {boolean} [params.multiline] - multiline
 * @param {number} [params.min_length] - min length
 * @param {number} [params.max_length] - max length
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {boolean} [params.triggerOnEnter] - dispatch action on enter, default false
 * @param {boolean} [params.triggerOnType] - dispatch action on type, default false
 * @returns {object} - text input object
 */
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

/**
 * Static Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.options] - array of options in a form of {text, value} objects or option objects
 * @param {array} [params.option_groups] - array of option groups in a form of {label, options[]} objects or option group objects
 * @param {object} [params.initial_option] - initial option object in a form of {text, value} or option object
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - static select object
 */
export function static_select({action_id = 'static_select', options = [], option_groups, initial_option, confirm, focus_on_load, placeholder}) {
  return {
    type: 'static_select',
    action_id: action_id,
    options: prepareOptions(options),
    ...(option_groups && {option_groups: prepareOptionGroups(option_groups)}),
    ...(initial_option && {initial_option: prepareOption(initial_option)}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }

}

/**
 * Users Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_user] - initial user id
 * @param {object} [params.confirm] - confirmation object
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @returns {object} - users select object
 */
export function users_select({action_id = 'users_select', initial_user, confirm, placeholder, focus_on_load}) {
  return {
    type: 'users_select',
    action_id: action_id,
    ...(initial_user && {initial_user}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Multi Users Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.initial_users] - array of initial user ids
 * @param {object} [params.confirm] - confirmation object
 * @param {number} [params.max_selected_items] - max selected items
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - multi users select object
 */
export function multi_users_select({action_id = 'multi_users_select', initial_users, confirm, max_selected_items, focus_on_load, placeholder}) {
  return {
    type: 'multi_users_select',
    action_id: action_id,
    ...(initial_users && {initial_users}),
    ...(confirm && {confirm}),
    ...(max_selected_items && {max_selected_items}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Overflow Menu element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.options] - array of options in a form of {text, value} objects or option objects
 * @param {object} [params.confirm] - confirmation object
 * @returns {object} - overflow menu object
 */
export function overflow_menu({action_id = 'overflow_menu', options = [], confirm}) {
  return {
    type: 'overflow',
    action_id: action_id,
    options: prepareOptions(options),
    ...(confirm && {confirm}),
  }
}

/**
 * Radio Buttons element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.options] - array of options in a form of {text, value} objects or option objects
 * @param {object} [params.initial_option] - initial option object in a form of {text, value} or option object
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @returns {object} - radio buttons object
 */
export function radio_buttons({action_id = 'radio_buttons', options = [], initial_option, confirm, focus_on_load}) {
  return {
    type: 'radio_buttons',
    action_id: action_id,
    options: prepareOptions(options),
    ...(initial_option && {initial_option: prepareOption(initial_option)}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
  }
}

/**
 * Checkboxes element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.options] - array of options in a form of {text, value} objects or option objects
 * @param {array} [params.initial_options] - array of initial option objects in a form of {text, value} or option objects
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @returns {object} - checkboxes object
 */
export function checkboxes({action_id = 'checkboxes', options = [], initial_options, confirm, focus_on_load}) {
  return {
    type: 'checkboxes',
    action_id: action_id,
    options: prepareOptions(options),
    ...(initial_options && {initial_options: prepareOptions(initial_options)}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
  }
}

/**
 * Email Text Input element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_value] - initial value string
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {boolean} [params.triggerOnEnter] - dispatch action on enter, default false
 * @param {boolean} [params.triggerOnType] - dispatch action on type, default false
 * @returns {object} - email text input object
 */
export function email_text_input({action_id = 'email_text_input', initial_value, focus_on_load, placeholder, triggerOnEnter, triggerOnType}) {
  return {
    type: 'email_text_input',
    action_id: action_id,
    ...(initial_value && {initial_value: initial_value.toString()}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
    ...(triggerOnEnter || triggerOnType && {dispatch_action_config: {trigger_actions_on: [triggerOnEnter && 'on_enter_pressed', triggerOnType && 'on_character_entered'].filter(Boolean)}}),
  }
}

// Helper functions
function prepareOption(option) {
  if (typeof option.text === 'string') return objectToOption(option);
  return option;
}

function prepareOptions(options = []) {
  if (options.length === 0) return options;
  return options.map(option => {
    if (typeof option.text === 'string') return objectToOption(option);
    return option;
  });
}

function prepareOptionGroups(option_groups = []) {
  if (option_groups.length === 0) return option_groups;
  return option_groups.map(option_group => {
    return {
      label: typeof option_group.label === 'string' ? text_object(option_group.label) : option_group.label,
      options: prepareOptions(option_group.options)
    }
  });
}