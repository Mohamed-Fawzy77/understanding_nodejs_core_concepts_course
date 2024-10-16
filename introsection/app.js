// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "plain/text");

//   const result = fs.readFileSync("./data.txt");

//   res.end(result);
// });

// server.listen(4080, "127.0.0.1", () => {
//   console.log(`server is running on `, server.address());
// });

console.log("first");

for (let i = 0; i < 100000000000; i++) {}
console.log("second");
