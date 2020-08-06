import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2000,
  },
  scroll: {
    zIndex: 2000,
    height: "60%",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogBasic(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        scroll="paper"
        className={props.scroll ? classes.scroll : classes.root}
      >
        <DialogTitle id={props.id}>{props.title}</DialogTitle>
        <DialogContent dividers={true}>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Tidak
          </Button>
          <Button onClick={props.action} color="primary">
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBasic;
