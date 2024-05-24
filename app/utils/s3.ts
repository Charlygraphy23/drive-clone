import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.OBJECT_SPACE_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.OBJECT_SPACE_KEY,
        secretAccessKey: process.env.OBJECT_SECRET_KEY
    }
});


export { s3Client };
