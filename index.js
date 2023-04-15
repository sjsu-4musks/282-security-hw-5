const S3 = require("aws-sdk/clients/s3");

const AWS_BUCKET_NAME = "";

const FILE_KEY = "";

const s3 = new S3({});

const readFile = async (key) => {
  const payload = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };

  return await s3.getObject(payload).promise();
};

const deleteFile = async (key) => {
  const payload = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };

  return await s3.deleteObject(payload).promise();
};

const init = async () => {
  try {
    // try reading the file, this should be allowed because Read only access is attached to this EC2 instance
    const readFileResponse = await readFile(FILE_KEY);
    console.log("read file response : ", readFileResponse);

    // try deleting file, should throw error since the EC2 instance does not have required permissions
    // const deleteFileResponse = await deleteFile(FILE_KEY);
    // console.log("delete file response : ", deleteFileResponse);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await init();
})();
