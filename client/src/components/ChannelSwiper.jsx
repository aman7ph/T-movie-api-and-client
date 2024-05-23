import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Box, styled } from "@mui/material";

import Channels from "./Channels";

import { TbBrandHbo } from "react-icons/tb";
import { SiNbc } from "react-icons/si";
import { RiNetflixFill } from "react-icons/ri";
import { SiAmazonprime } from "react-icons/si";
import { TbAbc } from "react-icons/tb";
import { TbBrandDisney } from "react-icons/tb";
import { SiFox } from "react-icons/si";
import { SiCnn } from "react-icons/si";
import { FcBbc } from "react-icons/fc";
import { SiNba } from "react-icons/si";
import { IoIosFootball } from "react-icons/io";
import { SiSony } from "react-icons/si";

const ChannelLsList = [
  { name: "HBO", icon: TbBrandHbo },
  { name: "NBC", icon: SiNbc },
  { name: "NETFLIX", icon: RiNetflixFill },
  { name: "AMAZON", icon: SiAmazonprime },
  { name: "ABC", icon: TbAbc },
  { name: "Disney", icon: TbBrandDisney },
  { name: "FOX", icon: SiFox },
  { name: "CNN", icon: SiCnn },
  { name: "NBA", icon: SiNba },
  { name: "FOOTBALL", icon: IoIosFootball },
  { name: "SONY", icon: SiSony },
  { name: "BBC", icon: FcBbc },
];

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "4px",
  marginTop: "10px",
});

function ChannelSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    const swiperElement = document.querySelector(".mySwiper").swiper;
    const updateSlidesPerView = () => {
      const currentSlidesPerView = swiperElement.params.slidesPerView;
      setSlidesPerView(currentSlidesPerView);
    };
    swiperElement.on("resize", updateSlidesPerView);
    updateSlidesPerView();
    return () => {
      swiperElement.off("resize", updateSlidesPerView);
    };
  }, []);

  const middleIndex = activeIndex + Math.floor(slidesPerView / 2);

  return (
    <StyledBox>
      <Swiper
        freeMode={true}
        grabCursor={true}
        className="mySwiper"
        loop={true}
        onSlideChange={handleSlideChange}
        breakpoints={{
          0: { slidesPerView: 5, spaceBetween: 10 },
          580: { slidesPerView: 7, spaceBetween: 20 },
          800: { slidesPerView: 9, spaceBetween: 30 },
        }}
      >
        {ChannelLsList.map((item, index) => (
          <SwiperSlide key={index}>
            <Channels
              item={item}
              isActive={middleIndex % ChannelLsList.length === index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledBox>
  );
}

export default ChannelSwiper;
