const otpGenerator = require('otp-generator');

// Generate a 6-digit numeric OTP
const generateOTP = () => {

    return otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
}

module.exports = { generateOTP }
