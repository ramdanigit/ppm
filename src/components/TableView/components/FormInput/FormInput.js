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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import masterService from "services/produkAsuransiService";
import brokerService from "services/masterBrokerService";
import produkService from "services/produkService";
import ProdukAsuransiContext from "context/ProdukAsuransiContext";
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
  const data = React.useContext(ProdukAsuransiContext);
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
    kode_broker: "",
    kode_produk: "",
    tenor: "",
    umur: "",
    rate: "",
    okupasi: "",
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

      open.updateState(false, true, "success", "membuat produk berhasil");

      setVal({
        kode_broker: "",
        kode_produk: "",
        tenor: "",
        umur: "",
        rate: "",
        okupasi: "",
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
        <CardHeader subheader="Isi dengan benar" title="Input Produk Satuan" />
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={ref.okupasi}
                autoComplete="off"
                helperText={ref.okupasi ? ref.message : ""}
                inputRef={namaRef}
                label="Okupasi"
                margin="dense"
                name="okupasi"
                onChange={updateField}
                required
                value={val.okupasi.replace(/[^a-z]/g, "")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                error={ref.tenor}
                autoComplete="off"
                helperText={ref.tenor ? ref.message : ""}
                inputRef={namaRef}
                label="Tenor"
                margin="dense"
                name="tenor"
                onChange={updateField}
                required
                value={val.tenor.replace(/[^1-9]/g, "")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                autoComplete="off"
                error={ref.umur}
                helperText={ref.umur ? ref.message : ""}
                inputRef={namaRef}
                label="Umur"
                margin="dense"
                name="umur"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Bln</InputAdornment>
                  ),
                }}
                onChange={updateField}
                required
                value={val.umur.replace(/[^1-9]/g, "")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                error={ref.rate}
                helperText={ref.rate ? ref.message : ""}
                inputRef={namaRef}
                autoComplete="off"
                label="Rate"
                margin="dense"
                name="rate"
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
                value={val.rate.replace(/[^0-9.]/g, "")}
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
