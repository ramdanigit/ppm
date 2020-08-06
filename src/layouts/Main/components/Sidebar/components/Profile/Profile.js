import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import auth from "service/authService";
// import auth2 from "service/authLurahService";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import { IconButton } from "@material-ui/core";
// import Logo from "assets/img/"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Arfianto",
    avatar: "/images/avatars/avatar_11.png",
    bio: "RW",
  };
  const month = new Date().getUTCMonth() + 1;
  const year = new Date().getUTCFullYear();
  const date = new Date().getUTCDate();
  const [openLogout, setOpenLogout] = React.useState(false);

  const handleClickOpen = () => {
    setOpenLogout(true);
  };

  const handleClose = () => {
    setOpenLogout(false);
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {auth.getCurrentUser().username}
      </Typography>
      <Typography variant="body2">{auth.getCurrentUser().type_user}</Typography>
      <Typography variant="button">
        {date + "/" + month + "/" + year}
      </Typography>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <InputIcon />
      </IconButton>
      <Dialog
        open={openLogout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="secondary">
          {"Sign-Out"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda Yakin Untuk Keluar Dari Aplikasi ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Tidak
          </Button>
          <RouterLink to="/sign-out/675213hdsbjjsankdig6723">
            <Button onClick={handleClose} color="secondary" autoFocus>
              Ya
            </Button>
          </RouterLink>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
