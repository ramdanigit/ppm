import React from "react";
import Logo from "assets/img/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "1px 2px 26px 7px rgba(217,210,217,1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
    marginLeft: "5px",
  },
  container: {
    maxWidth: "1200px",
    // minHeight: "50px",
    margin: "13px 0",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    [theme.breakpoints.down("md")]: {
      padding: "15px 15px",
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
  },
  btnMenu: {
    marginRight: "5px",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const active = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1,
    window.location.href.length
  );
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.container}>
          <img src={Logo} alt="logo" width="50px" heigth="50px" />
          <Typography variant="h5" className={classes.title}>
            <span>Partisipasi Masyarakat</span>
            <br />
            <span>Kota Bandung</span>
          </Typography>
          <Hidden xsDown>
            <Box visibility={active === "login" ? "hidden" : "visible"}>
              <Button
                color="default"
                href="/landing"
                // startIcon={<InputIcon />}
                className={classes.btnMenu}
              >
                Home
              </Button>

              <Button
                color="default"
                // startIcon={<InputIcon />}

                className={classes.btnMenu}
              >
                Dokumen
              </Button>

              <Button
                color="inherit"
                // endIcon={<InputIcon />}
                className={classes.btn}
                href="/login"
              >
                Masuk
              </Button>
            </Box>
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={props.sidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
export default NavBar;
