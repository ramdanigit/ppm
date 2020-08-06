import React from "react";
import FormInput from "./components/FormInput";
import { Grid, Paper } from "@material-ui/core";

const InputKegiatanNonFisik = () => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <FormInput />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InputKegiatanNonFisik;
