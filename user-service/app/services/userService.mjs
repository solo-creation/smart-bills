import UserRepository from "../repository/userRepository.mjs";
import { sendOtpHelper, validateNumber } from "../utils/common.mjs";
import { SuccessResponse, ErrorResponse } from "../utils/response.mjs";

class UserService {
  // private properties
  #userRepository;

  constructor() {
    this.#userRepository = new UserRepository();
  }

  async SendOtopService(data) {
    try {
      let { phoneNumber } = data;
      phoneNumber = "91" + phoneNumber;
      let GENRATED_OTP = Math.floor(100000 + Math.random() * 900000);
      console.log("OTP generated => " + GENRATED_OTP);
      if (!validateNumber(phoneNumber)) {
        return ErrorResponse(400, new Error("Invalid Mobile Number"));
      } else {
        const sendOtp = await sendOtpHelper(phoneNumber, GENRATED_OTP);
        console.log(sendOtp);
        if (sendOtp.data && sendOtp.data.MessageId) {
          console.log("[USER SERVICE]: OTP sent successfully");
          return SuccessResponse(200, {
            message: "OTP sent successfully",
            data: sendOtp.data.MessageId,
            status: "success",
            code: 200,
          });
        }
      }
    } catch (error) {
      return ErrorResponse(500, error);
    }
  }
}

export default UserService;
