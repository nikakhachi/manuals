const unzipperScript = `
  importScripts("https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.11/pako_inflate.min.js");
  self.onmessage = async (evt) => {
    const file = evt.data;
    const buf = await file.arrayBuffer();
    const decompressed = pako.inflate(buf);
    self.postMessage(decompressed, [decompressed.buffer]);
  };
`;
const unzipperBlob = new Blob([unzipperScript], {
  type: "application/javascript",
});
const unzipperWorker = URL.createObjectURL(unzipperBlob);

new Promise((res, rej) => {
  const worker = new Worker(unzipperWorker);
  worker.onmessage = (result) => {
    const stringifiedMotion = textDecoder.decode(result.data);
    res(stringifiedMotion);
    worker.terminate();
  };
  worker.postMessage(data);
});
