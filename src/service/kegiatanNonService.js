import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/kegiatan-non";

export function register(data) {
  return http.post(apiEndpoint, {
    RWId: data.RWId,
    kota: data.kota,
    bulan: data.bulan,
    tahun: data.tahun,
    nama_bidang: data.nama_bidang,
    nama_kegiatan: data.nama_kegiatan,
    jumlah_orang: data.jumlah_orang,
    waktu: data.waktu,
    pembayaran_per_orang: data.pembayaran_per_orang,
    jumlah_biaya: data.jumlah_biaya,
    jumlah_orang_terlibat: data.jumlah_orang_terlibat,
  });
}

export function registerData(formData) {
  return http.post(apiEndpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function uploadProfile(formData, username) {
  return http.post(apiEndpoint + "/" + username, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getData() {
  return http.get(apiEndpoint);
}
export function getDataByRW(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}
export function updateData(data) {
  return http.put(apiEndpoint + "/" + data.id, {
    RWId: data.RWId,
    kota: data.kota,
    bulan: data.bulan,
    tahun: data.tahun,
    nama_bidang: data.nama_bidang,
    nama_kegiatan: data.nama_kegiatan,
    jumlah_orang: data.jumlah_orang,
    waktu: data.waktu,
    pembayaran_per_orang: data.pembayaran_per_orang,
    jumlah_biaya: data.jumlah_biaya,
    jumlah_orang_terlibat: data.jumlah_orang_terlibat,
  });
}

export default {
  updateData,
  deleteData,
  register,
  uploadProfile,
  getData,
  getDataByRW,
  registerData,
};
