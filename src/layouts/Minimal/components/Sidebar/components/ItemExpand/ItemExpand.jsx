import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    paddingLeft: "20px",
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
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const ItemExpand = (props) => {
  //   const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      className={clsx(classes.root, props.className)}
      classes={{ root: classes.padding }}
    >
      {/* {pages.map((page) => ( */}
      <ListItem className={classes.item} disableGutters key={props.title}>
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={CustomRouterLink}
          to={props.href}
        >
          <div className={classes.icon}>{props.icon}</div>
          {props.title}
        </Button>
      </ListItem>
      {/* ))} */}
    </List>
  );
};

ItemExpand.propTypes = {
  className: PropTypes.string,
};

export default ItemExpand;
