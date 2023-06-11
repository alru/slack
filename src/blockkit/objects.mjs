//todo: naming

/**
 * Text object
 * @param {string} text - text string
 * @param {boolean} mrkdwn - mrkdwn flag, default false
 * @param {boolean} emoji - emoji flag, default true
 * @returns {object} - text object
 */
export function text_object(text, mrkdwn = false, emoji = true) {
  return {
    type: mrkdwn ? 'mrkdwn' : 'plain_text',
    text: text.toString(),
    ...(!mrkdwn && {emoji})
  }
}

/**
 * Confirm object
 * @param {object} params
 * @param {string} params.title - title string, will be converted to text object
 * @param {string} params.text - text string, will be converted to text object
 * @param {string} params.confirm - confirm button text string, will be converted to text object
 * @param {string} params.deny - deny button text string, will be converted to text object
 * @param {string} params.style - style string
 * @returns {object} - confirm object
 */
export function confirm({title, text, confirm, deny, style}) {
  return {
    title: text_object(title),
    text: text_object(text),
    confirm: text_object(confirm),
    deny: text_object(deny),
    ...(style && {style})
  }
}

/**
 * Option object
 * @param {object} params
 * @param {string} params.text - text string, will be converted to text object
 * @param {string|number} params.value - value string or number
 * @param {string} params.description - description string, will be converted to text object
 * @param {string} params.url - url string
 * @returns {object} - option object
 */
export function option({text, value, description, url}) {
  return {
    text: text_object(text),
    value: value.toString(),
    ...(description && {description: text_object(description)}),
    ...(url && {url})
  }
}

/**
 * Option group object
 * @param {string} label - label string, will be converted to text object
 * @param {array} options - array of option objects
 * @returns {object} - option group object
 */
export function option_group(label, options = []) {
  return {
    label: text_object(label),
    options: options
  }
}

/**
 * Filter object
 * @param {object} params
 * @param {string[]} [params.include] - Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded. You should provide an array of strings from the following options: im, mpim, private, and public. The array cannot be empty.
 * @param {boolean} [params.exclude_external_shared_channels] - Indicates whether to exclude external shared channels from conversation lists. This field will not exclude users from shared channels. Defaults to false.
 * @param {boolean} [params.exclude_bot_users] - Indicates whether to exclude bot users from conversation lists. Defaults to false.
 * @returns {object} - filter object
 */
export function filter_object({include, exclude_external_shared_channels, exclude_bot_users}) {
  return {
    ...(include && {include}),
    ...(exclude_external_shared_channels && {exclude_external_shared_channels}),
    ...(exclude_bot_users && {exclude_bot_users})
  }
}