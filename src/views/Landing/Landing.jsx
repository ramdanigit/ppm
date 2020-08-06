import React from "react";
// import Hero from "assets/img/hero.svg";
import TableView from "./components/TableView/TableView";
import {
  Grid,
  Paper,
  Box,
  Hidden,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { Carousel2, Tabs } from "components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrap: {
    maxWidth: "1200px",
    width: "100%",
    margin: 0,
    marginTop: "125px",
    [theme.breakpoints.down("md")]: {
      margin: "99px 20px 0 20px",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "99px 0 0 0",
    },
  },
  item: {
    paddingRight: "12px",
    [theme.breakpoints.down("md")]: {
      paddingRight: 0,
    },
  },
}));

const data = [
  // {
  //   label: "Info",
  //   tab: "info",
  // },
  {
    label: "Dokumen",
    tab: <TableView />,
  },
];

function Landing(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.wrap}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <div className={classes.item}>
              <Carousel2 />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box padding="10px">
              <div>
                <Card>
                  <form /*onSubmit={handleSubmit} encType="multipart/form-data"*/
                  >
                    <CardHeader title="Partisipasi Masyarakat" />
                    <Divider />
                    <CardContent>
                      Partisipasi masyarakat dalam pelaksanaan pembangunan
                      merupakan salah satu syarat mutlak dalam era kebebasan dan
                      keterbukaan ini. Pengabaian terhadap faktor ini, telah
                      menyebabkan terjadinya deviasi yang cukup signifikan
                      terhadap tujuan pembangunan itu sendiri yaitu keseluruhan
                      upaya peningkatan kesejahteraan masyarakat.
                    </CardContent>
                  </form>
                </Card>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box paddingTop="10px">
              <Tabs data={data} />
            </Box>
          </Grid>
        </Grid>
        {/* <Box height="800px"></Box> */}
      </div>
    </React.Fragment>
  );
}

export default Landing;
