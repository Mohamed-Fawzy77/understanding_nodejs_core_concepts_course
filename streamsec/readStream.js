const fs = require("node:fs/promises");

async function main() {
  const srcHandle = await fs.open("src.txt", "r");
  const distHandle = await fs.open("dist.txt", "w");

  const readStream = srcHandle.createReadStream();
  const writeStream = distHandle.createWriteStream();

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
  });
}

// main();

async function main2() {
  const srcHandle = await fs.open("src.txt", "r");
  const distHandle = await fs.open("dist.txt", "w");

  const readStream = srcHandle.createReadStream();
  const writeStream = distHandle.createWriteStream();

  readStream.on("data", (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  writeStream.on("drain", () => {
    readStream.resume();
  });
}
//this is more efficient, this won't make node buffer some content to the memory
main2();
