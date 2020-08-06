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
  TextField,
  Tooltip,
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
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  btnGroup: {
    display: "flex",
    // paddingLeft: "12px",
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
}));

const FormInput = () => {
  const classes = useStyles();
  const [val, setVal] = React.useState({
    nama_bidang: "",
    nama_kegiatan: "",
    subKegiatan: "",
  });
  const updateField = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  size="small"
                >
                  <FormLabel component="legend">Pilih User :</FormLabel>
                  <Select
                    native
                    value={val.nama_bidang}
                    onChange={updateField}
                    label="Bidang"
                    inputProps={{
                      name: "nama_bidang",
                      id: "nama_bidang",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="RW">{"RW"}</option>
                    <option value="Lurah">{"Lurah"}</option>
                    <option value="Kecamatan">{"Kecamatan"}</option>
                    <option value="Admin">{"Admin"}</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-disabled"
                  label="Email"
                  defaultValue="Hello World"
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
