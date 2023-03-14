const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const schedule = require("node-schedule");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const handlebars = require("handlebars");

const sendEmail = require("./utils/sendEmail");
const cron = require("node-cron");

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
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    contentType: "image/png",
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
    two_FactAuth_Option:false
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
    return {
      accessToken: "",
      username: "",
      message: "User not found",
      expiresIn: 0,
      userfound: false,
      passwordIsValid: false,
      blocked: false,
      role: null,
    };
  }

  const passwordIsValid = bcrypt.compareSync(input.password, user.password);

  if (!passwordIsValid) {
    return {
      accessToken: "",
      username: "",
      message: "Auth failed ! Invalid Password!",
      expiresIn: 0,
      userfound: true,
      passwordIsValid: false,
      blocked: false,
      role: null,
    };
  }

  //get user back online

  const token = jsonwebtoken.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  if (user.two_FactAuth_Option) {
    return {
      accessToken: token,
      username: user.username,
      message: "OK",
      expiresIn: process.env.JWT_EXPIRE_IN,
      userfound: true,
      passwordIsValid: true,
      blocked: user.isBlocked,
      role: user.role,
      two_FactAuth_Option: user.two_FactAuth_Option,
    };
  } else {
    return {
      accessToken: token,
      username: user.username,
      message: "OK",
      expiresIn: process.env.JWT_EXPIRE_IN,
      userfound: true,
      passwordIsValid: true,
      blocked: user.isBlocked,
      role: user.role,
      two_FactAuth_Option: false,
    };
  }
}

async function sendOTPVerificationEmail(input) {
  // find email with username
  const finduser = await User.findOne({ username: input.username });

  // Generate a 4-digit OTP
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  // Hash the OTP
  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otp, saltRounds);

  // Save the OTP verification record
  const now = Date.now();
  const expiresAt = now + 3600000; // Expires in 1 hour
  const user = await User.updateOne(
    { email: finduser.email },
    {
      two_FactAuth: {
        code: hashedOTP,
        expiresAt: expiresAt,
      },
    }
  );

  console.log(user);
  // scheduler to delete the the two_FactAuth field after an hour has passed
  const task = schedule.scheduleJob(new Date(expiresAt), async () => {
    try {
      const result = await User.updateOne(
        { email: finduser.email },
        { $unset: { two_FactAuth: 1 } }
      );
      console.log("the field two_FactorAuth is done" + result);
    } catch (error) {
      console.error(error);
    }
  });

  // a method that will automatically update the field expiresAt and set it to null after an hour for extra security
  // The link to the html template

  const readHTMLFile = (path) => {
    return new Promise((resolve, reject) => {
      readFile(path, "utf8", (err, html) => {
        if (err) {
          reject(err);
        } else {
          const template = handlebars.compile(html);

          console.log(hashedOTP);
          const replacements = {
            otp: `${otp}`,
          };
          const htmlToSend = template(replacements);
          const mailOptions = {
            from: process.env.USER,
            to: finduser.email,
            subject: "Code for 2 factor authentification",
            html: htmlToSend,
          };
          resolve(sendEmail(mailOptions));
        }
      });
    });
  };
  try {
    const mail = await readHTMLFile("src/view/two_fa/index.html");

    if (!mail.mailStatus) {
      return {
        message: "error has occured",
        statusCode: false,
      };
    }
    return {
      message: "mail sent",
      statusCode: true,
    };
  } catch (error) {
    throw new Error(error);
  }

  //Send the verification email
  // const mailOptions = {
  //   from: process.env.USER,
  //   to: input.email,
  //   subject: "Verify Your Email",
  //   html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the 2 factor verification </p>
  //   <p>this expires in 1 hour</p>`,
  // };
  // awaitsendEmail(mailOptions);
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

  if (!user.resetpwdToken) {
    return {
      valid: false,
      message: "Invalid reset Token!",
    };
  }

  jsonwebtoken.verify(
    input.token,
    process.env.RESET_SECRET,
    async (err, decodedToken) => {
      // Check if the reset token has expired
      console.log("error", err);
      if (err) {
        // const resetTime = new Date(decodedToken.iat * 1000);
        // console.log("resetTime", resetTime);
        // const expirationTime = new Date(resetTime.getTime() + 60 * 60 * 1000); // 1h expiration
        // const currentTime = new Date();
        // if (currentTime > expirationTime) {
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
    }
  );

  return {
    valid: true,
    message: "reset token checked !",
  };
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
  const updatepwd={
    password: bcrypt.hashSync(input.password, 8),
    updatedAt:new Date(),
  }
  const update = await User.updateOne(
    { email: user.email },
    updatepwd
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

async function verifyOTP(input) {
  const user = await User.findOne({ username: input.username });
  const now = Date.now();

  // Check if user exists
  if (!user) {
    return { message: "user does not exist", statusCode: false };
  }

  // Check if OTP exists and is not expired

  if (
    !user.two_FactAuth ||
    !user.two_FactAuth.code ||
    now > user.two_FactAuth.expiresAt
  ) {
    return { message: "OTP expired or not found", statusCode: false };
  }

  // Compare hashed OTP with input OTP

  const match = await bcrypt.compareSync(input.otp, user.two_FactAuth.code);
  console.log(input.otp);
  console.log(user.two_FactAuth.code);
  console.log("match0", match);
  if (match) {
    // OTP is valid
    // Clear OTP code and expiration time
    await User.updateOne(
      { email: user.email },
      { $unset: { two_FactAuth: 1 } }
    );
    return { message: "OTP verified", statusCode: true };
    // 2FA record has expired, delete it
    // user.two_FactAuth = undefined;
    // await user.save();
  } else {
    // OTP is invalid
    return { message: "Invalid OTP", statusCode: false };
  }
}

module.exports = {
  signin,
  signup,
  sendTokenlink,
  updatepwd,
  checkresettoken,
  sendOTPVerificationEmail,
  verifyOTP,
};
