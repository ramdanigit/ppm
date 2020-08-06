import React from "react";
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
  IconButton,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import KelurahanContext from "context/KelurahanContext";
import AlertContext from "context/AlertContext";
import { register } from "service/kelurahanService";
import service from "service/kecamatanService";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
    paddingBottom: "30px",
  },
}));

const FormInput = () => {
  const classes = useStyles();
  const open = React.useContext(AlertContext);
  const context = React.useContext(KelurahanContext);
  const [val, setVal] = React.useState({
    kelurahan: "",
    KecamatanId: "",
    username: "",
    type_user: "lurah",
    password: "",
    showPassword: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    // console.log(val);
    try {
      open.updateState(true, false, "success", "");
      const c = "kel-" + val.kelurahan;
      await register(val, c);
      // console.log(a.data.id);

      // await registerUser(val, c, a.data.id);

      open.updateState(false, true, "success", "membuat kelurahan berhasil");

      setVal({
        kelurahan: "",
        KecamatanId: "",
        username: "",
        type_user: "",
        password: "",
      });

      context.updateState();
    } catch (ex) {
      // console.log(ex);
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
            kelurahan: "",
            KecamatanId: "",
            password: "",
          }
    );
  };
  const showPass = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className={classes.wrap}>
      <Card>
        <form onSubmit={doSubmit}>
          <CardHeader
            action={
              <IconButton aria-label="expand">
                <OpenInNewIcon />
              </IconButton>
            }
            subheader="Isi dengan benar"
            title="Form Input Kelurahan"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth size="medium">
                  <InputLabel component="legend">Pilih Kecamatan :</InputLabel>
                  <Select
                    native
                    required
                    value={val.KecamatanId}
                    onChange={updateField}
                    label="Kegiatan"
                    inputProps={{
                      name: "KecamatanId",
                      id: "kecamatan",
                    }}
                  >
                    <option aria-label="None" value="" />
                    {data.map((datas, index) => (
                      <option value={datas.id}>{datas.kecamatan}</option>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  required
                  color="primary"
                  value={val.kelurahan.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Nama Kelurahan"
                  name="kelurahan"
                  autoFocus
                />
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  required
                  disabled
                  color="primary"
                  value={"kel-" + val.kelurahan.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Username"
                  name="username"
                  autoFocus
                />
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={val.password.trim()}
                    name="password"
                    onChange={updateField}
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
                </FormControl>
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
                Simpan Kelurahan
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
