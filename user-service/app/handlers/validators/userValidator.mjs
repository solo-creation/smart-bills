import Joi from "joi";

class UserValidator {
  constructor() {
    console.log("Initializing UserValidator");
  }

  /**
   * @type {object}
   * @public SendOtpValidator
   */
  SendOtpValidator() {
    const schema = Joi.object({
      phoneNumber: Joi.number().required(),
    });
    return schema;
  }
}

export default UserValidator;
