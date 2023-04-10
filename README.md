
# @alru/slack

This is a wrapper for the Slack Bolt SDK for Node.js, primarily designed to make it easier to work with BlockKit and Views:

**Create markup faster using ready-made functions**
```javascript
const blocks = [
    slack.blocks.header({text: 'Hello world'}),
    slack.blocks.divider()
]
```

***Simplify your work with Views***
```javascript
// Define new view with composer function
const view = slack.home({
 composer: (slackId) => {
    return [
        slack.blocks.section({
            text: `Hello, <@${slackId}>`
        })
    ]
 }
});
// Publish composed view
view.publish(webClient, slackId);
```

As this is just a wrapper, you need to be familiar with the Slack API and Bolt SDK.
## Installation
```bash
  npm install @alru/slack
```    
## Initialization and listening


Initialization has a very simple wrapper that allows you to pass options (such as credentials) with which to run the Bolt application.

```javascript
import slack from '@alru/slack';

const app = new slack.App({
  options: {
    token: `<your-token>`,
    signingSecret: `<your-signing-secret>`,
    socketMode: true,
    appToken: `<your-app-token>`,
    port: 3000,
  },
  handlers: [
    (app) => app.message('hello', ({say}) => say('Hello yourself!')),
  ]
});
```

You have to specify Handlers or Listeners properties. This is essentially the same thing, just functions that will be called with the app argument, which is a wrapper over the Bolt application. Given an app, you can subscribe to events in the usual Bolt way (e.g.: app.event()). The different names are provided for convenience and clarity, depending on how you will build your architecture: using listener -> handler or handler directly.

```js
function exampleHandler(app) {
  app.message('hello', ({slackId, say}) => say(`Hello <@${slackId}>!`));
}
```

```js
function exampleListener(app) {
  app.event('app_home_opened', updateHomeHandler);
}
```

In this case, native methods are wrapped to make it easier for you to get some properties. For example, all your subscriptions will have the **slackId** property passed to them (i.e. the user ID) and you won't have to search for it in payload or body.
## BlockKit

Ready-made functions for creating BlockKit parts are available as:
slack.blocks
slack.elements
slack.objects
## Views

You can create View instances using slack.home() or slack.modal().

You can either provide static blocks as a blocks property or use a composer function to render blocks dynamically.

```javascript
const staticView = slack.modal({
  title: 'My Modal',
  blocks: [
    slack.blocks.section({
      text: 'Hello, World!',
    }),
  ],
});
await staticView.push(webClient);

const dynamicView = slack.modal({
  title: 'My Modal',
  composer: ({slackId}) => {
    return [
      slack.blocks.section({
        text: `Hello, <@${slackId}>!`,
      }),
    ];
  }
})
await dynamicView.push(webClient);
```
## Contributing

Contributions are always welcome!

