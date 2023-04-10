export default function modal({
  title,
  blocks = [],
  close,
  submit,
  private_metadata,
  callback_id,
  clear_on_close,
  notify_on_close,
  external_id,
  submit_disabled,
  composer
}) {
  return new Modal({
    title,
    blocks,
    close,
    submit,
    private_metadata,
    callback_id,
    clear_on_close,
    notify_on_close,
    external_id,
    submit_disabled
  }, composer);
}

class Modal {
  constructor(props, composer) {
    this.view = { type: 'modal' };
    this.composer = composer;
    Object.keys(props).forEach(key => props[key] && (this.view[key] = props[key]));
  }

  compose(...args) {
    this.view.blocks = this.composer.call(this, ...args);
  }

  async open(webClient, {trigger_id, interactivity_pointer} = {}) {
    await webClient.views.open({
      view: this.view,
      ...(trigger_id && {trigger_id}),
      ...(interactivity_pointer && {interactivity_pointer}),
    });
  }

  async update(webClient, {external_id, view_id, hash} = {}) {
    await webClient.views.update({
      view: this.view,
      ...(external_id && {external_id}),
      ...(view_id && {view_id}),
      ...(hash && {hash})
    });
  }

  async push(webClient, {trigger_id, interactivity_pointer} = {}) {
    await webClient.views.push({
      view: this.view,
      ...(trigger_id && {trigger_id}),
      ...(interactivity_pointer && {interactivity_pointer})
    });
  }
}