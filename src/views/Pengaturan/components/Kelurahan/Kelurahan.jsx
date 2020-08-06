import React from "react";
import FormInput from "./components/FormInput";
import TableView from "./components/TableView";
import { Grid } from "@material-ui/core";
import service from "service/kelurahanService";

import KelurahanContext from "context/KelurahanContext";
const Kelurahan = () => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const getData = async () => {
    const data = await service.getData();
    setData(
      data.data
        ? data.data
        : {
            kelurahan: "",
            KecamatanId: "",
            username: "",
            type_user: "",
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
      <KelurahanContext.Provider
        value={{
          state: data,
          updateState: getData,
          setState: setState,
          query: query,
          setQuery: setQuery,
        }}
      >
        <Grid container spacing={2}>
          {/* <Grid item md={3} xs={12} /> */}
          <Grid item md={6} xs={12}>
            <FormInput />
          </Grid>
          {/* <Grid item md={3} xs={12} />
          <Grid item md={3} xs={12} /> */}
          <Grid item md={6} xs={12}>
            <TableView />
          </Grid>
          {/* <Grid item md={3} xs={12} /> */}
        </Grid>
      </KelurahanContext.Provider>
    </React.Fragment>
  );
};

export default Kelurahan;
