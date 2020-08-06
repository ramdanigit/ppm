import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/upm";

export function register(kecamatan, user) {
  return http.post(apiEndpoint, {
    kecamatan: kecamatan.kecamatan,
    username: user,
    password: kecamatan.password,
    type_user: kecamatan.type_user,
  });
}

export function getData() {
  return http.get(apiEndpoint);
}

export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export function updateData(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    upm: data.upm,
  });
}

export default {
  updateData,
  deleteData,
  register,
  getData,
};
