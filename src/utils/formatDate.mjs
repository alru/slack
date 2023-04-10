export function formatDate(ms, {token_string, optional_link, fallback_text} = {}) {
  token_string = token_string || '{date_short_pretty} {time_secs}';
  fallback_text = fallback_text || 'Error displaying date';
  optional_link = optional_link ? `^${optional_link}` : '';
  return `<!date^${Math.floor(ms / 1000)}^${token_string}${optional_link}|${fallback_text}>`;
}