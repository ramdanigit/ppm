import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function registerRW(data) {
  return http.post(apiEndpoint, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    RWId: data.RWId,
  });
}
export function updateDataRW(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    RWId: data.RWId,
  });
}
export function registerKecamatan(data) {
  return http.post(apiEndpoint, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    KecamatanId: data.KecamatanId,
  });
}
export function updateDataKecamatan(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    KecamatanId: data.KecamatanId,
  });
}
export function registerKelurahan(data) {
  return http.post(apiEndpoint, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    KelurahanId: data.KelurahanId,
  });
}
export function updateDataKelurahan(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: data.device_id,
    KelurahanId: data.KelurahanId,
  });
}

export function getData() {
  return http.get(apiEndpoint);
}

export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export default {
  updateDataRW,
  registerRW,
  updateDataKecamatan,
  registerKecamatan,
  updateDataKelurahan,
  registerKelurahan,
  deleteData,
  getData,
};
