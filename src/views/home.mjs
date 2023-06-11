/**
 * Home View
 * Use compose method to compose view blocks via composer function. You can pass any arguments to composer function.
 * Use publish method to publish view. You have to pass webClient, slackId and optionally {hash} to publish method.
 * @param {Object} params
 * @param {Array} [params.blocks] - An array of layout blocks that defines the view (you can use composer function instead)
 * @param {String} [params.private_metadata] - A string that will be sent to your app in view_submission and block_actions events
 * @param {String} [params.callback_id] - A custom identifier that must be unique for all views on a per-team basis
 * @param {String} [params.external_id] - A custom identifier that must be unique for all views on a per-team basis
 * @param {Function} [params.composer] - A function that returns an array of layout blocks that defines the view
 * @returns {Home} - Home View Object
 */
export default function home({blocks = [], private_metadata, callback_id, external_id, composer}) {
  return new Home({blocks, private_metadata, callback_id, external_id}, composer);
}

class Home {
  constructor(props, composer) {
    this.view = { type: 'home' };
    this.composer = composer;
    Object.keys(props).forEach(key => props[key] && (this.view[key] = props[key]));
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
   * Publish view
   * @param webClient - Slack WebClient
   * @param {String} slackId - Slack User ID
   * @param {Object} [hash] - View hash
   */
  async publish(webClient, slackId, {hash} = {}) {
    return await webClient.views.publish({
      user_id: slackId,
      view: this.view,
      ...(hash && {hash})
    });
  }
}