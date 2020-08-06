import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  Collapse,
  Typography,
  Button,
  Box,
  colors,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  title: {
    color: colors.blueGrey[800],
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const SidebarExpand = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      className={clsx(classes.root, props.className)}
      classes={{ root: classes.padding }}
    >
      <ListItem
        className={classes.item}
        disableGutters
        key={props.title}
        onClick={handleClick}
      >
        <Button className={classes.button}>
          <Box display="flex" justifyContent="flex-start" width="100%">
            <Box display="flex" alignItems="center">
              <div className={classes.icon}>{props.icon}</div>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography align="left" className={classes.title}>
                {props.title}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            {open ? (
              <ExpandLess
                className={
                  props.color === "active"
                    ? classes.colorActive
                    : classes.expand
                }
              />
            ) : (
              <ExpandMore
                className={
                  props.color === "active"
                    ? classes.colorActive
                    : classes.expand
                }
              />
            )}
          </Box>
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.children}
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarExpand;
