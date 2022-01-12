import fs from "fs";

export const deleteFile = async (filename) => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    return;
  }

  await await fs.promises.unlink(filename);
};
