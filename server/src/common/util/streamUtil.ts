import { ReadStream } from "fs";

export function streamToBuffer(stream: ReadStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", err => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
