import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID || "",
  },
});

export function uploadAsset(filename: string, body: string, contentType: 'css' | 'javascript' | 'html') {
  const upload = new PutObjectCommand({
    Bucket: "linktree-dev",
    Body: body,
    Key: filename,
    ContentType: `text/${contentType}`
  });

  return client.send(upload);
}
