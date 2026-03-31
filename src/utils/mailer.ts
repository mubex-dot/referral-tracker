import sgMail from "@sendgrid/mail";

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

const sender = `${process.env.VERIFIED_SENDER_EMAIL}`;

type mailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const SendMail = ({ to, subject, text, html }: mailParams) => {
  const msg = {
    to: to,
    from: sender,
    subject: subject,
    text: text,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
