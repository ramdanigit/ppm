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
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Box,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import KecamatanContext from "context/KecamatanContext";
import AlertContext from "context/AlertContext";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { updateData } from "service/kecamatanService";

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

const FormUpdate = (props) => {
  const classes = useStyles();
  const open = React.useContext(AlertContext);
  const context = React.useContext(KecamatanContext);
  const [val, setVal] = React.useState(props.data);
  const kecRef = React.useRef();

  const [ref, setRef] = React.useState({
    kecamatan: "",
    message: "",
  });
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
      setRef({
        ...ref,
        kecamatan: true,
        message: "Isi Kecamatan!!",
      });

      return true;
    }
    try {
      open.updateState(true, false, "success", "");
      const kec = "kec-" + val.kecamatan;
      console.log(val);
      await updateData(val, kec);

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
        setRef({
          ...ref,
          kecamatan: true,
          message: "Kecamatan sebelumnya sudah ada ",
        });
      }
      open.updateState(false, true, "error", ex.response.data);
    }
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
            title="Form Input Kecamatan"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="off"
                  inputRef={kecRef}
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={val.kecamatan
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Nama Kecamatan"
                  name="kecamatan"
                  autoFocus
                />
                <TextField
                  disabled
                  inputRef={kecRef}
                  autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={"kec-" + val.kecamatan.toLowerCase()}
                  onChange={updateField}
                  fullWidth
                  label="Username"
                  name="username"
                  autoFocus
                />
                <Box paddingTop="16px" />
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={val.showPassword ? "text" : "password"}
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
                  <FormHelperText>
                    {ref.password ? ref.message : ""}
                  </FormHelperText>
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
                Simpan Kecamatan
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

FormUpdate.propTypes = {
  className: PropTypes.string,
};

export default FormUpdate;
