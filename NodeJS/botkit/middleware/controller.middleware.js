const axios = require("axios");

const typingOnNotification = async (message) => {
  await axios.post(
    `https://graph.facebook.com/v11.0/me/messages?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      messaging_type: "RESPONSE",
      recipient: {
        id: message.user,
      },
      sender_action: "typing_on",
    }
  );
};

const getUsersDetails = async (message) => {
  const { data } = await axios.get(
    `https://graph.facebook.com/${message.user}?fields=first_name,last_name,profile_pic&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
  );
  // console.log(data);
  message.userInfo = data;
};

// const getResponseFromNlp = async (message) => {
//   console.log("nlp ..");
//   const { data } = await axios.get(
//     `${process.env.NLP_URL}/parse?q=${encodeURIComponent(message.text)}`,
//     {
//       headers: {
//         Authorization: process.env.NLP_AUTHORIZATION_TOKEN,
//       },
//     }
//   );
//   console.log(data);
// };

module.exports = {
  typingOnNotification,
  getUsersDetails,
  // getResponseFromNlp,
};
