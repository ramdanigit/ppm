import React from "react";
import { Box, Typography } from "@material-ui/core";
import auth from "service/authService";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

function Welcome() {
  const user = auth.getCurrentUser();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      paddingTop="100px"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" gutterBottom>
          Selamat Datang !
        </Typography>
      </Box>
      <br />
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          {user.username}
        </Typography>
        <br />
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          {user.type_user}
        </Typography>
      </Box>
    </Box>
  );
}
export default Welcome;
