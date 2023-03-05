const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const sendEmail = async (email, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      service: process.env.SERVICE,
      // port: 587,
      // secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    // Add the inlineBase64 plugin to the transport object
    transporter.use("compile", inlineBase64());


    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      // text: text,
      html: await readFile("src/view/restpwd/index.html", "utf8"),
  
    });

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