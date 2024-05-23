import React from "react";

import NaveBar from "../components/NaveBar";

import ChannelSwiper from "../components/ChannelSwiper";
import CardSwiper from "../components/CardSwiper";
import Cat from "../components/Cta";

function MobileLayout() {
  return (
    <div style={{ backgroundColor: "#0e0f2b" }}>
      <Cat />
      <ChannelSwiper />
      <CardSwiper />
      <NaveBar />
    </div>
  );
}

export default MobileLayout;
