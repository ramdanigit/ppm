import React from "react";
// import FormInput from "./components/FormInput";
import TableView from "./components/TableView";
import { Grid, Box } from "@material-ui/core";
import service from "service/kegiatanService";
import auth from "service/authService";

import KegiatanContext from "context/KegiatanContext";
const Kecamatan = () => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const getData = async () => {
    const data = await service.getData();
    setData(
      data.data
        ? data.data
        : {
            RWid: "",
            kota: "Bandung",
            bulan: "",
            tahun: "",
            nama_bidang: "",
            nama_kegiatan: "",
            jumlah_orang: "",
            waktu: "",
            pembayaran_per_orang: "",
            jumlah_biaya: "",
            jumlah_orang_terlibat: "",
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
      <KegiatanContext.Provider
        value={{
          state: data,
          updateState: getData,
          setState: setState,
          query: query,
          setQuery: setQuery,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box padding="20px">
              <TableView />
            </Box>
          </Grid>
        </Grid>
      </KegiatanContext.Provider>
    </React.Fragment>
  );
};

export default Kecamatan;
