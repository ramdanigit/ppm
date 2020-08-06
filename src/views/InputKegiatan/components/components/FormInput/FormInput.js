import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Box,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import masterService from "services/masterAsuransiService";
import brokerService from "services/masterBrokerService";
import produkService from "services/produkService";
import MasterAsuransiContext from "context/MasterAsuransiContext";
import AlertContext from "context/AlertContext";

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
  select: {
    zIndex: 30000,
  },
}));

const FormInput = () => {
  const classes = useStyles();
  const data = React.useContext(MasterAsuransiContext);
  const open = React.useContext(AlertContext);

  const kodeRef = React.useRef();
  const namaRef = React.useRef();

  const [ref, setRef] = useState({
    kode_broker: false,
    kode_produk: false,
    tenor: false,
    umur: false,
    rate: false,
    okupasi: false,
    message: "",
  });
  const [val, setVal] = useState({
    kode_asuransi: "",
    nama_asuransi: "",
    polis_induk: "",
    diskon: "",
    ppn_premi: "",
    pph_premi: "",
    email: "",
    kode_broker: "",
    kode_produk: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };
  const doSubmit = async () => {
    // if (val.kode_broker === "") {
    //   kodeRef.current.focus();
    //   setRef({
    //     ...ref,
    //     kode_broker: true,
    //     kode_produk: false,
    //     tenor: false,
    //     umur: false,
    //     rate: false,
    //     okupasi: false,
    //     message: "Pilih Kode",
    //   });
    //   return true;
    // }

    try {
      open.updateState(true, false, "success", "");

      await masterService.register(val);
      console.log("berhasil");
      open.updateState(false, true, "success", "membuat produk berhasil");

      setVal({
        kode_asuransi: "",
        nama_asuransi: "",
        polis_induk: "",
        diskon: "",
        ppn_premi: "",
        pph_premi: "",
        email: "",
        kode_broker: "",
        kode_produk: "",
      });

      data.updateState();
    } catch (ex) {
      console.log(ex);
      if (!ex.response) {
        open.updateState(false, true, "error", "Error 404");
        return true;
      }

      if (ex.response.data === "kode has alredy exist") {
        kodeRef.current.focus();
        setRef({ ...ref, kode_broker: true, message: "Kode sudah ada " });
      }
      open.updateState(false, true, "error", ex.response.data);
    }
  };
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };
  const [broker, setBroker] = React.useState([]);
  const getBroker = async () => {
    const master = await brokerService.getMaster();
    setBroker(master ? master.data : [{ kode_broker: "", nama: "" }]);
  };
  const [produk, setProduk] = React.useState([]);
  const getProduk = async () => {
    const master = await produkService.getMaster();
    setProduk(master ? master.data : [{ kode_produk: "", nama_produk: "" }]);
  };
  const rateChange = (e) => {
    // const str = numeral(e.target.value).format("0.00");
    const str = e.target.value;
    setVal({ ...val, [e.target.name]: str });
  };

  React.useEffect(() => {
    getBroker();
    getProduk();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CardHeader
          subheader="Isi dengan benar"
          title="Input Master Asuransi"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl
                innerRef={kodeRef}
                variant="outlined"
                margin="dense"
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Pilih Broker
                </InputLabel>
                <Select
                  native
                  value={val.kode_broker}
                  onChange={updateField}
                  label="Jenis Produk"
                  inputProps={{
                    name: "kode_broker",
                    id: "broker",
                  }}
                >
                  <option aria-label="None" value="" />
                  {broker
                    .map((value, index) => (
                      <option value={value.kode_broker} key={value.kode_broker}>
                        {value.kode_broker + " - " + value.nama}
                      </option>
                    ))
                    .sort()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Pilih Jenis Produk
                </InputLabel>
                <Select
                  native
                  value={val.kode_produk}
                  onChange={updateField}
                  label="Jenis Produk"
                  inputProps={{
                    name: "kode_produk",
                    id: "produk",
                  }}
                >
                  <option aria-label="None" value="" />
                  {produk.map((value, index) => (
                    <option value={value.kode_produk} key={value.kode_produk}>
                      {value.kode_produk + " - " + value.nama_produk}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={ref.kode_asuransi}
                autoComplete="off"
                helperText={ref.kode_asuransi ? ref.message : ""}
                inputRef={namaRef}
                label="Kode Asuransi"
                margin="dense"
                name="kode_asuransi"
                onChange={updateField}
                type="text"
                required
                value={val.kode_asuransi
                  .replace(/[^A-Za-z0-9-]/g, "")
                  .trim()
                  .toUpperCase()}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={ref.nama_asuransi}
                autoComplete="off"
                helperText={ref.nama_asuransi ? ref.message : ""}
                inputRef={namaRef}
                label="Nama asuransi"
                type="text"
                margin="dense"
                name="nama_asuransi"
                onChange={updateField}
                required
                value={val.nama_asuransi
                  .replace(/[^A-Za-z1-9\s]/g, "")
                  .toString()}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={ref.polis_induk}
                autoComplete="off"
                helperText={ref.polis_induk ? ref.message : ""}
                inputRef={namaRef}
                label="Polis Induk"
                margin="dense"
                name="polis_induk"
                onChange={updateField}
                type="text"
                required
                value={val.polis_induk
                  .replace(/[^A-Za-z1-9\s]/g, "")
                  .toString()}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={ref.email}
                helperText={ref.email ? ref.message : ""}
                inputRef={namaRef}
                autoComplete="off"
                label="Email"
                margin="dense"
                name="email"
                type="email"
                onChange={updateField}
                required
                value={val.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                autoComplete="off"
                error={ref.diskon}
                helperText={ref.diskon ? ref.message : ""}
                inputRef={namaRef}
                label="Diskon"
                margin="dense"
                name="diskon"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onChange={updateField}
                required
                value={val.diskon.replace(/[^0-9.]/g, "").toString()}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                error={ref.ppn_premi}
                helperText={ref.ppn_premi ? ref.message : ""}
                inputRef={namaRef}
                autoComplete="off"
                label="Ppn Premi"
                margin="dense"
                name="ppn_premi"
                type="number"
                inputProps={{
                  step: 0.05,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onChange={updateField}
                required
                value={val.ppn_premi.replace(/[^0-9.]/g, "").toString()}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                error={ref.pph_premi}
                helperText={ref.pph_premi ? ref.message : ""}
                inputRef={namaRef}
                autoComplete="off"
                label="Pph Premi"
                margin="dense"
                name="pph_premi"
                type="number"
                inputProps={{
                  step: 0.05,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onChange={rateChange}
                required
                value={val.pph_premi.replace(/[^0-9.]/g, "").toString()}
                variant="outlined"
              />
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
              className={classes.submit}
            >
              Save details
            </Button>
          </Box>
        </CardActions>
      </form>
    </Card>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
};

export default FormInput;
