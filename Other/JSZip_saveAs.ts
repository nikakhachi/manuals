import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";

// Access ZIPed File
const { data: zippedFolderAsBlob } = await axios.get("someitem.zip", {
  responseType: "arraybuffer",
});
const new_zip = new JSZip();
const zipped = await new_zip.loadAsync(zippedFolderAsBlob);
const extractedJSON1: string = await zipped.file("nameOfTheFile1.json").async("text");
const extractedJSON2: string = await zipped.file("nameOfTheFile2.json").async("text");

// Add items to ZIP and download
const zip = new JSZip();
zip.file(`item.txt`, JSON.stringify(["data"], null, 2));
const content: Blob = await zip.generateAsync({ type: "blob" });
saveAs(content, "MentionAnalytics_Analysis.zip");
