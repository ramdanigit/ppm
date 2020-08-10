import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer, List, ListItem, Button } from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import RestorePageIcon from "@material-ui/icons/RestorePage";

import AssignmentIcon from "@material-ui/icons/Assignment";
import auth from "service/authService";
import RestoreIcon from "@material-ui/icons/Restore";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import { Profile, SidebarItem } from "./components";

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
  const user = auth.getCurrentUser();
  // console.log(user);
  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Input Kegiatan Non Fisik",
      href: "/input-kegiatan-non-fisik",
      icon: <AssignmentIcon />,
    },
    {
      title: "Input Kegiatan Fisik",
      href: "/input-kegiatan",
      icon: <AccountBalanceIcon />,
    },
    {
      title: "Riwayat Kegiatan Fisik",
      href: "/history-kegiatan",
      icon: <RestorePageIcon />,
    },

    {
      title: "Riwayat Kegiatan Non-Fisik",
      href: "/history-kegiatan-non-fisik",
      icon: <RestoreIcon />,
    },
    {
      title: "Riwayat Kegiatan Fisik",
      href: "/history",
      icon: <RestorePageIcon />,
    },
    {
      title: "Riwayat Kegiatan Non-Fisik",
      href: "/history-non",
      icon: <RestoreIcon />,
    },

    {
      title: "Pengaturan",
      href: "/pengaturan",
      icon: <SettingsIcon />,
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
        <Profile />
        <Divider className={classes.divider} />
        {/* <SidebarNav className={classes.nav} pages={pages} /> */}
        {user.type_user === "Kecamatan" && (
          <SidebarItem
            title={pages[0].title}
            icon={pages[0].icon}
            href={pages[0].href}
          />
        )}
        {user.type_user === "RW" && (
          <SidebarItem
            title={pages[1].title}
            icon={pages[1].icon}
            href={pages[1].href}
          />
        )}
        {user.type_user === "RW" && (
          <SidebarItem
            title={pages[2].title}
            icon={pages[2].icon}
            href={pages[2].href}
          />
        )}
        {user.type_user === "RW" && (
          <SidebarItem
            title={pages[3].title}
            icon={pages[3].icon}
            href={pages[3].href}
          />
        )}
        {user.type_user === "RW" && (
          <SidebarItem
            title={pages[4].title}
            icon={pages[4].icon}
            href={pages[4].href}
          />
        )}
        {user.type_user === "Kelurahan" && (
          <SidebarItem
            title={pages[5].title}
            icon={pages[5].icon}
            href={pages[5].href}
          />
        )}
        {user.type_user === "Kecamatan" && (
          <SidebarItem
            title={pages[5].title}
            icon={pages[5].icon}
            href={pages[5].href}
          />
        )}
        {user.type_user === "Kelurahan" && (
          <SidebarItem
            title={pages[6].title}
            icon={pages[6].icon}
            href={pages[6].href}
          />
        )}
        {user.type_user === "Kecamatan" && (
          <SidebarItem
            title={pages[6].title}
            icon={pages[6].icon}
            href={pages[6].href}
          />
        )}
        {user.type_user === "Kecamatan" && (
          <SidebarItem
            title={pages[7].title}
            icon={pages[7].icon}
            href={pages[7].href}
          />
        )}
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
