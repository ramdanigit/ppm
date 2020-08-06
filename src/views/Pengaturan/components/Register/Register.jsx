import React from "react";
import FormInput from "./components/FormInput";
import TableView from "./components/TableView";
import { Grid, Box } from "@material-ui/core";
import service from "service/rwServices";

import RWContext from "context/RWContext";
const Register = () => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const getData = async () => {
    const data = await service.getData();
    setData(
      data.data
        ? data.data
        : {
            no_ktp: "",
            nama_rw: "",
            tgl_lahir: "",
            tempat_lahir: "",
            KecamatanId: "",
            KelurahanId: "",
            alamat: "",
            no_rw: "",
            email: "",
            no_hp: "",
            username: "",
            type_user: "RW",
            password: "",
          }
    );
  };
  const setState = (userData) => {
    setData(...data, { state: userData });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <RWContext.Provider
        value={{
          state: data,
          updateState: getData,
          setState: setState,
          query: query,
          setQuery: setQuery,
        }}
      >
        <Grid container>
          {/* <Grid item md={3} xs={12} /> */}
          <Grid item xs={12}>
            <FormInput />
          </Grid>
          {/* <Grid item md={3} xs={12} /> */}
          {/* <Grid item md={3} xs={12} /> */}
          <Grid item xs={12}>
            <Box paddingTop="20px" />
            <TableView />
          </Grid>
          {/* <Grid item md={3} xs={12} /> */}
        </Grid>
      </RWContext.Provider>
    </React.Fragment>
  );
};

export default Register;
