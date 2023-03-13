const User = require("../../models/user");
async function deleteOTPVerificationRecord(email) {
    const user = await User.findOne({ email });
    if (user && user.two_FactAuth) {
      const { expiresAt } = user.two_FactAuth;
      const now = Date.now();
      if (now < expiresAt) {
        // OTP verification record has not expired yet
        const timeToExpire = expiresAt - now;
        setTimeout(async () => {
          // Delete the two_FactAuth field
          await User.updateOne({ email }, { $unset: { two_FactAuth: "" } });
        }, timeToExpire);
        return { message: `OTP verification record for ${email} will be deleted in ${timeToExpire} ms.` };
      } else {
        // OTP verification record has already expired
        await User.updateOne({ email }, { $unset: { two_FactAuth: "" } });
        return { message: `OTP verification record for ${email} has already expired and has been deleted.` };
      }
    } else {
      // User not found or OTP verification record does not exist
      return { message: `OTP verification record for ${email} not found.` };

    }
  }
  export default {
    deleteOTPVerificationRecord

  };
  