const fs = require("node:fs/promises");
const fs2 = require("fs");
async function main() {
  console.time("start");
  const file = await fs.open("text.txt", "w");
  for (let i = 0; i < 100000; i++) {
    // await fs.appendFile("text.txt", i.toString());
    await file.writeFile(` ${i} `);
    await file.write(` ${i} `);
  }
  console.timeEnd("start");
}
const max = 1000000;
// main();
//==============================

async function main2() {
  console.time("start");

  fs2.open("text.txt", "w", (err, fd) => {
    for (let i = 0; i < 100000; i++) {
      fs2.writeSync(fd, ` ${i} `);
    }
  });
  console.timeEnd("start");
}

// main2();

// using streams
async function main3() {
  console.time("streamswithoutwaiting");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < max; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }
  await fileHandle.close();
  console.timeEnd("streamswithoutwaiting");
  console.log(123);
}
//time: 350ms, 2.7s if we move timeEnd after filehandle.close()
//memory: 200mb

main3();

// async function main4() {
//   console.time("start");
//   let str = "";
//   for (let i = 0; i < 100000000; i++) {
//     str += ` ${i} `;
//   }

//   await fs.writeFile("text4.txt", str);
//   console.timeEnd("start");
// }

// main4();

// async function streams() {
//   const fileHandle = await fs.open("streams.txt", "w");

//   const stream = fileHandle.createWriteStream();

//   stream.write("hello2");

//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
//   console.log(1);
// }

// streams();

async function streams2() {
  console.time("streams");
  const fileHandle = await fs.open("streams2.txt", "w");

  const stream = fileHandle.createWriteStream();
  let i = 0;

  const handleDrain = async () => {
    while (i < max) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      const needsMore = stream.write(buff);
      if (!needsMore) {
        break;
      }
      i++;
      if (i === max) {
        console.timeEnd("streams");
        await fileHandle.close();
      }
    }
  };

  handleDrain();

  stream.on("drain", handleDrain);
}
//time:2.4s
//memory: 40mb
// streams2();
