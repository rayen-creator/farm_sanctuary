const User = require("../models/user");
const { AuthenticationError } = require("apollo-server-express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const handlebars = require("handlebars");

const sendEmail = require("./utils/sendEmail");

async function signup(input) {
  const user = new User({
    username: input.username,
    email: input.email,
    phone: input.phone,
    password: bcrypt.hashSync(input.password, 8),
    isActive: input.isActive,
    role: input.role,
    image: input.image,
    createdAt: new Date(),
    updatedAt: new Date(),
    isBlocked: false,
  });
  return await user.save(user);
}

async function signin(input) {
  const user = await User.findOne({
    email: input.email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
    // const error = new Error('Invalid email or password');
    // error.extensions = { statusCode: 404 };
    // throw error;
  }

  const passwordIsValid = bcrypt.compareSync(input.password, user.password);

  if (!passwordIsValid) {
    throw new AuthenticationError("Unauthorized", {
      accessToken: null,
      message: "Auth failed ! Invalid Password!",
    });
  }
  const token = jsonwebtoken.sign({ id: user.email }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  return {
    accessToken: token,
    username: user.username,
    message: "OK",
    expiresIn: process.env.JWT_EXPIRE_IN,
  };
}

async function restpwd(input) {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw new Error("User not found");
  }
 
  const readHTMLFile = (path) => {
    return new Promise((resolve, reject) => {
      readFile(path, "utf8", (err, html) => {
        if (err) {
          reject(err);
        } else {
          const template = handlebars.compile(html);
          const resetToken = jsonwebtoken.sign(
            { id: user.email },
            process.env.RESET_SECRET,
            { expiresIn: process.env.RESET_EXPIRE }
          );
          console.log(resetToken);
          const replacements = {
            link: `http://localhost:4200/resetpassword/${resetToken}`,
          };
          const htmlToSend = template(replacements);
          const mailOptions = {
            from: process.env.USER,
            to: input.email,
            subject: input.subject,
            html: htmlToSend,
          };
          resolve(sendEmail(mailOptions));
        }
      });
    });
  };

  try {
    const mail = await readHTMLFile("src/view/restpwd/index.html");

    if (!mail.mailStatus) {
      return {
        message: mail.message,
        mailstatus: mail.mailStatus,
      };
    }
    return {
      message: mail.message,
      mailstatus: mail.mailStatus,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  signin,
  signup,
  restpwd,
};
