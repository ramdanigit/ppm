import React from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "assets/img/hero.png";
import KegiatanContext from "context/KegiatanContext";
import AlertContext from "context/AlertContext";
import PrintIcon from "@material-ui/icons/Print";
import upmService from "service/upmService";
import { updateData } from "service/kegiatanService";
import { saveAs } from "file-saver";
import laporanService from "service/laporanRW";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  btnGroup: {
    display: "flex",
  },
  w90: {
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  w10: {
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
    paddingBottom: "30px",
  },
}));

const Test = () => {
  return (
    <div>
      <Typography>sdaddsadsadas</Typography>
      <table style={{ width: "100%" }}>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
      </table>
    </div>
  );
};

const FormInput = (props) => {
  const classes = useStyles();
  const open = React.useContext(AlertContext);
  const context = React.useContext(KegiatanContext);
  const [val, setVal] = React.useState(props.data);
  const kecRef = React.useRef();
  // console.log(val);
  const ref = React.createRef();
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    if (!val.kecamatan) {
      kecRef.current.focus();
      // setRef({
      //   ...ref,
      //   kecamatan: true,
      //   message: "Isi Kecamatan!!",
      // });

      return true;
    }
    try {
      open.updateState(true, false, "success", "");

      await updateData(val);

      open.updateState(false, true, "success", "membuat produk berhasil");

      context.updateState();
    } catch (ex) {
      console.log(ex);
      if (!ex.response) {
        open.updateState(false, true, "error", "Error 404");
        return true;
      }

      if (ex.response.data === "Kecamatan sebelumnya sudah ada") {
        kecRef.current.focus();
        // setRef({
        //   ...ref,
        //   kecamatan: true,
        //   message: "Kecamatan sebelumnya sudah ada ",
        // });
      }
      open.updateState(false, true, "error", ex.response.data);
    }
  };
  const [dataUpm, setDataUpm] = React.useState("");
  const getUpm = async () => {
    const upm = await upmService.getData();
    setDataUpm(upm.data[0].upm);
  };
  console.log(val);
  const creatPDF = async () => {
    const state = {
      rw: val.RW.nama_rw,
      kelurahan: val.RW.Kelurahan.kelurahan,
      kecamatan: val.RW.Kecamatan.kecamatan,
      kota: val.kota,
      bulan: val.bulan,
      tahun: val.tahun,
      bidang: val.nama_bidang,
      kegiatan: val.nama_kegiatan,
      datang: val.jumlah_orang_diundang,
      hadir: val.jumlah_orang_hadir,
      anggaran: val.anggaran,
      IHNK: val.IHNK,
      IPMDP: val.IPMDP,
      partisipasi: val.partisipasi_masyarakat,
    };
    open.updateState(true, false, "success", "");
    axios
      .post("http://localhost:3900/api/laporan-rw-non/create-pdf", state)
      .then(() =>
        axios.get("http://localhost:3900/api/laporan-rw-non/pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
    open.updateState(false, true, "info", "tunggu laporan akan di unduh");
    // const a = await laporanService.createPdf(state);
    // console.log(a);
    // const laporan = await laporanService.getPdf();
    // const pdfBlob = new Blob([laporan.data], { type: "application/pdf" });
    // console.log(laporan);
    // saveAs(pdfBlob, "newPdf.pdf");
    // const string = renderToString(<Test />);
    // const pdf = new jsPDF();
    // pdf.fromHTML(string);
    // pdf.save("pdf");
  };
  React.useEffect(() => {
    getUpm();
  });

  return (
    <div className={classes.wrap} id="dfdiv">
      <Card>
        <form onSubmit={doSubmit}>
          <CardHeader
            action={
              <IconButton aria-label="expand" onClick={creatPDF}>
                <PrintIcon />
              </IconButton>
            }
            title="Data Riwayat"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={12}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.RW.no_ktp.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="NIK"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.RW.nama_rw.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Nama RW"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.RW.no_rw.toString().toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="NO RW"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.RW.Kelurahan.kelurahan.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Kelurahan"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.bulan}
                  onChange={updateField}
                  fullWidth
                  label="Bulan"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.tahun}
                  onChange={updateField}
                  fullWidth
                  label="Tahun"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.nama_bidang}
                  onChange={updateField}
                  fullWidth
                  label="Nama Bidang"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.nama_kegiatan}
                  onChange={updateField}
                  fullWidth
                  label="Nama Kegiatan"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.jumlah_orang + " /org"}
                  onChange={updateField}
                  fullWidth
                  label="Jumlah Orang"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.waktu + " /bln"}
                  onChange={updateField}
                  fullWidth
                  label="Waktu"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.jumlah_orang_terlibat + " /org"}
                  onChange={updateField}
                  fullWidth
                  label="Jumlah Orang Terlibat"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={"Rp. " + val.pembayaran_per_orang}
                  onChange={updateField}
                  fullWidth
                  label="Pembayaran per-orang"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={"Rp. " + val.jumlah_biaya}
                  onChange={updateField}
                  fullWidth
                  label="Jumlah Biaya"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={"Rp. " + parseInt(dataUpm) / 25}
                  onChange={updateField}
                  fullWidth
                  label="IHNK"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  inputRef={kecRef}
                  disabled
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={"Rp. " + parseInt(dataUpm) / 25}
                  onChange={updateField}
                  fullWidth
                  label="IPMDP"
                  name="kecamatan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                Foto Kegiatan
                <Divider />
                {val.dokumen1 && (
                  <a
                    href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen1}`}
                    target="_blank"
                  >
                    Dokumen 1
                  </a>
                )}
                <br />
                {val.dokumen2 && (
                  <a
                    href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen2}`}
                    target="_blank"
                  >
                    Dokumen 2
                  </a>
                )}
                <br />
                {val.dokumen3 && (
                  <a
                    href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen3}`}
                    target="_blank"
                  >
                    Dokumen 3
                  </a>
                )}
                <br />
                {val.dokumen4 && (
                  <a
                    href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen4}`}
                    target="_blank"
                  >
                    Dokumen 4
                  </a>
                )}
                <br />
                {val.dokumen5 && (
                  <a
                    href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen5}`}
                    target="_blank"
                  >
                    Dokumen 5
                  </a>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </form>
      </Card>
    </div>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
};

export default FormInput;
