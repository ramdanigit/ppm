import React from "react";
import Akun from "assets/img/akun.svg";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  // TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  Grid,
} from "@material-ui/core";
// import RWContext from "context/RWContext";
import AlertContext from "context/AlertContext";
import service from "service/upmService";
// import service2 from "service/kelurahanService";
import { makeStyles } from "@material-ui/core/styles";
// import { register, registerUser } from "service/rwServices";

const useStyles = makeStyles((theme) => ({
  wrap: {
    // maxWidth: "1200px",
    // width: "100%",
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

function Upm() {
  const classes = useStyles();
  const [val, setVal] = React.useState({ upm: "" });
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  const open = React.useContext(AlertContext);

  const doSubmit = async (e) => {
    e.preventDefault();
    try {
      //   console.log(val)
      open.updateState(true, false, "success", "");

      const a = await service.updateData(val);
      console.log(a);
      //   const c = val.kelurahan + "-RW-" + val.no_rw;
      //   await registerUser(val, c, a.data.id);

      open.updateState(false, true, "success", "memngubah UPM berhasil");
      //   console.log(open);
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

  const getData = async () => {
    const data = await service.getData();
    // console.log(data.data[0]);
    setVal(data.data[0]);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.wrap}>
        <Grid container>
          <Grid item xs={6}>
            <Paper>
              <Box display="flex">
                <form className={classes.form}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div className={classes.title}>
                        <Avatar
                          src={Akun}
                          alt="gambar akun"
                          className={classes.large}
                        />
                        <Typography component="h1" variant="h4">
                          Mengubah UPM(Upah Minimum)
                        </Typography>
                      </div>
                      <Box paddingTop="25px 0 0 0" />
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="UPM">UPM</InputLabel>
                        <OutlinedInput
                          id="password"
                          required
                          type="number"
                          value={val.upm.toString().replace(/[^0-9]/g, "")}
                          name="upm"
                          onChange={updateField}
                          startAdornment={
                            <InputAdornment position="end">Rp.</InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>
                      <Box paddingTop="25px 0 0 0" />
                      <Box padding="0 13px 24px 13px">
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={doSubmit}
                        >
                          Ubah
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
export default Upm;
