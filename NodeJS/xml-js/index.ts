import { xml2json } from "xml-js";

const jsonResponse = xml2json(xmlResponse, {
  compact: true,
  spaces: 4,
});
