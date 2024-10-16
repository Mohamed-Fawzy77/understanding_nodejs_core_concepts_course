const fs = require("fs/promises");

async function createSrcFile() {
  return new Promise(async (resolve, reject) => {
    const max = 5000000;
    const fileHandle = await fs.open("srcFile.txt", "w");

    const stream = fileHandle.createWriteStream();

    let i = 0;
    async function writeToStream() {
      while (i < max) {
        const res = stream.write(`${i} `);
        i++;
        if (i === max) {
          await fileHandle.close();
          resolve(true);
        }
        if (!res) {
          return;
        }
      }
    }
    stream.on("drain", writeToStream);
    await writeToStream();
  });
}
let lastData = "";
let lastElement = "";
async function filterOddNumbers() {
  const srcFileHandle = await fs.open("srcFile.txt", "r");
  const distFileHandle = await fs.open("distFile.txt", "w");

  const readStream = srcFileHandle.createReadStream();
  const writeStream = distFileHandle.createWriteStream();

  readStream.on("data", (chunk) => {
    const content = chunk.toString().split(" ");
    content[0] = (lastData + content[0]).trim();

    const lastElementIndex = content.length - 1;
    for (let i = 0; i < content.length; i++) {
      const element = content[i];
      lastElement = element;
      if (i === lastElementIndex) {
        lastData = element;
      } else {
        if (element % 2 == 0) {
          const continueWriting = writeStream.write(`${element} `);
          if (!continueWriting) {
            readStream.pause();
          }
        }
      }
    }
  });

  writeStream.on("drain", () => {
    readStream.resume();
  });

  readStream.on("end", async () => {
    await srcFileHandle.close();
    await distFileHandle.close();
  });
}

async function main() {
  await createSrcFile();
  await filterOddNumbers();
}

main();
