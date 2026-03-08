import nodemailer from "nodemailer";

const { EMAIL_PASSWORD, EMAIL_USER } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (payload) =>
  transporter.sendMail({ ...payload, from: EMAIL_USER });

export default sendEmail;
