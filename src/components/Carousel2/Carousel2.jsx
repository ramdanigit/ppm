import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Hero from "assets/img/hero03.png";
import Hero1 from "assets/img/hero01.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: "2%",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
}));

function Carousel2(props) {
  const classes = useStyles();
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      dynamicHeight={true}
      useKeyboardArrows={false}
      emulateTouch={true}
      infiniteLoop={true}
      autoPlay={true}
    >
      <div>
        <img src={Hero1} alt="img" className={classes.img} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src={Hero} alt="img" className={classes.img} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
    </Carousel>
  );
}

export default Carousel2;
