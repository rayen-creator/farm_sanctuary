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
  //verify duplicated username
  const findusername = await User.findOne({ username: input.username });
  if (findusername) {
    return {
      message: "Failed! Username is already in use!",
      usernameExists: true,
      emailExists: false,
    };
  }
    //verify duplicated email
  const findemail = await User.findOne({ email: input.email });
  if (findemail) {
    return {
      message: "Failed! Email is already in use!",
      emailExists: true,
      usernameExists: false,
    };
  }
  const defaultImage = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    contentType: 'image/png'
  };
  const image = input.image || defaultImage;
  const user = new User({
    username: input.username,
    email: input.email,
    phone: input.phone,
    password: bcrypt.hashSync(input.password, 8),
    isActive: input.isActive,
    role: input.role,
    gender: input.gender,
    image,
    createdAt: new Date(),
    updatedAt: new Date(),
    isBlocked: false,
  });
  await user.save(user);
  return {
    message: "User created !",
    emailExists: false,
    usernameExists: false,
  };
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
