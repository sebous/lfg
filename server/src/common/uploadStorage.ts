import { FileUpload } from "graphql-upload";
import mime from "mime-types";
import { createWriteStream, promises as fs, unlink } from "fs";
import path from "path";
import shortid from "shortid";
import { streamToBuffer } from "./util/streamUtil";

const UPLOAD_FOLDER_NAME = "uploads";

async function ensureUploadFolderExists() {
  const folderPath = path.join(__dirname, `../../${UPLOAD_FOLDER_NAME}`);
  try {
    await fs.access(folderPath);
  } catch (err) {
    await fs.mkdir(folderPath);
  }
}

/**
 * @returns filename.ext in /uploads folder
 */
export async function saveUpload(upload: FileUpload): Promise<string> {
  const { createReadStream, mimetype, encoding } = await upload;

  const stream = createReadStream();
  const fileId = shortid.generate();
  const extension = mime.extension(mimetype);
  await ensureUploadFolderExists();
  const filePath = path.join(__dirname, `../../${UPLOAD_FOLDER_NAME}/${fileId}.${extension}`);

  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(filePath, { encoding: encoding === "7bit" ? "ascii" : encoding });
    writeStream.on("finish", resolve);
    writeStream.on("error", err => {
      unlink(filePath, () => reject(err));
    });

    stream.on("error", err => writeStream.destroy(err));
    stream.pipe(writeStream);
  });

  // const buffer = await streamToBuffer(createReadStream());

  // await fs.writeFile(path.join(__dirname, `../../${UPLOAD_FOLDER_NAME}/${fileId}.${extension}`), buffer, {
  //   encoding: encoding === "7bit" ? "ascii" : encoding,
  // });
  return `${fileId}.${extension}`;
}

/**
 *
 * @param fileName full name with extension
 */
export async function removeUpload(fileName: string) {
  try {
    await fs.unlink(path.join(__dirname, `../../${UPLOAD_FOLDER_NAME}/${fileName}`));
  } catch (err) {
    console.log(`attempt to removeUpload: ${fileName} failed!`);
  }
}
