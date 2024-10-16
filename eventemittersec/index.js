class Event {
  mapper = {};
  on(event, cb) {
    if (!this.mapper[event]) {
      this.mapper[event] = [];
    }

    this.mapper[event].push(cb);
  }

  emit(event) {
    if (!this.mapper[event]) return;

    for (const cb of this.mapper[event]) {
      cb();
    }
  }
}
const button = new Event();

button.on("click", () => {
  console.log("clicked");
});

button.on("click", () => {
  console.log("clicked2");
});

button.emit("click");

let x = 0x23;
console.log({ x });
