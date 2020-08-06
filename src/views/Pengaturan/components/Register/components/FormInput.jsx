import React from "react";
import Akun from "assets/img/akun.svg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Divider,
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import RWContext from "context/RWContext";
import AlertContext from "context/AlertContext";
import service from "service/kecamatanService";
import service2 from "service/kelurahanService";
import { makeStyles } from "@material-ui/core/styles";
import { register, registerUser } from "service/rwServices";

const useStyles = makeStyles((theme) => ({
  wrap: {
    maxWidth: "1200px",
    width: "100%",
    margin: 0,
    marginTop: "20px",
    [theme.breakpoints.down("md")]: {
      margin: "20px 20px 0 20px",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "20px 20px 0 20px",
    },
  },
  title: {
    paddingTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    padding: "0 24px 0 24px",
  },
}));

function FormInput() {
  const classes = useStyles();
  const [val, setVal] = React.useState({
    no_ktp: "",
    nama_rw: "",
    tgl_lahir: "",
    tempat_lahir: "",
    KecamatanId: "",
    KelurahanId: "",
    alamat: "",
    no_rw: "",
    email: "",
    no_hp: "",
    username: "",
    type_user: "RW",
    password: "",
    showPassword: false,
  });

  const context = React.useContext(RWContext);
  const [ref, setRef] = React.useState({
    no_ktp: "",
    message: "",
  });
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };
  const updatePassword = (e) => {
    if (val.password === val.password_confirm) {
      setRef({
        ...ref,
        password: false,
        password_confirm: false,
        message: "",
      });
    }

    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };
  const showPass = () => {
    setVal({
      ...val,
      showPassword: !val.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const open = React.useContext(AlertContext);

  const doSubmit = async (e) => {
    e.preventDefault();
    try {
      open.updateState(true, false, "success", "");
      const c = val.KelurahanId + "-rw-" + val.no_rw;
      const a = await register(val, c);

      open.updateState(false, true, "success", "membuat produk berhasil");
      console.log(open);
      setVal({
        no_ktp: "",
        nama_rw: "",
        tgl_lahir: "",
        tempat_lahir: "",
        KecamatanId: "",
        KelurahanId: "",
        alamat: "",
        no_rw: "",
        email: "",
        no_hp: "",
        username: "",
        type_user: "RW",
        password: "",
        showPassword: false,
      });
      context.updateState();
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
  const [data, setData] = React.useState([]);
  // const [data2, setData2] = React.useState([]);
  const getData = async () => {
    const data = await service.getData();
    // const data2 = await service2.getData();
    // console.log(data);
    setData(
      data.data
        ? data.data
        : {
            KecamatanId: "",
          }
    );
    // setLurah(
    //   data2.data
    //     ? data2.data
    //     : [
    //         {
    //           KecamatanId: "",
    //         },
    //       ]
    // );
  };
  const [lurah, setLurah] = React.useState([]);
  const updateKecamatan = async (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
    // const data = await service2.getData();

    // lurah.filter(e.target.value);
    const service = await service2.getKecamatan(e.target.value);
    setLurah(service.data);
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div>
        <Paper>
          <Box display="flex">
            <form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <div className={classes.title}>
                    <Avatar
                      src={Akun}
                      alt="gambar akun"
                      className={classes.large}
                    />
                    <Typography component="h1" variant="h4">
                      Pendaftaran RW
                    </Typography>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.no_ktp.replace(/[^0-9]/g, "")}
                    onChange={updateField}
                    fullWidth
                    label="NIK"
                    name="no_ktp"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.nama_rw
                      .replace(/[^a-zA-Z\s]/g, "")
                      .toLowerCase()}
                    onChange={updateField}
                    fullWidth
                    label="Nama Lengkap"
                    name="nama_rw"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.tempat_lahir
                      .replace(/[^a-zA-Z\s]/g, "")
                      .toLowerCase()}
                    onChange={updateField}
                    fullWidth
                    type="text"
                    label="Tempat Lahir"
                    name="tempat_lahir"
                  />
                  <Box marginTop="24px" />
                  <TextField
                    id="date"
                    label="Tanggal Lahir"
                    type="date"
                    fullWidth
                    name="tgl_lahir"
                    value={val.tgl_lahir}
                    defaultValue="2017-05-24"
                    onChange={updateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Box marginTop="24px" />
                  <FormControl
                    variant="outlined"
                    fullWidth
                    // margin="dense"
                    size="medium"
                  >
                    <InputLabel>Pilih Kecamatan :</InputLabel>
                    <Select
                      native
                      value={val.KecamatanId}
                      onChange={updateKecamatan}
                      label="Pilih Kecamatan"
                      inputProps={{
                        name: "KecamatanId",
                        id: "KecamatanId",
                      }}
                    >
                      <option aria-label="" value="" />
                      {data.map((datas, index) => (
                        <option value={datas.id} key={index}>
                          {datas.kecamatan}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <Box marginTop="8px" /> */}
                  <Box marginTop="24px" />
                  <FormControl
                    variant="outlined"
                    // margin="dense"
                    fullWidth
                    size="medium"
                  >
                    <InputLabel>Pilih Kelurahan :</InputLabel>
                    <Select
                      native
                      value={val.kelurahan}
                      onChange={updateField}
                      label="Pilih Kelurahan :"
                      inputProps={{
                        name: "KelurahanId",
                        id: "KelurahanId",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {lurah.map((datas, index) => (
                        <option value={datas.id} key={index}>
                          {datas.kelurahan}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Box marginTop="8px" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.alamat.replace(/[^a-zA-Z0-9\s]/g, "")}
                    onChange={updateField}
                    fullWidth
                    name="alamat"
                    label="Alamat"
                    type="text"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.no_rw.replace(/[^0-9]/g, "")}
                    onChange={updateField}
                    fullWidth
                    name="no_rw"
                    label="NO.RW"
                    type="text"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.email.trim()}
                    onChange={updateField}
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.no_hp.replace(/[^0-9]/g, "")}
                    onChange={updateField}
                    fullWidth
                    name="no_hp"
                    label="No Handphone"
                    type="text"
                  />
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    disabled
                    value={val.KelurahanId + "-RW-" + val.no_rw}
                    onChange={updateField}
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                  />
                  <Box marginTop="16px" />
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      // inputRef={passRef}
                      error={ref.password}
                      type={val.showPassword ? "text" : "password"}
                      value={val.password.trim()}
                      name="password"
                      onChange={updatePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={showPass}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {val.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    <FormHelperText>
                      {ref.password ? ref.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Divider />
                <Grid md="6" xs="12">
                  <Box padding="0 13px 24px 13px">
                    <Button
                      // disabled={validateButton()}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={doSubmit}
                      // className={validateButton() ? classes.disabled : classes.form}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </div>
    </React.Fragment>
  );
}
export default FormInput;
