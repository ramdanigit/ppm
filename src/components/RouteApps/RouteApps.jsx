import React from "react";
import Routes from "Routes";
import Alert from "components/Alert";

import SignInContext from "context/SignInContext";
import AlertContext from "context/AlertContext";
import UserContext from "context/UserContext";

import auth from "service/authService";
import { getCurrentUser } from "service/authLurahService";
import { getDataByOne } from "service/userService";

function RouteApps() {
  const [open, setOpen] = React.useState({
    backdrop: false,
    snackbar: false,
    message: "",
    variant: "",
  });
  const [user, setUser] = React.useState({});
  const [signIn, setSignIn] = React.useState({});

  const updateSignIn = (user) => {
    setSignIn(user);
  };

  const updateValue = (b, s, v, m) => {
    setOpen({ backdrop: b, snackbar: s, variant: v, message: m });
  };
  // const getUser = async () => {
  //   // const data = await getDataByOne(getCurrentUser().id);
  //   // if (getCurrentUser == "RW") {
  //   //   setSignIn(
  //   //     data.data
  //   //       ? {
  //   //           no_rw: data.data.RW.no_rw,
  //   //           kecamatan: data.data.Kecamatan.kecamatan,
  //   //           kelurahan: data.data.Kelurahan.kelurahan,
  //   //         }
  //   //       : {}
  //   //   );
  //   // }
  // };

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
