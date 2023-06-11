import slack from '../slack.mjs';

/**
 * Modal View
 * Use compose method to compose view blocks via composer function. You can pass any arguments to composer function
 * Use publish method to publish view.
 * Use update method to update view.
 * Use push method to push view.
 * @param {Object} params
 * @param {string|Object} params.title - title string or text object
 * @param {Array} [params.blocks] - An array of layout blocks that defines the view (you can use composer function instead)
 * @param {string|Object} [params.close] - close button string or text object
 * @param {string|Object} [params.submit] - submit button string or text object
 * @param {String} [params.private_metadata] - A string that will be sent to your app in view_submission and block_actions events
 * @param {String} [params.callback_id] - A custom identifier that must be unique for all views on a per-team basis
 * @param {Boolean} [params.clear_on_close] - Indicates whether Slack will clear the view's input elements when the modal is closed
 * @param {Boolean} [params.notify_on_close] - Indicates whether Slack will send your request URL a view_closed event when a user clicks the close button
 * @param {String} [params.external_id] - A custom identifier that must be unique for all views on a per-team basis
 * @param {Boolean} [params.submit_disabled] - Indicates whether the submit button will be disabled when the modal is loaded
 * @param {Function} [params.composer] - A function that returns an array of layout blocks that defines the view
 * @returns {Modal} - Modal View Object
 */
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
    Object.keys(props).forEach(key => {
      if (!props[key]) return;
      switch (key) {
        case 'title':
        case 'close':
        case 'submit':
          this.view[key] = typeof props[key] === 'object' ? props[key] : slack.objects.text_object(props[key]);
          break;
        default:
          this.view[key] = props[key];
      }
    });
  }

  /**
   * Your composer function call
   * Should return an array of layout blocks that defines the view
   * You can use async/await in composer function
   * @param args - any arguments you want to pass to composer function
   */
  async compose(...args) {
    this.view.blocks = await this.composer.call(this, ...args);
  }

  /**
   * Open modal view
   * @param webClient - Slack WebClient
   * @param {Object} [params]
   * @param {string} [params.trigger_id]
   * @param {string} [params.interactivity_pointer]
   */
  async open(webClient, {trigger_id, interactivity_pointer} = {}) {
    return await webClient.views.open({
      view: this.view,
      ...(trigger_id && {trigger_id}),
      ...(interactivity_pointer && {interactivity_pointer}),
    });
  }

  /**
   * Update modal view
   * @param webClient - Slack WebClient
   * @param {Object} [params]
   * @param {string} [params.external_id]
   * @param {string} [params.view_id]
   * @param {string} [params.hash]
   */
  async update(webClient, {external_id, view_id, hash} = {}) {
    return await webClient.views.update({
      view: this.view,
      ...(external_id && {external_id}),
      ...(view_id && {view_id}),
      ...(hash && {hash})
    });
  }

  /**
   * Push modal view
   * @param webClient - Slack WebClient
   * @param {Object} [params]
   * @param {string} [params.trigger_id]
   * @param {string} [params.interactivity_pointer]
   */
  async push(webClient, {trigger_id, interactivity_pointer} = {}) {
    return await webClient.views.push({
      view: this.view,
      ...(trigger_id && {trigger_id}),
      ...(interactivity_pointer && {interactivity_pointer})
    });
  }
}