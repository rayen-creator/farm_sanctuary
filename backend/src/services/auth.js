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
  const user = new User({
    username: input.username,
    email: input.email,
    phone: input.phone,
    password: bcrypt.hashSync(input.password, 8),
    isActive: input.isActive,
    role: input.role,
    gender: input.gender,
    image: input.image,
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

async function sendTokenlink(input) {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw new Error("User not found");
  }

  const payload = {
    user_email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  const resetToken = jsonwebtoken.sign(
    payload,
    process.env.RESET_SECRET,
    options
  );

  const readHTMLFile = (path) => {
    return new Promise((resolve, reject) => {
      readFile(path, "utf8", (err, html) => {
        if (err) {
          reject(err);
        } else {
          const template = handlebars.compile(html);

          const replacements = {
            link: `http://localhost:4200/resetpassword/${resetToken}`,
          };
          const htmlToSend = template(replacements);
          const subject = "Password recovery ";
          const mailOptions = {
            from: process.env.USER,
            to: input.email,
            subject: subject,
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
    const addtoken = await User.updateOne(
      { email: input.email },
      { resetpwdToken: resetToken }
    );
    return {
      message: mail.message,
      mailstatus: mail.mailStatus,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function checkresettoken(input) {
  const user = await User.findOne({
    email: input.email,
    resetpwdToken: input.token,
  });

  if (!user) {
    return {
      valid: false,
      message: "Invalid reset Token!",
    };
  }

  if (input.token == user.resetpwdToken) {
    const decodedToken = jsonwebtoken.verify(
      input.token,
      process.env.RESET_SECRET
    );
    // Check if the reset token has expired
    const resetTime = new Date(decodedToken.iat * 1000);
    console.log("resetTime", resetTime);
    const expirationTime = new Date(resetTime.getTime() + 60 * 60 * 1000); // 1h expiration
    const currentTime = new Date();
    if (currentTime > expirationTime) {
      //delete reset token
      await User.updateOne(
        { email: input.email },
        { $unset: { resetpwdToken: 1 } }
      );
      return {
        valid: false,
        message: "reset token expired !",
      };
    }
    return {
      valid: true,
      message: "reset token checked !",
    };
  }
}

async function updatepwd(input) {
  const user = await User.findOne({ email: input.email });
  if (!user) {
    return {
      message: "User not found",
      updateStatus: false,
      userFound: false,
    };
  }
  //update pwd
  const update = await User.updateOne(
    { email: user.email },
    { password: bcrypt.hashSync(input.password, 8) }
  );

  if (!update) {
    return {
      message: "Failed to update password",
      updateStatus: false,
      userFound: true,
    };
  }
  //delete reset token
  await User.updateOne(
    { email: input.email },
    { $unset: { resetpwdToken: 1 } }
  );
  return {
    message: "Password updated successfully",
    updateStatus: true,
    userFound: true,
  };
}

module.exports = {
  signin,
  signup,
  sendTokenlink,
  updatepwd,
  checkresettoken,
};
