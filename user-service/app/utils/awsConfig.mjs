import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.SBS_AWS_REGION,
  accessKeyId: process.env.SBS_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SBS_AWS_SECRET_KEY,
});

const SNS_SERVICE = new AWS.SNS();
const S3_SERVICE = new AWS.S3();

export { SNS_SERVICE, S3_SERVICE };
