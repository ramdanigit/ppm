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
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import AlertContext from "context/AlertContext";
import service from "service/kecamatanService";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "service/rwServices";

const useStyles = makeStyles((theme) => ({
  wrap: {
    maxWidth: "1200px",
    width: "100%",
    margin: 0,
    marginTop: "135px",
    [theme.breakpoints.down("md")]: {
      margin: "135px 20px 0 20px",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "135px 20px 0 20px",
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

function Register() {
  const classes = useStyles();
  const [val, setVal] = React.useState({
    nama_rw: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    kode_pos: "",
    no_rw: "",
    email: "",
    no_tlp: "",
    password: "",
    password_confirm: "",
    showPassword: false,
    showPasswordConfirm: false,
  });
  const passRef = React.useRef();

  const [ref, setRef] = React.useState({
    nama_rw: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    kode_pos: "",
    no_rw: "",
    email: "",
    no_tlp: "",
    password: "",
    password_confirm: "",
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

  const showPassConfirn = () => {
    setVal({
      ...val,
      showPasswordConfirm: !val.showPasswordConfirm,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const open = React.useContext(AlertContext);

  const doSubmit = async (e) => {
    e.preventDefault();
    if (val.password !== val.password_confirm) {
      // passRef.current.focus();
      setRef({
        ...ref,
        password: true,
        password_confirm: true,
        message: "Password tidak sama!!",
      });

      return true;
    }
    try {
      open.updateState(true, false, "success", "");

      await register(val);

      open.updateState(false, true, "success", "membuat produk berhasil");
      console.log(open);
      setVal({
        nama_rw: "",
        kecamatan: "",
        kelurahan: "",
        alamat: "",
        kode_pos: "",
        no_rw: "",
        email: "",
        no_tlp: "",
        password: "",
        password_confirm: "",
        showPassword: false,
        showPasswordConfirm: false,
      });
    } catch (ex) {
      console.log(ex);
      if (!ex.response) {
        open.updateState(false, true, "error", "Error 404");
        return true;
      }

      if (ex.response.data === "Kecamatan sebelumnya sudah ada") {
        // kecRef.current.focus();
        // setRef({
        //   ...ref,
        //   kecamatan: true,
        //   message: "Kecamatan sebelumnya sudah ada ",
        // });
      }
      open.updateState(false, true, "error", ex.response.data);
    }
  };
  const [data, setData] = React.useState([]);
  const getData = async () => {
    const data = await service.getData();
    setData(
      data.data
        ? data.data
        : {
            kecamatan: "",
          }
    );
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.wrap}>
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
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.nama_rw
                      .replace(/[^a-zA-Z0-9\s]/g, "")
                      .toUpperCase()}
                    onChange={updateField}
                    fullWidth
                    label="Nama Lengkap"
                    name="nama_rw"
                    autoFocus
                  />
                  <Box marginTop="16px" />
                  <FormControl
                    variant="outlined"
                    fullWidth
                    // margin="dense"
                    size="medium"
                  >
                    <InputLabel>Pilih Kecamatan :</InputLabel>
                    <Select
                      native
                      value={val.kecamatan}
                      onChange={updateField}
                      label="Bidang"
                      inputProps={{
                        name: "kecamatan",
                        id: "kecamatan",
                      }}
                    >
                      <option aria-label="" value="" />
                      {data.map((datas, index) => (
                        <option value={datas.kecamatan} key={index}>
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
                      label="Bidang"
                      inputProps={{
                        name: "kelurahan",
                        id: "kelurahan",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Buahbatu">{"Buahbatu"}</option>
                      <option value="Rancasari">{"Rancasari"}</option>
                    </Select>
                  </FormControl>
                  <Box marginTop="8px" />
                  <TextField
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
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.kode_pos.replace(/[^0-9]/g, "")}
                    onChange={updateField}
                    fullWidth
                    name="kode_pos"
                    label="Kode POS"
                    type="text"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.no_rw.replace(/[^a-zA-Z0-9\s]/g, "")}
                    onChange={updateField}
                    fullWidth
                    name="no_rw"
                    label="NO.RW"
                    type="text"
                  />
                  <TextField
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
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    value={val.no_tlp.replace(/[^0-9]/g, "").trim()}
                    onChange={updateField}
                    fullWidth
                    name="no_tlp"
                    label="No Handphone"
                    type="text"
                  />
                  <Box marginTop="16px" />
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      inputRef={passRef}
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
                  <Box marginTop="24px" />
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password_confirm">Password</InputLabel>
                    <OutlinedInput
                      id="password_confirm"
                      error={ref.password_confirm}
                      type={val.showPasswordConfirm ? "text" : "password"}
                      value={val.password_confirm.trim()}
                      name="password_confirm"
                      onChange={updatePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={showPassConfirn}
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
                      {ref.password_confirm ? ref.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
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
export default Register;
