import React from "react";
import Routes from "Routes";
import Alert from "components/Alert";

import SignInContext from "context/SignInContext";
import AlertContext from "context/AlertContext";

function RouteApps() {
  const [open, setOpen] = React.useState({
    backdrop: false,
    snackbar: false,
    message: "",
    variant: "",
  });
  const [signIn, setSignIn] = React.useState({
    isDashboard: false,
    isDataSatuan: false,
    isDataKumpulan: false,
    isDataKlaim: false,
    isDataRestitusi: false,
    isKirimDataPeserta: false,
    isKirimDataKlaim: false,
    isKirimDataRestitusi: false,
    isDownloadUploadData: false,
    isReportDataPeserta: false,
    isReportDataKlaim: false,
    isReportDataRestitusi: false,
    isRekonsiliasi: false,
    isMaster: false,
    isAksesUser: false,
    isProdukAsuransi: false,
  });

  const updateSignIn = (user) => {
    setSignIn(user);
  };

  const updateValue = (b, s, v, m) => {
    setOpen({ backdrop: b, snackbar: s, variant: v, message: m });
  };
  return (
    <React.Fragment>
      <AlertContext.Provider value={{ state: open, updateState: updateValue }}>
        <SignInContext.Provider
          value={{ state: signIn, updateState: updateSignIn }}
        >
          <Routes />
        </SignInContext.Provider>
        <Alert
          backdrop={open.backdrop}
          snackbar={open.snackbar}
          message={open.message}
          variant={open.variant}
          updateState={() => {
            updateValue(false, false, "info", "");
          }}
        />
      </AlertContext.Provider>
    </React.Fragment>
  );
}

export default RouteApps;
