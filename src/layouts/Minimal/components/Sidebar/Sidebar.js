import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import StorageIcon from "@material-ui/icons/Storage";
import GavelIcon from "@material-ui/icons/Gavel";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import RestoreIcon from "@material-ui/icons/Restore";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Profile, SidebarNav, SidebarExpand, ItemExpand } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(0),
  },
  Item: {
    marginBottom: theme.spacing(0),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Home",
      href: "/landing",
      icon: <HomeIcon />,
    },
    {
      title: "Dokumen",
      href: "/landing",
      icon: <AssignmentIcon />,
    },
    {
      title: "Masuk",
      href: "/login",
      icon: <ExitToAppIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        {/* <Profile /> */}
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
