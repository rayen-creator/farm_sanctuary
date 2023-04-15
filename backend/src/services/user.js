const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");
const handlebars = require("handlebars");
const sendEmail = require("./utils/sendEmail");
const uploadImage = require("./utils/imageUpload");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

async function updateEmail(input) {
  const user = await User.findOne({ username: input.username });
  const emailExist = await User.findOne({ email: input.email });
  if (!user) {
    return {
      message: "User not found",
      updateStatus: false,
      userFound: false,
      emailExist: false,
    };
  }
  if (emailExist) {
    return {
      message: "Email already taken",
      updateStatus: false,
      userFound: true,
      emailExist: true,
    };
  }
  //update pwd
  const updateEmail = {
    email: input.email,
    updatedAt: new Date(),
  };
  const update = await User.updateOne({ email: user.email }, updateEmail);

  if (!update) {
    return {
      message: "Failed to update email",
      updateStatus: false,
      userFound: true,
      emailExist: false,
    };
  }
  //delete emailChange
  await User.updateOne({ email: input.email }, { $unset: { emailChange: 1 } });
  return {
    message: "Email updated successfully",
    updateStatus: true,
    userFound: true,
    emailExist: false,
  };
}
async function getUser(id) {
  return User.findById(id).populate({
    path: "likedPost",
    model: "Posts",
  });
}

async function getUsers() {
  return User.find();
}

async function updateUser(id, input, file) {
  console.log("File object:", file);
  const user = await User.findById(id);
  const isPasswordMatch = input.password === user.password;
  const isUsernameMatch = input.username !== user.username;
  console.log(isUsernameMatch);
  const findusername = await User.findOne({ username: input.username });
  if (findusername && isUsernameMatch) {
    return {
      message: "Failed! Username is already in use!",
      usernameExists: true,
    };
  }
  const updatedUser = {
    username: input.username,
    password: isPasswordMatch
      ? user.password
      : bcrypt.hashSync(input.password, 8),
    email: input.email,
    phone: input.phone,
    isActive: input.isActive,
    role: input.role,
    gender: input.gender,
    two_FactAuth_Option: input.two_FactAuth_Option,
    isBlocked: false,
    updatedAt: new Date(),
    location: input.location,
  };

  if (file) {
    const fileLocation = await uploadImage(file);
    updatedUser.image = fileLocation;
  }
  await User.findByIdAndUpdate(id, updatedUser, { new: true });
  return {
    message: "User updated !",
    usernameExists: false,
  };
}

async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  return await user.remove();
}

async function toggleBlockUser(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  return user;
}
async function sendOTPVerificationSms(input) {
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
      emailChange: {
        code: hashedOTP,
        expiresAt: expiresAt,
        verified: false,
      },
    }
  );

  console.log(user);
  // scheduler to delete the the two_FactAuth field after an hour has passed
  const task = schedule.scheduleJob(new Date(expiresAt), async () => {
    try {
      const result = await User.updateOne(
        { email: finduser.email },
        { $unset: { emailChange: 1 } }
      );
      console.log("the field emailChange is done" + result);
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
            subject: "Request to change email",
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
}

async function verifyEmailChangeOTP(input) {
  const user = await User.findOne({ username: input.username });
  const now = Date.now();

  // Check if user exists
  if (!user) {
    return { message: "user does not exist", statusCode: false };
  }

  // Check if OTP exists and is not expired

  if (
    !user.emailChange ||
    !user.emailChange.code ||
    now > user.emailChange.expiresAt
  ) {
    // Clear OTP code and expiration time
    await User.updateOne({ email: user.email }, { $unset: { emailChange: 1 } });
    return { message: "OTP expired or not found", statusCode: false };
  }

  // Compare hashed OTP with input OTP

  const match = await bcrypt.compareSync(input.otp, user.emailChange.code);
  console.log(input.otp);
  console.log(user.emailChange.code);
  console.log("match0", match);
  const now1 = Date.now();
  const expiresAt = now1 + 3600000;
  if (match) {
    const updateEmailChange = {
      $unset: { emailChange: 1 },
      email_change_option: true,
      updatedAt: new Date(),
    };
    // OTP is valid
    // Clear OTP code and expiration time
    await User.updateOne({ email: user.email }, updateEmailChange);
    const task = schedule.scheduleJob(new Date(expiresAt), async () => {
      try {
        const result = await User.updateOne(
          { email: user.email },
          { email_change_option: false }
        );
        console.log("the field emailChange is done" + result);
      } catch (error) {
        console.error(error);
      }
    });
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
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  toggleBlockUser,
  sendOTPVerificationSms,
  verifyEmailChangeOTP,
  updateEmail,
};
