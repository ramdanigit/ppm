import React from "react";
// import FormInput from "./components/FormInput";
import TableView from "./components/TableView";
import { Grid, Box } from "@material-ui/core";
import service from "service/kegiatanNonService";
import auth from "service/authService";

import KegiatanContext from "context/KegiatanContext";
const Kecamatan = () => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const getData = async () => {
    const data = await service.getDataByRW(auth.getCurrentUser().RWId);
    setData(
      data.data
        ? data.data
        : {
            RWId: "",
            kota: "",
            bulan: "",
            tahun: "",
            nama_bidang: "",
            uraian_kegiatan: "",
            jumlah_orang_diundang: "",
            jumlah_orang_hadir: "",
            presentase: "",
            anggaran: "",
            IHNK: "",
            IPMDP: "",
            partisipasi_masyarakat: "",
            total: "",
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
