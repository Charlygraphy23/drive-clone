import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { BUCKET_PATH } from "../_config/const";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.OBJECT_SPACE_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.OBJECT_SPACE_KEY,
        secretAccessKey: process.env.OBJECT_SECRET_KEY
    }
});


export class LOCAL_S3 {
    private bucket = BUCKET_PATH;
    private key: string = ""
    private body?: Buffer;
    private metadata: { isPublic?: boolean } & Record<string, any> = {}

    constructor({ key, body }: {
        key: string,
        body?: Buffer | ArrayBuffer
    }) {
        this.key = key

        if (body)
            this.body = Buffer.from(body)
    }

    setMetadata(data: { isPublic: boolean } & Record<string, any>) {
        this.metadata = data;
        return this
    }

    async put() {
        if (!this.body) {
            throw new Error("No body provided s3 put")
        }

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: this.key,
            Body: this.body,
            ServerSideEncryption: "AES256",
            Metadata: this.metadata
        })

        return await s3Client.send(command)
    }

    async get() {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: this.key,
        })

        return await s3Client.send(command)
    }

}
