const FormatResponse = (statusCode, message, data) => {
  if (data) {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message,
        data,
      }),
    };
  } else {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    };
  }
};

const SuccessResponse = (statusCode = 200, data) => {
  return FormatResponse(statusCode, "Success", data);
};

const ErrorResponse = (statusCode = 500, error) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const errorMessage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occured";
    return FormatResponse(statusCode, errorMessage, errorObject);
  }

  return FormatResponse(statusCode, `${error}`, error);
};

const ValidationErrorResponse = (statusCode = 400, error) => {
  const errorMessage = "Validation Error";
  const errorDetails = error.details;
  return FormatResponse(statusCode, errorMessage, errorDetails);
};

export { SuccessResponse, ErrorResponse, ValidationErrorResponse };
