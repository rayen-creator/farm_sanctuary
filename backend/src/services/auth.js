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

 async function sendOTPVerificationEmail(input)  {

  
      // Generate a 4-digit OTP
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  
      // Hash the OTP
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(otp, saltRounds);
 
  
      // Save the OTP verification record
      const now = Date.now();
      const expiresAt = now + 3600000; // Expires in 1 hour
      const user=await User.updateOne({email:input.email} , {  two_FactAuth : { 
        code : hashedOTP, 
        expiresAt: expiresAt,
    
      }})  
      
      
      // await deleteOTPVerificationRecord(input.email);
      // verifying if time is updated rayen delete this line after
      console.log(user); 

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
                to: input.email,
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
        return{
          message: "error has occured"
      } } 
      return {
        message:"mail sent"
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
  
      
    
  };  

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

async function verifyOTP(input) {
  const user = await User.findOne({ email: input.email });
  const now = Date.now();

  // Check if user exists
  if (!user) {
return {message:"user does not exist"}  }


  // Check if OTP exists and is not expired 

  if (
    !user.two_FactAuth ||
    !user.two_FactAuth.code ||
    now > user.two_FactAuth.expiresAt
  ) {
    return {message:"OTP expired or not found" };
  }

  // Compare hashed OTP with input OTP

  const match = await bcrypt.compare(input.otp, user.two_FactAuth.code);
console.log(input.otp)
console.log(user.two_FactAuth.code)

  if (match) {
    // OTP is valid
    // Clear OTP code and expiration time
    await User.updateOne(
      { email: input.email },
      { $unset: { two_FactAuth: 1 } }
    );
    return { message: "OTP verified" };
  } else {
    // OTP is invalid
    return {message: "Invalid OTP"};
  }
}

module.exports = {
  signin,
  signup,
  restpwd,
  sendOTPVerificationEmail,
  verifyOTP
};
