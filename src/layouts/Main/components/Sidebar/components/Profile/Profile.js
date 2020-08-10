import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography, Box } from "@material-ui/core";
import { getCurrentUser } from "service/authService";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import { IconButton } from "@material-ui/core";
import Logo from "assets/img/akun.svg";
import serviceKecamatan from "service/kecamatanService";
import serviceKelurahan from "service/kelurahanService";
import serviceRW from "service/rwServices";
import contextBtn from "context/ButtonNavMainContext";
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
  const context = React.useContext(contextBtn);

  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();
  const date = new Date().getUTCDate();
  const [openLogout, setOpenLogout] = React.useState(false);

  const months = new Array(12);
  months[0] = "Januari";
  months[1] = "Februari";
  months[2] = "Maret";
  months[3] = "April";
  months[4] = "Mei";
  months[5] = "Juni";
  months[6] = "Juli";
  months[7] = "Agustus";
  months[8] = "September";
  months[9] = "Oktober";
  months[10] = "November";
  months[11] = "Desember";

  const handleClickOpen = () => {
    setOpenLogout(true);
  };

  const handleClose = () => {
    setOpenLogout(false);
    context.close();
  };
  const [user, setUser] = React.useState({});
  const getUser = async () => {
    if (getCurrentUser().RWId) {
      const data = await serviceRW.getDataRW(getCurrentUser().RWId);
      // console.log(data.data[0]);
      setUser(data.data[0]);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  // console.log(getCurrentUser().RWId);
  // console.log(user);
  return (
    <Paper style={{ backgroundColor: "#f5f5f5" }}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Avatar alt="Person" className={classes.avatar} src={Logo} />

        <Box display="flex">
          {getCurrentUser().RWId && (
            <table style={{ width: "100%" }}>
              <tr>
                <th>No.RW</th>
                <td>:</td>
                <td>{user ? user.no_rw : ""}</td>
              </tr>
              <tr>
                <th>Kelurahan</th>
                <td>:</td>
                <td>
                  {user ? (user.Kelurahan ? user.Kelurahan.kelurahan : "") : ""}
                </td>
              </tr>
              <tr>
                <th>Kecamatan</th>
                <td>:</td>
                <td>
                  {user ? (user.Kecamatan ? user.Kecamatan.kecamatan : "") : ""}
                </td>
              </tr>
            </table>
          )}
        </Box>
        {/* <Typography variant="body2">{auth.getCurrentUser().type_user}</Typography> */}
        <Box padding="20px">
          <Typography variant="h6">
            {date + "-" + months[month] + "-" + year}
          </Typography>
        </Box>
        {/* <IconButton color="inherit" onClick={handleClickOpen}>
          <InputIcon />
        </IconButton> */}
        <Hidden mdUp>
          <Button
            onClick={() => {
              handleClickOpen();
              // context.close();
            }}
            style={{
              width: "100%",
              color: "#ffffff",
              backgroundColor: "#448aff",
            }}
          >
            Keluar
          </Button>
        </Hidden>
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
    </Paper>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
