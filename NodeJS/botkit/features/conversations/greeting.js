const { BotkitConversation } = require("botkit");

module.exports = (controller) => {
  let convo = new BotkitConversation("greeting", controller);

  convo.addQuestion(
    "გამარჯობა ! მე სატესტო ბოტი ვარ. ეს კიდევ ჩემი მისალმების დიალოგია. შენ რა გქვია ?",
    [
      {
        default: true,
        handler: async function (response, convo2, bot) {
          convo.varia = response;
          await convo2.gotoThread("name_asked");
        },
      },
    ],
    "user_name",
    "default"
  );

  convo.addMessage(
    { text: () => `სასიამოვნოა ${convo.varia} შენი გაცნობა` },
    "name_asked"
  );
  convo.addMessage(
    {
      text: "ამ ეტაპზე მარტო ეს შემიძლია ამ დიალოგში, სხვა რამე ხომ არ გაინტერესებს ?",
    },
    "name_asked"
  );

  controller.addDialog(convo);
};
