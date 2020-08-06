import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/rw";

export function register(data, username) {
  return http.post(apiEndpoint, {
    no_ktp: data.no_ktp,
    nama_rw: data.nama_rw,
    tgl_lahir: data.tgl_lahir,
    tempat_lahir: data.tempat_lahir,
    KecamatanId: data.KecamatanId,
    KelurahanId: data.KelurahanId,
    alamat: data.alamat,
    no_rw: data.no_rw,
    email: data.email,
    no_hp: data.no_hp,
    username: username,
    password: data.password,
    type_user: "RW",
    device_id: "",
  });
}

export function getData() {
  return http.get(apiEndpoint);
}
export function getDataRW(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}
export function updateData(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    no_ktp: data.no_ktp,
    nama_rw: data.nama_rw,
    tgl_lahir: data.tgl_lahir,
    tempat_lahir: data.tempat_lahir,
    KecamatanId: data.KecamatanId,
    KelurahanId: data.KelurahanId,
    alamat: data.alamat,
    no_rw: data.no_rw,
    email: data.email,
    no_hp: data.no_hp,
    username: data.username,
    password: data.password,
    type_user: "RW",
    device_id: "",
  });
}

export default {
  updateData,
  deleteData,
  register,
  getData,
  getDataRW,
};
