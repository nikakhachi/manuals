import axios from "axios";

import chunkData1 = require("./NewWaypoints/tb001-tb050.json");
import chunkData2 = require("./NewWaypoints/tb051-tb100.json");
import chunkData3 = require("./NewWaypoints/tb101-tb150.json");
import chunkData4 = require("./NewWaypoints/tb151-tb200.json");
import chunkData5 = require("./NewWaypoints/tb201-tb250.json");
import chunkData6 = require("./NewWaypoints/tb251-tb300.json");
import chunkData7 = require("./NewWaypoints/tb301-tb336.json");
import chunkData8 = require("./NewWaypoints/tbmx-tbtest.json");

const mainChunk = [...chunkData1, ...chunkData2, ...chunkData3, ...chunkData4, ...chunkData5, ...chunkData6, ...chunkData7, ...chunkData8];

let count = 0;
const eachChunkSize = 750;

for (let i = 46000; i < mainChunk.length + eachChunkSize; i += eachChunkSize) {
  setTimeout(async () => {
    let text = "";
    mainChunk.slice(i, i + eachChunkSize).forEach((item, index) => {
      console.log(item.name, index + i);
      // console.log(JSON.parse(item.path)[0]);
      text += `{ "index" : { "_index": "waypointstest", "_id" : "${index + 1 + i}" } }\n{"name": "${item.name}", "path": ${JSON.stringify(
        JSON.parse(item.path)[0]
      )}}\n`;
    });
    console.log(`$$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$`);
    console.log(`$$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$`);
    console.log("Sending Axios ..");
    await sendData(text);
    console.log("Data Sent ..");
    console.log(`$$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$`);
    console.log(`$$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$ $$$`);
  }, count * 30000);
  count++;
}

async function sendData(text) {
  try {
    await axios.post(`${ELASTIC_SEARCH_URL}/_bulk`, text, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
}