import { SNS_SERVICE } from "./awsConfig.mjs";

export const validateNumber = (number) => {
  const cleanNumber = number.replace(/\D/g, "");

  if (cleanNumber.startsWith("91") && cleanNumber.length === 12) {
    console.log(cleanNumber);
    const remainingDigits = cleanNumber.slice(2);
    return /^[6-9]\d{9}$/.test(remainingDigits);
  }

  return false;
};

export const sendOtpHelper = async (number, otp) => {
  try {
    const MESSAGE = "Your OTP for Smart Bills : ";
    const params = {
      Message: MESSAGE + otp,
      PhoneNumber: number,
    };
    const data = await SNS_SERVICE.publish(params).promise();
    return {
      data,
      otp,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
