import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Box, styled } from "@mui/material";
import Cards from "./Cards";

import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import BedroomBabyOutlinedIcon from "@mui/icons-material/BedroomBabyOutlined";

const categories = [
  {
    icon: CellTowerOutlinedIcon,
    name: "Live TV's",
    description: "+50 Channels",
  },
  {
    icon: GroupWorkOutlinedIcon,
    name: "Movies",
    description: "+5000 Channels",
  },
  {
    icon: LiveTvOutlinedIcon,
    name: "TV Shows",
    description: "+500 Channels",
  },
  {
    icon: SportsBaseballOutlinedIcon,
    name: "Sport",
    description: "+15 Channels",
  },
  {
    icon: BedroomBabyOutlinedIcon,
    name: "Kids",
    description: "+5 Channels",
  },
  {
    icon: CellTowerOutlinedIcon,
    name: "Live TV's",
    description: "+50 Channels",
  },
  {
    icon: GroupWorkOutlinedIcon,
    name: "Movies",
    description: "+5000 Channels",
  },
  {
    icon: LiveTvOutlinedIcon,
    name: "TV Shows",
    description: "+500 Channels",
  },
  {
    icon: SportsBaseballOutlinedIcon,
    name: "Sport",
    description: "+15 Channels",
  },
  {
    icon: BedroomBabyOutlinedIcon,
    name: "Kids",
    description: "+5 Channels",
  },
];

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "24px",
  marginTop: "5px",
});

function CardSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <StyledBox>
      <Swiper
        freeMode={true}
        grabCursor={true}
        className="mySwiper"
        loop={true}
        onSlideChange={handleSlideChange}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          580: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1100: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <Cards item={item} isActive={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledBox>
  );
}

export default CardSwiper;
