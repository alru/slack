import bolt from '@slack/bolt';

/**
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

  event(eventType, handler) {
    this.app.event(eventType, async (args) => {
      await handler({
        slackId: args.event.user,
        webClient: args.client,
        ...args,
      })
    })
  }

  message(pattern, handler) {
    this.app.message(pattern, async (args) => {
      await handler({
        slackId: args.message.user,
        webClient: args.client,
        ...args,
      })
    });
  }

  action(actionId, handler) {
    this.app.action(actionId, async (args) => {
      await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        value: args.action.value,
        trigger_id: args.body.trigger_id,
        ...args,
      })
    });
  }

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

  view(callbackId, handler, noAck = false) {
    this.app.view(callbackId, async (args) => {
      if (!noAck) await args.ack();
      await handler({
        slackId: args.body.user.id,
        webClient: args.client,
        ...args,
      });
    });
  }

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