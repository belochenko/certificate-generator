import S3 from "aws-sdk/clients/s3";
import "dotenv/config";

const s3 = new S3({
  accessKeyId: process.env.STORJ_ACCESS_KEY,
  secretAccessKey: process.env.STORJ_SECRET_KEY,
  endpoint: process.env.STORJ_ENDPOINT,
  signatureVersion: "v4",
});

export async function listTemplates(
  bucketName: string,
  extension: string,
): Promise<string[]> {
  const params = {
    Bucket: bucketName,
    Prefix: "",
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.filter((item) => item.Key.endsWith(extension)).map(
      (item) => {
        const signedUrl = s3.getSignedUrl("getObject", {
          Bucket: bucketName,
          Key: item.Key,
          // Expires: 3600, // URL expiration time in seconds
        });
        return signedUrl;
      },
    );
  } catch (error) {
    console.error("Error listing objects from Storj:", error);
    throw error;
  }
}
