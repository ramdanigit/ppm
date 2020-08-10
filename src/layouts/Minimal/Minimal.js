import React from "react";
import PropTypes from "prop-types";
import { NavBar } from "components";
import { Sidebar } from "./components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    // paddingTop: 64,
    height: "100%",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const Minimal = (props) => {
  const { children } = props;
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar sidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
