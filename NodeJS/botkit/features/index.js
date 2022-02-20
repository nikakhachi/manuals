module.exports = function (controller) {
  controller.hears("hello", "message", async (bot, message) => {
    bot.beginDialog("greeting");
  });
};
