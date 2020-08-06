import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/laporan-rw";

export function createPdf(data) {
  return http.post(apiEndpoint + "/create-pdf", {
    data,
  });
}

export function getPdf() {
  return http.get(apiEndpoint + "/pdf", { responseType: "blob" });
}

export default {
  getPdf,
  createPdf,
};
