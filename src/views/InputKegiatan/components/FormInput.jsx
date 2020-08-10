import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import moment from "moment";
import { getDataRW } from "service/rwServices";
import auth from "service/authService";
import AlertContext from "context/AlertContext";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { registerData } from "service/kegiatanService";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import auth from "service/authService";
import { Input, Select as SelectAnt, DatePicker, InputNumber } from "antd";

const { Option } = SelectAnt;

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  btnGroup: {
    display: "flex",
    // paddingLeft: "12px",
  },
  w90: {
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  w10: {
    // width: "10%",
    boxShadow: "0px 0px",
    padding: "5px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.white,
  },
  submit: {
    paddingLeft: "12px",
  },
  wrap: {
    padding: "30px",
  },
  btnFoto: {
    width: "100%",
    height: "50px",
    backgroundColor: "transparent",
    padding: "0 0 10px 8px",
    margin: 0,
    // minHeight: "15px",
    // display: "flex",
    // justifyContent: "left",
  },
  listFoto: {
    padding: 0,
    margin: 0,
  },
  bgg: {
    backgroundColor: "black",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const FormInput = () => {
  const classes = useStyles();
  const month = new Date().getUTCMonth() + 1;
  const year = new Date().getUTCFullYear();
  const [waktu, setWaktu] = React.useState({ jam: 1, hari: 2, bulan: 3 });
  const [val, setVal] = React.useState({
    // no_rw: auth.getCurrentUser().no_rw,
    kelurahan: "BOJONGSOANG",
    kecamatan: "BUAHBATU",
    kota: "Bandung",
    bulan: month,
    tahun: year,
    nama_bidang: "",
    nama_kegiatan: "",
    barang: "",
    satuan_barang: "",
    waktu: "",
    satuan_waktu: "",
    pembayaran_per_orang: "",
    jumlah_biaya: "",
    jumlah_orang_terlibat: "",
  });
  const [subKegiatan, setSubKegiatan] = React.useState("");
  const [lainnya, setLainnya] = React.useState("");
  const open = React.useContext(AlertContext);
  const updateSub = (e) => {
    setSubKegiatan(e.target.value);
  };
  const selectSatuanWaktu = (value) => {
    setVal({
      ...val,
      satuan_waktu: value,
    });
  };
  const updateFieldBarang = (value) => {
    setVal({
      ...val,
      barang: value,
    });
  };
  const updateFieldSatuan = (value) => {
    setVal({
      ...val,
      satuan_barang: value,
    });
  };
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");
  const [e, setE] = React.useState("");

  const getInputName = (e) => {
    const nameArray = [
      "dokumen1",
      "dokumen2",
      "dokumen3",
      "dokumen4",
      "dokumen5",
    ];
    if (e.target.files.length > 5) {
      alert("Batas File Foto Hanya 5");
      return true;
    }
    if (e.target.files[0]) {
      setA(e.target.files[0]);
    }
    if (e.target.files[1]) {
      setB(e.target.files[1]);
    }
    if (e.target.files[2]) {
      setC(e.target.files[2]);
    }
    if (e.target.files[3]) {
      setD(e.target.files[3]);
    }
    if (e.target.files[4]) {
      setE(e.target.files[4]);
    }
  };
  const [rw, setRW] = React.useState([]);
  const getRW = async () => {
    const a = await getDataRW(auth.getCurrentUser().RWId);
    setRW(a.data);
  };
  const [date, setDate] = React.useState("");
  function onChangeDate(date, dateString) {
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();
    const hari = new Date().getUTCDate() + 1;

    const data = dateString.split("-");
    if (parseInt(data[0]) > year) {
      alert("masukan Tahun Sekarang");
      setDate("");
      return "";
    }
    if (parseInt(data[0]) < year) {
      alert("masukan Tahun Sekarang");
      setDate("");
      return "";
    }
    if (parseInt(data[1]) > month) {
      alert("masukan Bulan Sekarang");
      setDate("");
      return "";
    }
    if (parseInt(data[1]) < month) {
      alert("masukan Bulan Sekarang");
      setDate("");
      return "";
    }
    if (parseInt(data[2]) > hari) {
      alert("masukan Hari Sekarang atau Hari sebelumnya !");
      setDate("");
      return "";
    }

    setDate(dateString);
  }
  const doSubmit = async (e) => {
    e.preventDefault();
    const months = new Array(12);
    months[0] = "Januari";
    months[1] = "Februari";
    months[2] = "Maret";
    months[3] = "April";
    months[4] = "Mei";
    months[5] = "Juni";
    months[6] = "Juli";
    months[7] = "Agustus";
    months[8] = "September";
    months[9] = "Oktober";
    months[10] = "November";
    months[11] = "Desember";
    let form_data = new FormData();
    // console.log(rw[0].kelurahan);
    const datePilih = date.split("-");
    console.log(val);
    try {
      if (a) {
        form_data.append("dokumen", a);
      }
      if (b) {
        form_data.append("dokumen", b);
      }
      if (c) {
        form_data.append("dokumen", c);
      }
      if (d) {
        form_data.append("dokumen", d);
      }
      if (e) {
        form_data.append("dokumen", e);
      }
      form_data.append("RWId", auth.getCurrentUser().RWId);
      form_data.append("kota", "Bandung");
      if (date) {
        form_data.append("tgl", datePilih[2]);
        form_data.append("bulan", months[parseInt(datePilih[1]) - 1]);
        form_data.append("tahun", datePilih[0]);
      }
      form_data.append("nama_bidang", val.nama_bidang);
      // form_data.append("no_rw", rw[0].no_rw);
      form_data.append(
        "nama_kegiatan",
        subKegiatan ? subKegiatan : val.nama_kegiatan
      );
      form_data.append("barang", parseInt(val.barang));
      form_data.append("satuan_barang", val.satuan_barang);
      form_data.append("waktu", parseInt(val.waktu));
      form_data.append("satuan_waktu", "Kali");
      form_data.append(
        "jumlah_biaya",
        parseInt(val.barang) *
          parseInt(val.pembayaran_per_orang) *
          parseInt(val.waktu)
      );

      form_data.append("pembayaran_per_orang", val.pembayaran_per_orang);
      form_data.append("jumlah_orang_terlibat", val.jumlah_orang_terlibat);

      open.updateState(true, false, "success", "");

      await registerData(form_data);

      if (updateSub) {
        setVal({
          ...val,
          kegiatan: updateSub,
        });
      }

      open.updateState(false, true, "success", "membuat kegiatan berhasil");

      setA("");
      setB("");
      setC("");
      setD("");
      setE("");
      setVal({
        no_rw: "",
        kelurahan: "",
        kecamatan: "",
        kota: "Bandung",
        bulan: "",
        tahun: "",
        nama_bidang: "",
        nama_kegiatan: "",
        barang: "",
        satuan_barang: "",
        waktu: "",
        satuan_waktu: "",
        pembayaran_per_orang: "",
        jumlah_biaya: "",
        jumlah_orang_terlibat: "",
      });
      setSubKegiatan("");
      setDate("");
    } catch (ex) {
      console.log(ex);
      if (!ex.response) {
        open.updateState(false, true, "error", "Error 404");
        return true;
      }

      if (ex.response.data === "Kecamatan sebelumnya sudah ada") {
        open.updateState(false, true, "error", ex.response.data);
      }
      open.updateState(false, true, "error", ex.response.data);
    }
  };
  React.useEffect(() => {
    getRW();
  }, []);

  return (
    <div className={classes.wrap}>
      <Card>
        <form
          onSubmit={doSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          <CardHeader
            action={
              <IconButton aria-label="expand">
                <OpenInNewIcon />
              </IconButton>
            }
            subheader="Isi dengan benar"
            title="Form Input Kegiatan"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  size="small"
                >
                  <FormLabel component="legend">Pilih Bidang :</FormLabel>
                  <Select
                    native
                    value={val.nama_bidang}
                    onChange={updateField}
                    label="Bidang"
                    inputProps={{
                      name: "nama_bidang",
                      id: "nama_bidang",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Bidang Kemasyarakatan">
                      {"Bidang Kemasyarakatan"}
                    </option>
                    <option value="Bidang Ekonomi">{"Bidang Ekonomi"}</option>
                    <option value="Bidang Social">{"Bidang Social"}</option>
                    <option value="Bidang Pendidikan">
                      {"Bidang Pendidikan"}
                    </option>
                    <option value="Bidang Kesehatan">
                      {"Bidang Kesehatan"}
                    </option>

                    <option value="Bidang Kebersihan dan Lingkungan Hidup">
                      {"Bidang Kebersihan dan Lingkungan Hidup"}
                    </option>
                    <option value="Bidang Agama">{"Bidang Agama"}</option>
                    <option value="Bidang Seni Budaya">
                      {"Bidang Seni Budaya"}
                    </option>
                    <option value="Bidang Infrastruktur">
                      {"Bidang Infrastruktur"}
                    </option>
                    <option value="Hari Besar Nasional">
                      {"Hari Besar Nasional"}
                    </option>
                  </Select>
                </FormControl>

                {val.nama_bidang === "Bidang Kemasyarakatan" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {/* {broker
                    .map((value, index) => ( */}
                      <option value="penguatan">
                        {"Penguatan sistem keamanan Iingkungan"}
                      </option>
                      <option value="Pemeliharaan Pos Keamanan Lingkungan">
                        {"Pemeliharaan Pos Keamanan Lingkungan"}
                      </option>
                      <option
                        value="Pelaksanaan Ronda
                    Siskamling Lingkungan RW"
                      >
                        {"Pelaksanaan Ronda Siskamling Lingkungan RW"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang kemasyarakatan"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Ekonomi" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {/* {broker
                    .map((value, index) => ( */}
                      <option value="Pembentukan Koperasi Warga">
                        {"Pembentukan Koperasi Warga"}
                      </option>
                      <option value="Arisan Warga">{"Arisan Warga"}</option>
                      <option value="Operasional/penyelenggaraan bazar warga">
                        {"Operasional/penyelenggaraan bazar warga"}
                      </option>
                      <option value="Pelatihan Kewirausahaan Warga">
                        {"Pelatihan Kewirausahaan Warga"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang Ekonomi"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Social" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {/* {broker
                    .map((value, index) => ( */}
                      <option value="Iuran Santunan Kematian">
                        {"Iuran Santunan Kematian"}
                      </option>
                      <option value="Santunan Untuk Orang sakit">
                        {"Santunan Untuk Orang sakit"}
                      </option>
                      <option value="Perbaikan Rumah Kumuh Mandiri">
                        {"Perbaikan Rumah Kumuh Mandiri"}
                      </option>
                      <option value="Bantuan Bencana">
                        {"Bantuan Bencana"}
                      </option>
                      <option value="Pembagian Makanan Jumat Berkah">
                        {"Pembagian Makanan Jumat Berkah"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang Social"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Pendidikan" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Penyelenggaraan Pendidikan Anak Usia Dini (PAUD)">
                        {"Penyelenggaraan Pendidikan Anak Usia Dini (PAUD)"}
                      </option>
                      <option value="Penyelenggaraan Play Group Warga">
                        {"Penyelenggaraan Play Group Warga"}
                      </option>
                      <option value="Kegiatan Belajar Warga">
                        {"Kegiatan Belajar Warga"}
                      </option>
                      <option value="Perpustakaan Warga">
                        {"Perpustakaan Warga"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang Pendidikan"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Kesehatan" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Operasional Posyandu">
                        {"Operasional Posyandu"}
                      </option>
                      <option value="Pengobatan Gratis">
                        {"Pengobatan Gratis"}
                      </option>
                      <option value="Khitanan Massal">
                        {"Khitanan Massal"}
                      </option>
                      <option value="Kegiatan Senam Warga">
                        {"Kegiatan Senam Warga"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang Kesehatan"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang ===
                  "Bidang Kebersihan dan Lingkungan Hidup" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Pelaksanaan Jumat Bersih (Kerja Bhakti)">
                        {"Pelaksanaan Jumat Bersih (Kerja Bhakti)"}
                      </option>
                      <option value="Pengelolaan Sampah Mandiri">
                        {"Pengelolaan Sampah Mandiri"}
                      </option>
                      <option value="Pembuatan Taman Mandiri">
                        {"Pembuatan Taman Mandiri"}
                      </option>
                      <option value="Penanaman Pohon">
                        {"Penanaman Pohon"}
                      </option>
                      <option value="Pemberian Honor/ Upah Petugas Pengangkut Sampah">
                        {"Pemberian Honor/ Upah Petugas Pengangkut Sampah"}
                      </option>
                      <option value="lain">
                        {
                          "Kegiatan lainnya dibidang Kebersihan dan Lingkungan Hidup"
                        }
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Agama" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Operasional Pemeliharaan Rumah Ibadah">
                        {"Operasional Pemeliharaan Rumah Ibadah"}
                      </option>
                      <option value="Honor/ upah petugas kebersihan Rumah Ibadah">
                        {"Honor/ upah petugas kebersihan Rumah Ibadah"}
                      </option>
                      <option value="Pembangunan/ Pemeliharaan Rumah Ibadah">
                        {"Pembangunan/ Pemeliharaan Rumah Ibadah"}
                      </option>
                      <option value="Peringatan Hari Besar Keagamaan">
                        {"Peringatan Hari Besar Keagamaan"}
                      </option>

                      <option value="lain">
                        {"Kegiatan lainnya dibidang Agama"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Seni Budaya" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Pelestarian Seni Budaya Lokal">
                        {"Pelestarian Seni Budaya Lokal"}
                      </option>
                      <option value="Pelatihan Seni dan Budaya Lokal">
                        {"Pelatihan Seni dan Budaya Lokal"}
                      </option>
                      <option value="Pagelaran Seni dan Budaya">
                        {"Pagelaran Seni dan Budaya"}
                      </option>
                      <option value="Pembangunan/ Pemeliharaan Tempat Seni dan Budaya">
                        {"Pembangunan/ Pemeliharaan Tempat Seni dan Budaya"}
                      </option>

                      <option value="lain">
                        {"Kegiatan lainnya dibidang Seni dan Budaya"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Bidang Infrastruktur" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Perbaikan/ Pemeliharaan Jalan Lingkungan">
                        {"Perbaikan/ Pemeliharaan Jalan Lingkungan"}
                      </option>
                      <option
                        value="Perbaikan/
                      pemeliharaan gorong-gorong"
                      >
                        {"Perbaikan/ pemeliharaan gorong-gorong"}
                      </option>

                      <option value="Pembangunan sarana air bersih">
                        {"Pembangunan sarana air bersih"}
                      </option>
                      <option value="Pembangunan portal jalan lingkungan">
                        {"Pembangunan portal jalan lingkungan"}
                      </option>
                      <option value="Pemagaran lingkungan">
                        {"Pemagaran lingkungan"}
                      </option>
                      <option value="Pemasangan CCTV di Lingkungan">
                        {"Pemasangan CCTV di Lingkungan"}
                      </option>
                      <option value="Pembangunan/ Pemeliharaan Gapura">
                        {"Pembangunan/ Pemeliharaan Gapura"}
                      </option>
                      <option value="lain">
                        {"Kegiatan lainnya dibidang Infrastruktur Lingkungan"}
                      </option>
                    </Select>
                  </FormControl>
                )}
                {val.nama_bidang === "Hari Besar Nasional" && (
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                  >
                    <FormLabel component="legend">Pilih Kegiatan :</FormLabel>
                    <Select
                      native
                      value={val.nama_kegiatan}
                      onChange={updateField}
                      label="Kegiatan"
                      inputProps={{
                        name: "nama_kegiatan",
                        id: "nama_kegiatan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Peringatan Hari Kartini">
                        {"Peringatan Hari Kartini"}
                      </option>
                      <option value="Peringatan Hari Jadi Daerah">
                        {"Peringatan Hari Jadi Daerah"}
                      </option>
                      <option value="Peringatan Hari Kemerdekaan 17 Agustus 1945">
                        {"Peringatan Hari Kemerdekaan 17 Agustus 1945"}
                      </option>
                      <option value="Peringatan Sumpah Pemuda">
                        {"Peringatan Sumpah Pemuda"}
                      </option>
                    </Select>
                  </FormControl>
                )}

                {val.nama_kegiatan === "penguatan" && (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Pilih Kegiatan Spesifik :
                    </FormLabel>
                    <RadioGroup
                      aria-label="kegiatan"
                      name="subKegiatan"
                      value={subKegiatan}
                      onChange={updateSub}
                    >
                      <FormControlLabel
                        value="Honor Linmas Lingkup RW"
                        control={<Radio />}
                        label="Honor Linmas Lingkup RW"
                      />
                      <FormControlLabel
                        value="Kelengkapan Linmas RW"
                        control={<Radio />}
                        label="Kelengkapan Linmas RW"
                      />
                      <FormControlLabel
                        value="Operasional Linmas"
                        control={<Radio />}
                        label="Operasional Linmas"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                {val.nama_kegiatan === "lain" && (
                  <TextField
                    id="standard-full-width"
                    label="Input Nama Kegiatan"
                    style={{ margin: 8 }}
                    onChange={updateSub}
                    name="subKegiatan"
                    value={subKegiatan}
                    type="text"
                    placeholder="Kegiatan"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
                {val.nama_kegiatan && (
                  <React.Fragment>
                    <Box paddingTop="5px" />
                    <FormLabel component="legend">
                      Masukan Tanggal Kegiatan :
                    </FormLabel>
                    <DatePicker
                      onChange={onChangeDate}
                      value={date !== "" ? moment(date) : null}
                      style={{ width: "100%" }}
                    />
                    <Box paddingTop="5px" />
                    <FormLabel component="legend">
                      Masukan Jumlah Waktu Kegiatan :
                    </FormLabel>
                    <Input.Group compact style={{ display: "flex" }}>
                      {/* <InputNumber
                        style={{ flexGrow: 1, color: "black" }}
                        placeholder="Masukan Waktu"
                        onChange={(event) => {
                          console.log(event.target.value);
                          // setVal({ ...val, waktu: e.target.value });
                        }}
                        // name="waktu"
                        required
                        // value={val.waktu}
                      /> */}
                      <TextField
                        fullWidth
                        autoComplete="off"
                        label="Masukan waktu"
                        margin="dense"
                        name="waktu"
                        type="number"
                        inputProps={{
                          step: 1,
                        }}
                        onChange={updateField}
                        required
                        value={val.waktu}
                        variant="outlined"
                      />

                      <SelectAnt
                        onChange={selectSatuanWaktu}
                        defaultValue={"Kali"}
                        // value={val.satuan_waktu}
                        style={{ minWidth: "100px", paddingTop: "10px" }}
                      >
                        <Option value={"Kali"}>Kali</Option>
                        <Option value={"Jam"}>Jam</Option>
                        <Option value={"Hari"}>Hari</Option>
                        <Option value={"Minggu"}>Minggu</Option>
                        <Option value={"Bulan"}>Bulan</Option>
                        <Option value={"Tahun"}>Tahun</Option>
                      </SelectAnt>
                    </Input.Group>
                    <Box paddingTop="5px" />
                    <FormLabel component="legend">
                      Masukan Jumlah Barang/Orang :
                    </FormLabel>
                    <Input.Group compact style={{ display: "flex" }}>
                      <TextField
                        fullWidth
                        autoComplete="off"
                        label="Masukan Jumlah Barang/Orang"
                        margin="dense"
                        name="barang"
                        type="number"
                        inputProps={{
                          step: 1,
                        }}
                        onChange={updateField}
                        required
                        value={val.barang}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        autoComplete="off"
                        label="Masukan Satuan"
                        margin="dense"
                        name="satuan_barang"
                        type="text"
                        onChange={updateField}
                        required
                        value={val.satuan_barang}
                        variant="outlined"
                      />
                      {/* <InputNumber
                        style={{ flexGrow: 1, color: "black" }}
                        placeholder="Masukan Jumlah Barang/Orang"
                        onChange={(event) => {
                          console.log(event.currentTarget);
                          // setVal({ ...val, barang: event.target.value });
                        }}
                        required
                        defaultValue={val.barang}
                      />
                      <Input
                        style={{ minWidth: "0px" }}
                        placeholder="Satuan"
                        // defaultValue={1000}
                        onChange={(event) => {
                          setVal({ ...val, satuan_barang: event.target.value });
                        }}
                        required
                        defaultValue={val.satuan_barang}
                        // value={val.satuan_barang}
                      /> */}
                    </Input.Group>

                    <TextField
                      fullWidth
                      //   error={ref.pph}
                      //   helperText={ref.pph ? ref.message : ""}
                      //   inputRef={namaRef}
                      autoComplete="off"
                      label="Pembayaran per-Orang"
                      margin="dense"
                      name="pembayaran_per_orang"
                      type="number"
                      inputProps={{
                        step: 0.05,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">Rp.</InputAdornment>
                        ),
                      }}
                      onChange={updateField}
                      required
                      value={val.pembayaran_per_orang}
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      //   error={ref.pph}
                      //   helperText={ref.pph ? ref.message : ""}
                      //   inputRef={namaRef}
                      autoComplete="off"
                      label="Jumlah Orang Terlibat / Penerima Manfaat"
                      margin="dense"
                      name="jumlah_orang_terlibat"
                      type="number"
                      inputProps={{
                        step: 0.05,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Org</InputAdornment>
                        ),
                      }}
                      onChange={updateField}
                      required
                      value={val.jumlah_orang_terlibat}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Jumlah Biaya"
                      margin="dense"
                      name="jumlah_biaya"
                      type="number"
                      inputProps={{
                        step: 0.05,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">Rp.</InputAdornment>
                        ),
                      }}
                      onChange={updateField}
                      required
                      disabled
                      value={
                        parseInt(val.barang) *
                        parseInt(val.pembayaran_per_orang) *
                        parseInt(val.waktu)
                      }
                      variant="outlined"
                    />
                  </React.Fragment>
                )}
              </Grid>
              <Box paddingTop="15px" />
              <Grid item sm={6} xs={12}>
                <Paper>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={getInputName}
                    multiple
                  />
                  <label htmlFor="icon-button-file">
                    <Button
                      className={classes.btnFoto}
                      // variant="contained"
                      variant="outlined"
                      color="primary"
                      component="span"
                      endIcon={<PhotoCamera />}
                    >
                      Lampirkan Foto
                    </Button>
                  </label>

                  <Divider />
                  <List
                    component="nav"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      overflowX: "auto",
                    }}
                  >
                    {a && (
                      <Box padding="10px">
                        <Avatar
                          variant="rounded"
                          alt={a.name}
                          src={URL.createObjectURL(a)}
                          className={classes.large}
                        />
                      </Box>
                    )}
                    {b && (
                      <Box padding="10px">
                        <Avatar
                          variant="rounded"
                          alt={b.name}
                          src={URL.createObjectURL(b)}
                          className={classes.large}
                        />
                      </Box>
                    )}
                    {c && (
                      <Box padding="10px">
                        <Avatar
                          variant="rounded"
                          alt={c.name}
                          src={URL.createObjectURL(c)}
                          className={classes.large}
                        />
                      </Box>
                    )}
                    {d && (
                      <Box padding="10px">
                        <Avatar
                          variant="rounded"
                          alt={d.name}
                          src={URL.createObjectURL(d)}
                          className={classes.large}
                        />
                      </Box>
                    )}
                    {e && (
                      <Box padding="10px">
                        <Avatar
                          variant="rounded"
                          alt={e.name}
                          src={URL.createObjectURL(e)}
                          className={classes.large}
                        />
                      </Box>
                    )}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Box
              display="flex"
              justifyContent="flex-start"
              paddingLeft="12px"
              width="100%"
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                // onClick={onsubmit}
                className={classes.submit}
              >
                Simpan Kegiatan
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
};

export default FormInput;
