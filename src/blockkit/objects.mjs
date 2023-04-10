//todo: naming
//todo: все объекты
export function text_object(text, mrkdwn = false, emoji = true) {
  return {
    type: mrkdwn ? 'mrkdwn' : 'plain_text',
    text: text.toString(),
    ...(!mrkdwn && {emoji})
  }
}

export function confirm({title, text, confirm, deny, style}) {
  return {
    title: text_object(title),
    text: text_object(text),
    confirm: text_object(confirm),
    deny: text_object(deny),
    ...(style && {style})
  }
}

export function option(text, value, {description, url}) {
  return {
    text: text_object(text),
    value: value.toString(),
    ...(description && {description: text_object(description)}),
    ...(url && {url})
  }
}

export function option_group(label, options = []) {
  return {
    label: text_object(label),
    options: options
  }
}

export function filter_object({include, exclude_external_shared_channels, exclude_bot_users}) {
  return {
    ...(include && {include}),
    ...(exclude_external_shared_channels && {exclude_external_shared_channels}),
    ...(exclude_bot_users && {exclude_bot_users})
  }
}