export default function home({blocks = [], private_metadata, callback_id, external_id, composer}) {
  return new Home({blocks, private_metadata, callback_id, external_id}, composer);
}

class Home {
  constructor(props, composer) {
    this.view = { type: 'home' };
    this.composer = composer;
    Object.keys(props).forEach(key => props[key] && (this.view[key] = props[key]));
  }

  compose(...args) {
    this.view.blocks = this.composer.call(this, ...args);
  }

  async publish(webClient, slackId, {hash} = {}) {
    await webClient.views.publish({
      user_id: slackId,
      view: this.view,
      ...(hash && {hash})
    });
  }
}