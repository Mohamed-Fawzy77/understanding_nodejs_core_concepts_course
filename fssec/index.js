const fs = require("node:fs/promises");

const COMMANDS = {
  CREATE_FILE: "create a file",
};

async function createFile(path) {
  try {
    await fs.writeFile(path, "", { flag: "wx" });
    console.log(`creating a file at path=${path}`);

    fs.un;
  } catch (e) {
    console.log(`file already exist at path=${path}`);
  }
}

async function main() {
  const handler = await fs.open("./command.txt", "r");
  const watcher = fs.watch("./command.txt");

  async function handleNewCommand() {
    const stat = await handler.stat();

    const size = stat.size;
    if (size === 0) {
      return;
    }
    const buf = Buffer.alloc(size);
    const offset = 0;
    const length = size;
    await handler.read(buf, offset, length, 0);
    const content = buf.toString("utf-8");
    console.log({ content });
    if (content.includes(COMMANDS.CREATE_FILE)) {
      const filepath = content.substring(COMMANDS.CREATE_FILE.length + 1);
      await createFile(filepath);
    }
  }

  handler.on("change", handleNewCommand);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      handler.emit("change");
    }
  }
}

main();
