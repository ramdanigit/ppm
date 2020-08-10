import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function getData() {
  return http.get(apiEndpoint);
}

export function getDataByOne(id) {
  return http.get(apiEndpoint + "/" + id);
}

export default {
  getDataByOne,
  getData,
};
