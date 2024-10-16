const { Buffer } = require("buffer");

// const buf = Buffer.alloc(4);

// buf[0] = 100;
// // buf.writeInt8(-128);
// x = buf.readInt8(0);
// console.log({ x });
// console.log({ x: buf[0] });
// 01100100

// const c = Buffer.alloc(3);

// c[0] = 0x48;
// c[1] = 0x69;
// c[2] = 0x21;

// console.log({ str: c.toString("utf-8") });
const newBuffer = Buffer.from([0xc4, 0x80]);

const strBuf = Buffer.from("Ä");
// const b2 = Buffer.from(strBuf);

console.log({ strBuf, str: strBuf.toString() });
// console.log({ newBuffer, str2: newBuffer.toString() });
1001;
