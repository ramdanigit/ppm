import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Logo from "assets/img/logo.svg";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
  },
  logo: {
    backgroundColor: "#FFFFFF",
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Avatar variant="rounded" className={classes.logo}>
            <img alt="Logo" src={Logo} width="30px" height="30px" />
          </Avatar>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
