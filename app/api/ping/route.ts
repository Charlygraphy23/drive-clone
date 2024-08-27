import { NextResponse } from "next/server";

// const createBucketLifeCycle = async () => {
//     const s3Client = new S3({
//         forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//         endpoint: process.env.OBJECT_SPACE_ENDPOINT,
//         region: "us-east-1",
//         credentials: {
//             accessKeyId: process.env.OBJECT_SPACE_KEY,
//             secretAccessKey: process.env.OBJECT_SECRET_KEY
//         }
//     });


//     const input = { // PutBucketLifecycleConfigurationRequest
//         Bucket: "mycloudstorage1", // required
//         // ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256",
//         LifecycleConfiguration: { // BucketLifecycleConfiguration
//             Rules: [ // LifecycleRules // required
//                 { // LifecycleRule
//                     //   Expiration: { // LifecycleExpiration
//                     //     Date: new Date("TIMESTAMP"),
//                     //     Days: Number("int"),
//                     //     ExpiredObjectDeleteMarker: true || false,
//                     //   },
//                     ID: "Remove old",
//                     Prefix: "",
//                     //   Filter: { // LifecycleRuleFilter Union: only one key present
//                     //     Prefix: "STRING_VALUE",
//                     //     Tag: { // Tag
//                     //       Key: "STRING_VALUE", // required
//                     //       Value: "STRING_VALUE", // required
//                     //     },
//                     //     ObjectSizeGreaterThan: Number("long"),
//                     //     ObjectSizeLessThan: Number("long"),
//                     //     And: { // LifecycleRuleAndOperator
//                     //       Prefix: "STRING_VALUE",
//                     //       Tags: [ // TagSet
//                     //         {
//                     //           Key: "STRING_VALUE", // required
//                     //           Value: "STRING_VALUE", // required
//                     //         },
//                     //       ],
//                     //       ObjectSizeGreaterThan: Number("long"),
//                     //       ObjectSizeLessThan: Number("long"),
//                     //     },
//                     //   },
//                     Status: ExpirationStatus.Enabled,
//                     //   Transitions: [ // TransitionList
//                     //     { // Transition
//                     //       Date: new Date("TIMESTAMP"),
//                     //       Days: Number("int"),
//                     //       StorageClass: "GLACIER" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "DEEP_ARCHIVE" || "GLACIER_IR",
//                     //     },
//                     //   ],
//                     //   NoncurrentVersionTransitions: [ // NoncurrentVersionTransitionList
//                     //     { // NoncurrentVersionTransition
//                     //       NoncurrentDays: Number("int"),
//                     //       StorageClass: "GLACIER" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "DEEP_ARCHIVE" || "GLACIER_IR",
//                     //       NewerNoncurrentVersions: Number("int"),
//                     //     },
//                     //   ],
//                     //   NoncurrentVersionExpiration: { // NoncurrentVersionExpiration
//                     //     NoncurrentDays: Number("int"),
//                     //     NewerNoncurrentVersions: Number("int"),
//                     //   },
//                     AbortIncompleteMultipartUpload: { // AbortIncompleteMultipartUpload
//                         DaysAfterInitiation: 1
//                     },
//                 },
//             ],
//         },
//         // ExpectedBucketOwner: "STRING_VALUE",
//     };
//     const command = new PutBucketLifecycleConfigurationCommand(input);
//     const response = await s3Client.send(command);

//     return response
// }

// const deleteBucketLifeCycle = async () => {
//     const s3Client = new S3({
//         forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//         endpoint: process.env.OBJECT_SPACE_ENDPOINT,
//         region: "us-east-1",
//         credentials: {
//             accessKeyId: process.env.OBJECT_SPACE_KEY,
//             secretAccessKey: process.env.OBJECT_SECRET_KEY
//         }
//     });


//     const input = { // DeleteBucketLifecycleRequest
//         Bucket: "mycloudstorage1", // required
//         ExpectedBucketOwner: "DO00ELF74Z4NR3QLY3GQ",
//     };
//     const command = new DeleteBucketLifecycleCommand(input);
//     const response = await s3Client.send(command);

//     return response
// }

// const getBucketLifeCycle = async () => {
//     const s3Client = new S3({
//         forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//         endpoint: process.env.OBJECT_SPACE_ENDPOINT,
//         region: "us-east-1",
//         credentials: {
//             accessKeyId: process.env.OBJECT_SPACE_KEY,
//             secretAccessKey: process.env.OBJECT_SECRET_KEY
//         }
//     });


//     const input = {
//         "Bucket": "mycloudstorage1"
//     };
//     const command = new GetBucketLifecycleConfigurationCommand(input);
//     const response = await s3Client.send(command);
//     return response
// }

export const GET = async () => {
    // const response = await getBucketLifeCycle()
    return NextResponse.json("Nothing Like anything Micromax")
}