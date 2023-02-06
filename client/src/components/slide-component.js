import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  return (
    <div>
      <Slider {...settings} className="container-xl">
        <div className="d-flex justify-content-center">
          <img
            src="https://img1.591.com.tw/house/2022/05/12/165232205584522700.jpg!660x495.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <img
            src="https://img2.591.com.tw/house/2022/09/12/166294537295818001.jpg!660x495.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <img
            src="https://img2.591.com.tw/house/2022/03/04/164638560846912004.jpg!660x495.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <img
            src="https://img1.591.com.tw/house/2016/12/14/148170844108146009.jpg!900x.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <img
            src="https://img1.591.com.tw/house/2020/08/07/159677853397871007.jpg!660x495.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center">
          <img
            src="https://img1.591.com.tw/house/2022/12/22/167169984290586602.jpg!660x495.water3.jpg"
            style={{ height: "80vh" }}
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default SlideComponent;
