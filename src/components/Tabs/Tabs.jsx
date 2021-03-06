import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import MuiTabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  btn: {
    color: "black",
  },
  tabs: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "3px solid #90caf9",
    textTransform: "none",
  },
  select: {
    borderBottom: "2px solid white",
    color: "blue",
  },
  bar: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

const Tabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const data = props.data;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.bar}>
        <MuiTabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
          classes={{ scrollButtons: classes.btn, indicator: classes.select }}
        >
          {data.map((datas, index) => (
            <Tab label={datas.label} {...a11yProps(index)} key={index} />
          ))}
        </MuiTabs>
      </AppBar>
      {data.map((datas, index) => (
        <TabPanel value={value} index={index} key={index}>
          {datas.tab}
        </TabPanel>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  optionalArray: PropTypes.array,
};

export default Tabs;
