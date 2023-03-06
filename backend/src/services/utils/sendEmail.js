const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");
// const fs = require("fs");
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);

const sendEmail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    // Add the inlineBase64 plugin to the transport object
    transporter.use("compile", inlineBase64());

    await transporter.sendMail(mailOptions);

    return {
      message: "email sent sucessfully !",
      mailStatus: true,
    };
  } catch (error) {
    console.log(error, "email not sent");
    return { message: "email not sent !", mailStatus: false };
  }
};

module.exports = sendEmail;
