import bolt from '@slack/bolt';

/**
 * Main app class
 * Options parameter with credentials is required
 * You can subscribe to events, messages, actions and shortcuts using methods of this class
 * You can add listeners and handlers using methods of this class
 * @param {Object} schema
 * @param {Object} schema.options
 * @param {String} schema.options.token
 * @param {String} schema.options.signingSecret
 * @param {Boolean} schema.options.socketMode
 * @param {String} schema.options.appToken
 * @param {Number} schema.options.port
 */
export default class App {
  constructor(schema = {}) {
    this.app = new bolt.App(schema.options);

    // Listeners
    if (schema.listeners) {
      schema.listeners.forEach(listener => listener(this));
    }

    // Handlers
    if (schema.handlers) {
      schema.handlers.forEach(handler => handler(this));
    }

    this.app.start();
  }

  /**
   * Event listener
   * @param {String} eventType
   * @param {Function} handler
   */
  event(eventType, handler) {
    this.app.event(eventType, async (args) => {
      await handler({
        slackId: args.event.user,
        webClient: args.client,
        ...args,
      })
    })
  }

  /**
   * Message listener
   * @param {String|RegExp} pattern
   * @param {Function} handler
   */
  message(pattern, handler) {
    this.app.message(pattern, async (args) => {
      await handler({
        slackId: args.message.user,
        webClient: args.client,
        ...args,
      })
    });
  }

  /**
   * Action listener
   * @param {String} actionId
   * @param {Function} handler
   */
  action(actionId, handler) {
    this.app.action(actionId, async (args) => {
      await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        value: args.action.value,
        trigger_id: args.body.trigger_id,
        view: args?.body?.view,
        private_metadata: args?.body?.view?.private_metadata,
        external_id: args?.body?.view?.external_id,
        ...args,
      })
    });
  }

  /**
   * Shortcut listener
   * @param {String} callbackId
   * @param {Function} handler
   */
  shortcut(callbackId, handler) {
    this.app.shortcut(callbackId, async (args) => {
      await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        ...args,
      });
    })
  }

  /**
   * View listener
   * @param {String} callbackId
   * @param {Function} handler
   * @param {Boolean} noAck - if true, view will not be acknowledged
   */
  view(callbackId, handler, noAck = false) {
    this.app.view(callbackId, async (args) => {
      if (!noAck) await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        private_metadata: args?.view.private_metadata,
        external_id: args?.view.external_id,
        ...args,
      });
    });
  }

  /**
   * Command listener
   * @param {String} commandName
   * @param {Function} handler
   */
  command(commandName, handler) {
    this.app.command(commandName, async (args) => {
      await args.ack();
      await handler({
        slackId: args.body.user_id,
        webClient: args.client,
        ...args,
      });
    });
  }

  /**
   * Options listener
   * @param {String} actionId
   * @param {Function} handler
   */
  options(actionId, handler) {
    this.app.options(actionId, async (args) => {
      await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        ...args,
      });
    });
  }
}