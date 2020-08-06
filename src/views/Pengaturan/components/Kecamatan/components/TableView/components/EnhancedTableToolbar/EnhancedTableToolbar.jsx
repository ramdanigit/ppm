import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styled from "styled-components";
import RefreshIcon from "@material-ui/icons/Refresh";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import KecamatanContext from "context/KecamatanContext";
import PopOver from "components/PopOver";
import { lighten, makeStyles } from "@material-ui/core/styles";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  label: {
    color: "black",
  },
  border: {
    borderColor: "white",
  },
  search: {
    [theme.breakpoints.down("md")]: {
      // order: "3",
      width: "100%",
      justifyContent: "flex-start",
      padding: "0px 0px 10px 0px",
    },
  },
  add: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  // add: {
  //   [theme.breakpoints.down("md")]: {
  //     order: "2",
  //     width: "50%",
  //     justifyContent: "flex-end",
  //   },
  // },

  title: {
    color: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingTop: "10px",
    },
  },
  icon: {
    color: theme.palette.white,
  },
}));

const StyledTextField = styled(FormControl)`
  label.Mui-focused {
    color: black;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border: 2px solid white;
    }
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const data = React.useContext(KecamatanContext);

  const handleSearch = (e) => {
    data.setQuery(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenPopSearch = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopSearch = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <React.Fragment>
      <Toolbar className={classes.root}>
        <Box display="flex" flexWrap="wrap" width="100%">
          <Box
            width="50%"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            className={classes.title}
          >
            <Typography className={classes.title} variant="h4" id="tableTitle">
              <span>Table Kecamatan</span>
            </Typography>
          </Box>
          <Box
            width="50%"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            className={classes.add}
          >
            <Tooltip title="Refresh Table">
              <IconButton
                aria-label="refresh"
                onClick={props.refresh}
                className={classes.icon}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Search">
              <IconButton
                aria-label="search"
                onClick={handleOpenPopSearch}
                aria-describedby={id}
                className={classes.icon}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <PopOver
              id={id}
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClosePopSearch}
            >
              <StyledTextField variant="outlined" size="small">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  value={data.query}
                  inputProps={{
                    className: classes.label,
                  }}
                  className={classes.border}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <SearchIcon color="secondary" />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </StyledTextField>
            </PopOver>
          </Box>
        </Box>
      </Toolbar>
    </React.Fragment>
  );
}

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default EnhancedTableToolbar;
