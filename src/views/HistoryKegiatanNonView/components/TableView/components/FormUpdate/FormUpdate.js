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
import "./FormUpdate.css";

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
            <div class="invoice-box">
              <div class="appbar">
                <img src="./logo.svg" alt="logo" width="100%" class="logo" />
                <h3 class="title">
                  Partisipasi Masyarakat Dalam Pembangunan Fisik
                </h3>
              </div>
              <div class="divider"></div>
              <table style={{ width: "100%", paddingTop: "10px" }}>
                <tr>
                  <td colspan="3" class="table-title">
                    Data
                  </td>
                </tr>
                <tr>
                  <td class="th">RW</td>
                  <td class="colon">:</td>
                  <td class="isi">{val.no_rw}</td>
                </tr>
                <tr>
                  <td class="th">Kelurahan/desa</td>
                  <td class="colon">:</td>
                  <td class="isi">{val.RW.Kelurahan.kelurahan}</td>
                </tr>
                <tr>
                  <td class="th">Kecamatan</td>
                  <td class="colon">:</td>
                  <td class="isi">${val.RW.Kecamatan.kecamatan}</td>
                </tr>
                <tr>
                  <td class="th">Kota/Kabupaten</td>
                  <td class="colon">:</td>
                  <td class="isi">${val.kota}</td>
                </tr>
                <tr>
                  <td class="th">Bulan</td>
                  <td class="colon">:</td>
                  <td class="isi">${val.bulan}</td>
                </tr>
                <tr>
                  <td class="th">Tahun</td>
                  <td class="colon">:</td>
                  <td class="isi">${val.tahun}</td>
                </tr>
              </table>
              <div class="divider"></div>
              <table style={{ width: "100%" }} class="table-kegiatan p-10">
                <tr class="table-kegiatan">
                  <td class="table-kegiatan" colspan="9">
                    {val.nama_bidang}
                  </td>
                </tr>
                <tr class="table-kegiatan">
                  <th class="table-kegiatan" rowspan="2">
                    Uraian
                  </th>
                  <th class="table-kegiatan" colspan="4">
                    Tingkat Kehadiran
                  </th>
                  <th class="table-kegiatan" rowspan="2">
                    Presentase (RP.)
                  </th>
                  <th class="table-kegiatan" rowspan="2">
                    IHNK (RP.)
                  </th>
                  <th class="table-kegiatan" rowspan="2">
                    IPMDP
                  </th>
                  <th class="table-kegiatan" rowspan="2">
                    Partisipasi Masyarakat
                  </th>
                </tr>
                <tr class="table-kegiatan">
                  <td class="table-kegiatan" colspan="2">
                    diUndang
                  </td>
                  <td class="table-kegiatan" colspan="2">
                    Hadir
                  </td>
                </tr>

                <tr class="table-kegiatan">
                  <td class="table-kegiatan">{val.uraian_kegiatan}</td>
                  <td class="table-kegiatan">{val.jumlah_orang_diundang}</td>
                  <td class="table-kegiatan">org</td>
                  <td class="table-kegiatan">{val.jumlah_orang_hadir}</td>
                  <td class="table-kegiatan">org</td>
                  <td class="table-kegiatan">{val.presentase}</td>
                  <td class="table-kegiatan">{val.IHNK}</td>
                  <td class="table-kegiatan">{val.IPMDP}</td>
                  <td class="table-kegiatan">{val.partisipasi_masyarakat}</td>
                </tr>
              </table>
            </div>
            <Divider />
            Foto Kegiatan
            {val.dokumen1 && (
              <a
                href={`http://192.168.0.100:3900/img/dokumen/resized/${val.dokumen1}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dokumen 1
              </a>
            )}
            <br />
            {val.dokumen2 && (
              <a
                href={`http://localhost:3900/img/dokumen/resized/${val.dokumen2}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dokumen 2
              </a>
            )}
            <br />
            {val.dokumen3 && (
              <a
                href={`http://localhost:3900/img/dokumen/resized/${val.dokumen3}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dokumen 3
              </a>
            )}
            <br />
            {val.dokumen4 && (
              <a
                href={`http://localhost:3900/img/dokumen/resized/${val.dokumen4}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dokumen 4
              </a>
            )}
            <br />
            {val.dokumen5 && (
              <a
                href={`http://localhost:3900/img/dokumen/resized/${val.dokumen5}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dokumen 5
              </a>
            )}
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
