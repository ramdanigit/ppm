import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: "#FFFFFF",
    padding: "15px",
  },
  icon: {
    color: "#FFFFFF",
  },
  bg: {
    backgroundColor: "#F5F5F5",
  },
}));

function DialogFull(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
        style={{ zIndex: 1500 }}
        classes={{ paper: classes.bg }}
      >
        <AppBar className={classes.bar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box marginTop="80px">{props.children}</Box>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogFull;
