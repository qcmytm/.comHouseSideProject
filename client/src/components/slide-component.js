import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideComponent = () => {
  const Image = [
    {
      key: 1,
      url: "https://img1.591.com.tw/house/2022/05/12/165232205584522700.jpg!660x495.water3.jpg",
    },
    {
      key: 2,
      url: "https://img2.591.com.tw/house/2022/09/12/166294537295818001.jpg!660x495.water3.jpg",
    },
    {
      key: 3,
      url: "https://img2.591.com.tw/house/2022/03/04/164638560846912004.jpg!660x495.water3.jpg",
    },
    {
      key: 4,
      url: "https://img1.591.com.tw/house/2020/08/07/159677853397871007.jpg!660x495.water3.jpg",
    },
    {
      key: 5,
      url: "https://img1.591.com.tw/house/2022/12/22/167169984290586602.jpg!660x495.water3.jpg",
    },
  ];
  const settings = {
    fade: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  return (
    <div className="d-none d-sm-block ">
      <Slider {...settings}>
        {Image.map((i) => {
          return (
            <div className="d-flex justify-content-center">
              <img src={i.url} className="slideImg rounded-3" alt="img" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlideComponent;
