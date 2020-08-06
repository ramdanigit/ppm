import React from "react";
import FormInput from "./FormInput";
import Grid from "@material-ui/core/Grid";
import { Button } from "antd";
function Bidang() {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={6}>
          <FormInput />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default Bidang;
