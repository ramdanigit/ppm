import React from "react";
import Popover from "@material-ui/core/Popover";

function PopOver(props) {
  return (
    <Popover
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {props.children}
    </Popover>
  );
}

export default PopOver;
