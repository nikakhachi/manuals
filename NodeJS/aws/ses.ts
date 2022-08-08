import { SES } from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

const ses = new SES({
  accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
  secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
});

const sendEmailWithSes = async (
  email: string,
  body: string,
  subject: string
) => {
  const params: SendEmailRequest = {
    Destination: {
      /* required */
      ToAddresses: [
        email,
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: senderEmail /* required */,
  };
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(`Sent email to: ${email}, email id: ${data.MessageId}`);
    }
  });
};

export { sendEmailWithSes };
