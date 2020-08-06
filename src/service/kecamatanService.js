import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/kecamatan";

export function register(data, username) {
  return http.post(apiEndpoint, {
    username: username,
    password: data.password,
    type_user: "Kecamatan",
    device_id: "",
    kecamatan: data.kecamatan,
  });
}

export function getData() {
  return http.get(apiEndpoint);
}

export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export function updateData(data, username) {
  return http.put(apiEndpoint + "/" + data.id, {
    username: username,
    password: data.password,
    type_user: "Kecamatan",
    device_id: "",
    kecamatan: data.kecamatan,
  });
}

export default {
  updateData,
  deleteData,
  register,
  getData,
};
