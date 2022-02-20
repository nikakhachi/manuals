const { Botkit } = require("botkit");
const {
  FacebookAdapter,
  FacebookEventTypeMiddleware,
} = require("botbuilder-adapter-facebook");
require("dotenv").config();
const controllerMiddlewareActions = require("./middleware/controller.middleware");
const loadConvos = require("./features/conversations");

const adapter = new FacebookAdapter({
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  app_secret: process.env.FACEBOOK_APP_SECRET,
});

adapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({ adapter });

controller.middleware.receive.use(async (bot, message) => {
  console.log("RECEIVE -> ", message.type);
  if (message.type === "message") {
    // controllerMiddlewareActions.getResponseFromNlp(message);
    controllerMiddlewareActions.typingOnNotification(message);
    await controllerMiddlewareActions.getUsersDetails(message);
  }
});
controller.middleware.send.use(async (bot, message) => {
  console.log("SEND -> ", message.type);
});

controller.ready(async () => {
  loadConvos(controller);
  controller.loadModules(__dirname + "/features");
});

controller.webserver.get("/", (req, res) => {
  console.log(`This app is running Botkit ${controller.version}.`);
  res.send(`This app is running Botkit ${controller.version}.`);
});
