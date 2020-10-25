import { FileUpload } from "graphql-upload";
import mime from "mime-types";
import { promises as fs } from "fs";
import path from "path";
import shortid from "shortid";
import { streamToBuffer } from "./util/streamUtil";

async function ensureUploadFolderExists() {
  const folderPath = path.join(__dirname, "../../uploads");
  try {
    await fs.access(folderPath);
  } catch (err) {
    await fs.mkdir(folderPath);
  }
}

/**
 * @returns filename.ext in /upload folder
 */
export async function saveUpload(upload: FileUpload): Promise<string> {
  const { createReadStream, mimetype, encoding } = upload;
  const buffer = await streamToBuffer(createReadStream());
  const fileId = shortid.generate();
  const extension = mime.extension(mimetype);
  await ensureUploadFolderExists();
  await fs.writeFile(path.join(__dirname, `../../uploads/${fileId}.${extension}`), buffer, {
    encoding: encoding === "7bit" ? "ascii" : encoding,
  });
  return `${fileId}.${extension}`;
}

/**
 *
 * @param fileName full name with extension
 */
export async function removeUpload(fileName: string) {
  await fs.unlink(path.join(__dirname, `../../uploads/${fileName}`));
}
