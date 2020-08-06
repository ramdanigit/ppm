import React from "react";
import {
  Upm,
  Landing,
  Bidang,
  Kecamatan,
  Kelurahan,
  Register,
} from "./components";
import { TabsMain } from "components";

const data = [
  // {
  //   label: "Bidang",
  //   tab: <Bidang />,
  // },
  // {
  //   label: "Landing",
  //   tab: <Landing />,
  // },
  {
    label: "UPM",
    tab: <Upm />,
  },
  {
    label: "Kecamatan",
    tab: <Kecamatan />,
  },
  {
    label: "Kelurahan",
    tab: <Kelurahan />,
  },
  {
    label: "RW",
    tab: <Register />,
  },
];

function Pengaturan() {
  return (
    <React.Fragment>
      <TabsMain data={data} />
    </React.Fragment>
  );
}
export default Pengaturan;
