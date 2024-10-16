// Async generator function
async function* fetchData() {
  const dataChunks = [1, 2, 3, 4]; // Simulating data
  for (let chunk of dataChunks) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    yield chunk; // Yield data after delay
  }
  yield 6;
  console.log(123);
}

// Consuming the async iterator
async function processData() {
  const result = fetchData();
  for await (let chunk of result) {
    console.log(chunk); // Logs 1, 2, 3 with 1 second delay
  }
  console.log(12);
}

processData();
