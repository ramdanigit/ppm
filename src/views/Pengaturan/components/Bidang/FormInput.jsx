import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  TextField,
  Hidden,
  Tooltip,
  Input,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  OutlinedInput,
} from "@material-ui/core";
import DynamicInput from "components/DynamicInput/DynamicInput";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  btnGroup: {
    display: "flex",
    padding: "12px",
  },
  w90: {
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  w10: {
    // width: "10%",
    boxShadow: "0px 0px",
    padding: "5px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.white,
  },
  submit: {
    paddingLeft: "12px",
  },
  wrap: {
    padding: "30px",
  },
  btnAddMore: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
  },
  btnAdd: {
    backgroundColor: theme.palette.success.main,
    borderRadius: 0,
  },
  btnRemove: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: theme.palette.error.main,
  },
  label: {
    padding: "12px",
    display: "flex",
    height: "30px",
  },
}));

const FormInput = () => {
  const classes = useStyles();
  const [counter, setCounter] = React.useState([{ key: 0 }]);

  return (
    <div className={classes.wrap}>
      <Card>
        <form /*onSubmit={handleSubmit} encType="multipart/form-data"*/>
          <CardHeader
            action={
              <IconButton aria-label="expand">
                <OpenInNewIcon />
              </IconButton>
            }
            subheader="Isi dengan benar"
            title="Form Input Kegiatan"
          />
          <Divider />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  //   error={ref.pph}
                  helperText={"contoh : social"}
                  //   inputRef={namaRef}
                  autoComplete="off"
                  label="Nama Bidang"
                  margin="dense"
                  name="nama_bidang"
                  type="text"
                  //   onChange={updateField}
                  required
                  value={"" /*val.pph.replace(/[^0-9.]/g, "").toString()*/}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Box
              display="flex"
              justifyContent="flex-start"
              paddingLeft="12px"
              width="100%"
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Simpan Kegiatan
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
};

export default FormInput;
