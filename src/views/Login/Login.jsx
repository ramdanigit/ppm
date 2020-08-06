import React from "react";
import Akun from "assets/img/akun.svg";
import {
  Button,
  Paper,
  TextField,
  Container,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import auth from "service/authService";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "110px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  active: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  disabled: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(45deg, #E0E0E0 30%, #E0E0E0 90%)",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  wrap: {
    padding: "50px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Login() {
  const classes = useStyles();

  const [val, setVal] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };
  const doSubmit = async () => {
    try {
      const response = await auth.login(val);
      window.location = "/login";
      auth.loginWithJwt(response.headers["x-auth-token"]);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("error");
      }
    }
  };

  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  if (auth.getCurrentUser()) return <Redirect to="/welcome" />;
  // if (authLurah.getCurrentUser()) return <Redirect to="/pengaturan" />;
  // if (authLurah.getCurrentUser()) return <Redirect to="/pengaturan" />;
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          {/* <img src={Logo} alt="logo" /> */}
          <div className={classes.wrap}>
            <div className={classes.title}>
              <Avatar src={Akun} alt="gambar akun" className={classes.large} />

              <Typography component="h1" variant="h4">
                Masuk Ke Aplikasi
              </Typography>
            </div>

            <form onSubmit={handleSubmit}>
              <Box marginTop="24px" />
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                value={val.username.trim()}
                onChange={updateField}
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="off"
              />
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                value={val.password.trim()}
                onChange={updateField}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Sign In
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
export default Login;
