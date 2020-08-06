import React, { Component } from "react";
import Slider from "react-slick";
import Hero from "assets/img/test.jpg";
// import Hero2 from "assets/img/tset2.jfif";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";
import { SkipNextRounded } from "@material-ui/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{
        ...style,
        display: "block",
        // padding: "5px",
        // borderRadius: "45px",
        // backgroundColor: "white",
        // right: "-4px",
        color: "black",
        width: "30px",
        height: "30px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{
        ...style,
        display: "block",
        // padding: "5px",
        // borderRadius: "45px",
        // backgroundColor: "white",
        // stroke: "white",
        // strokeWidth: 1,
        // left: "3px",
        color: "black",
        width: "30px",
        height: "30px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

export default class CustomArrows extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      autoPlay: true,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img
              src={Hero}
              alt="First slide"
              width="100%"
              height="auto"
              style={{ borderRadius: "2%" }}
            />
          </div>
          <div>
            <img
              src={Hero}
              alt="First slide"
              width="100%"
              height="auto"
              style={{ borderRadius: "2%" }}
            />
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
