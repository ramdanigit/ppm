import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/kelurahan";

export function register(data, username) {
  return http.post(apiEndpoint, {
    kelurahan: data.kelurahan,
    KecamatanId: data.KecamatanId,
    username: username,
    password: data.password,
    type_user: "Kelurahan",
    device_id: "",
  });
}
export function registerUser(kelurahan, usernam, id) {
  return http.post(apiUrl + "/user", {
    // kelurahan: kelurahan.kelurahan,
    // KecamatanId: kelurahan.KecamatanId,
    KelurahanId: id,
    password: kelurahan.password,
    username: usernam,
    type_user: "Kelurahan",
  });
}
// export function registerUser(formData) {
//   return http.post(apiEndpoint, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

export function getData() {
  return http.get(apiEndpoint);
}
export function getKecamatan(id) {
  return http.get(apiEndpoint + "/kecamatan/" + id);
}
export function deleteData(id) {
  return http.delete(apiEndpoint + "/" + id);
}
export function updateData(data, username) {
  return http.put(apiEndpoint + "/" + data.id, {
    kelurahan: data.kelurahan,
    KecamatanId: data.KecamatanId,
    username: username,
    password: data.password,
    type_user: "Kelurahan",
    device_id: "",
  });
}

export default {
  updateData,
  deleteData,
  register,
  getKecamatan,
  getData,
  registerUser,
};
