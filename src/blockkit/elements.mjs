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
 * Checkbox groups element
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
 * Date picker element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_date] - initial date string, should be in YYYY-MM-DD format
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - date picker object
 */
export function datepicker({action_id = 'datepicker', initial_date, confirm, focus_on_load, placeholder}) {
  return {
    type: 'datepicker',
    action_id: action_id,
    ...(initial_date && {initial_date}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Datetime picker element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {number} [params.initial_date_time] - initial date time in unix epoch format in format of 10 digits
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @returns {object} - datetime picker object
 */
export function datetimepicker({action_id = 'datetimepicker', initial_date_time, confirm, focus_on_load}) {
  return {
    type: 'datetimepicker',
    action_id: action_id,
    ...(initial_date_time && {initial_date_time}),
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

/**
 * Image element
 * @param {object} params
 * @param {string} params.image_url - url of the image to be displayed
 * @param {string} params.alt_text - alt text string of the image
 */
export function image({image_url, alt_text}) {
  return {
    type: 'image',
    image_url: image_url,
    alt_text: alt_text,
  }
}

/**
 * Multi-select menu element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {array} [params.options] - array of options in a form of {text, value} objects or option objects
 * @param {array} [params.option_groups] - array of option groups in a form of {label, options[]} objects or option group objects
 * @param {array} [params.initial_options] - array of initial option objects in a form of {text, value} or option objects
 * @param {object} [params.confirm] - confirmation object
 * @param {number} [params.max_selected_items] - maximum number of items that can be selected
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - multi-select menu object
 */
export function multi_static_select({action_id = 'multi_static_select', options, option_groups, initial_options, confirm, max_selected_items, placeholder}) {
  return {
    type: 'multi_static_select',
    action_id: action_id,
    ...(options && {options: prepareOptions(options)}),
    ...(option_groups && {option_groups: prepareOptionGroups(option_groups)}),
    ...(initial_options && {initial_options: prepareOptions(initial_options)}),
    ...(confirm && {confirm}),
    ...(max_selected_items && {max_selected_items}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

//todo: external data source

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
 * Multi Conversations Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string[]} [params.initial_conversations] - array of initial conversation ids
 * @param {boolean} [params.default_to_current_conversation] - pre-populate with the current conversation
 * @param {object} [params.confirm] - confirmation object
 * @param {number} [params.max_selected_items] - max selected items
 * @param {object} [params.filter] - filter object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - multi conversations select object
 */
export function multi_conversations_select({action_id = 'multi_conversations_select', initial_conversations, default_to_current_conversation, confirm, max_selected_items, filter, focus_on_load, placeholder}) {
  return {
    type: 'multi_conversations_select',
    action_id: action_id,
    ...(initial_conversations && {initial_conversations}),
    ...(default_to_current_conversation && {default_to_current_conversation}),
    ...(confirm && {confirm}),
    ...(max_selected_items && {max_selected_items}),
    ...(filter && {filter}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Multi Channels Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string[]} [params.initial_channels] - array of initial channel ids (only public channels)
 * @param {object} [params.confirm] - confirmation object
 * @param {number} [params.max_selected_items] - max selected items
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - multi channels select object
 */
export function multi_channels_select({action_id = 'multi_channels_select', initial_channels, confirm, max_selected_items, focus_on_load, placeholder}) {
  return {
    type: 'multi_channels_select',
    action_id: action_id,
    ...(initial_channels && {initial_channels}),
    ...(confirm && {confirm}),
    ...(max_selected_items && {max_selected_items}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Number input element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {boolean} [params.is_decimal_allowed] - allow decimal numbers, default false
 * @param {number|string} [params.initial_value] - initial value
 * @param {number|string} [params.min_value] - minimum value
 * @param {number|string} [params.max_value] - maximum value
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {boolean} [params.triggerOnEnter] - dispatch action on enter, default false
 * @param {boolean} [params.triggerOnType] - dispatch action on type, default false
 * @returns {object} - number input object
 */
export function number_input({action_id = 'number_input', is_decimal_allowed = false, initial_value, min_value, max_value, focus_on_load, placeholder, triggerOnEnter, triggerOnType}) {
  return {
    type: 'number_input',
    action_id: action_id,
    is_decimal_allowed: is_decimal_allowed,
    ...(initial_value && {initial_value: initial_value.toString()}),
    ...(min_value && {min_value: min_value.toString()}),
    ...(max_value && {max_value: max_value.toString()}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
    ...(triggerOnEnter && {dispatch_action_config: {trigger_actions_on: ['on_enter_pressed']}}),
    ...(triggerOnType && {dispatch_action_config: {trigger_actions_on: ['on_character_entered']}}),
  }
}

/**
 * Overflow menu element
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
 * Plain-text input element
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
 * Radio button group element
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
export function static_select({action_id = 'static_select', options, option_groups, initial_option, confirm, focus_on_load, placeholder}) {
  return {
    type: 'static_select',
    action_id: action_id,
    ...(options && {options: prepareOptions(options)}),
    ...(option_groups && {option_groups: prepareOptionGroups(option_groups)}),
    ...(initial_option && {initial_option: prepareOption(initial_option)}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }

}

//todo: external data source select

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
 * Conversations Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_conversation] - initial conversation id
 * @param {boolean} [params.default_to_current_conversation] - pre-populate with current conversation
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.response_url_enabled] - view submission payload will contain response_url
 * @param {object} [params.filter] - filter object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - conversations select object
 */
export function conversations_select({action_id = 'conversations_select', initial_conversation, default_to_current_conversation, confirm, response_url_enabled, filter, focus_on_load, placeholder}) {
  return {
    type: 'conversations_select',
    action_id: action_id,
    ...(initial_conversation && {initial_conversation}),
    ...(default_to_current_conversation && {default_to_current_conversation}),
    ...(confirm && {confirm}),
    ...(response_url_enabled && {response_url_enabled}),
    ...(filter && {filter}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Channels Select element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_channel] - initial channel id (public only)
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.response_url_enabled] - view submission payload will contain response_url
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @returns {object} - channels select object
 */
export function channels_select({action_id = 'channels_select', initial_channel, confirm, response_url_enabled, focus_on_load, placeholder}) {
  return {
    type: 'channels_select',
    action_id: action_id,
    ...(initial_channel && {initial_channel}),
    ...(confirm && {confirm}),
    ...(response_url_enabled && {response_url_enabled}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
  }
}

/**
 * Time picker element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_time] - initial time in HH:mm format
 * @param {object} [params.confirm] - confirmation object
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {string} [params.timezone] - a string like America/Chicago or Europe/Paris. The timezone is displayed in the time picker as a hint.
 */
export function timepicker({action_id = 'timepicker', initial_time, confirm, focus_on_load, placeholder, timezone}) {
  return {
    type: 'timepicker',
    action_id: action_id,
    ...(initial_time && {initial_time}),
    ...(confirm && {confirm}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
    ...(timezone && {timezone}),
  }
}

/**
 * URL input element
 * @param {object} params
 * @param {string} [params.action_id] - action_id
 * @param {string} [params.initial_value] - initial value string
 * @param {boolean} [params.focus_on_load] - focus on load
 * @param {string} [params.placeholder] - placeholder text string, will be converted to text object
 * @param {boolean} [params.triggerOnEnter] - dispatch action on enter, default false
 * @param {boolean} [params.triggerOnType] - dispatch action on type, default false
 * @returns {object} - url input object
 */
export function url_text_input({action_id = 'url_text_input', initial_value, focus_on_load, placeholder, triggerOnEnter, triggerOnType}) {
  return {
    type: 'plain_text_input',
    action_id: action_id,
    ...(initial_value && {initial_value}),
    ...(focus_on_load && {focus_on_load}),
    ...(placeholder && {placeholder: text_object(placeholder)}),
    ...(triggerOnEnter && {dispatch_action_config: {trigger_actions_on: ['on_enter_pressed']}}),
    ...(triggerOnType && {dispatch_action_config: {trigger_actions_on: ['on_character_entered']}}),
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