import { Box, styled } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import BGimg from "../assets/bg.jpg";
import { TbBrandHbo } from "react-icons/tb";
import { LuCloudSun } from "react-icons/lu";
import { WiDegrees } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";

import Logo from "./Logo";

const MAX = 116;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const StyledBox = styled(Box)({
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "space-between",
  marginBottom: "10px",
  border: "none",
  flex: "1",
  height: "500px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(110deg, rgba(14, 15, 43, 1),rgba(14, 15, 43, 0.5),rgba(14, 15, 43, 0.1)),
                       linear-gradient(360deg, rgba(14, 15, 43, 1),rgba(14, 15, 43, 0.4)),
                       url(${BGimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,
    opacity: 1,
  },
  "& > div": {
    zIndex: 2,
  },
});

const StyledBoxNav = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 4,
  backgroundColor: "transparent",
});
const StyledBoxNavButtons = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  gap: "15px",
});
const StyledBoxSearchBar = styled(Box)`
  display: flex;
  justify-content: flex-end;
  border-radius: 100px;
  outline: 1px solid transparent;
  overflow: hidden;
  padding: 8px;
  margininline: auto;
  width: 20px;
  height: 20px;
  transition: width 0.5s, outline 0.5s;

  &:focus-within {
    width: 150px;
    outline: 1px solid #2e2e2e;
    background-color: #fff;
    opacity: 0.4;
  }
`;
function Cta() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputStyles = {
    fontSize: "18px",
    color: "#000",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    opacity: isFocused ? 1 : 0,
    transition: "opacity 0.5s",
    width: "100%",
  };

  const buttonStyles = {
    flex: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "transparent",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
  };

  const [val, setVal] = useState(33);
  const [time, setTime] = useState(new Date());

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  return (
    <StyledBox>
      <StyledBoxNav>
        <Logo />
        <StyledBoxNavButtons>
          <Typography
            variant="p"
            sx={{
              color: "#fff",
              background: "transparent",
            }}
          >
            {time.toLocaleTimeString()}
          </Typography>
          <div
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuCloudSun
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                margin: "3px",
              }}
            />
            <Typography
              variant="p"
              sx={{
                color: "#fff",
                background: "transparent",
                position: "relative",
              }}
            >
              18
              <WiDegrees
                style={{
                  fontSize: "37px",
                  backgroundColor: "transparent",
                  color: "#fff",
                  position: "absolute",
                  bottom: "-5px",
                  left: "5px",
                }}
              />
            </Typography>
          </div>
          <StyledBoxSearchBar onFocus={handleFocus} onBlur={handleBlur}>
            <input
              type="search"
              placeholder="search..."
              style={inputStyles}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button type="submit" style={buttonStyles}>
              <CiSearch
                style={{
                  backgroundColor: "transparent",
                  color: isFocused ? "#000" : "#fff",
                }}
              />
            </button>
          </StyledBoxSearchBar>
        </StyledBoxNavButtons>
      </StyledBoxNav>
      <div style={{ backgroundColor: "transparent" }}>
        <TbBrandHbo
          style={{
            fontSize: 60,
            fontWeight: "bold",
            backgroundColor: "transparent",
            color: "#fff",
            zIndex: 3,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        />
        <Box
          sx={{
            color: "#fff",
            background: "transparent",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#4c4d6e",
              background: "transparent",
            }}
          >
            Now Playing
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "transparent",
            }}
          >
            Grey's Anatomy
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#4c4d6e",
              background: "transparent",
              fontSize: "14px",
            }}
          >
            Grey's Anatomy is an American medical drama television series that
            premiered on March 27, 2005, on ABC as a mid-season replacement.
          </Typography>
        </Box>
        <Box sx={{ width: "100%", background: "transparent" }}>
          <Slider
            marks={marks}
            step={1}
            value={val}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={handleChange}
            sx={{
              color: "#fff",
              background: "transparent",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fff",
              background: "transparent",
            }}
          >
            <Typography
              variant="body2"
              onClick={() => setVal(MIN)}
              sx={{ cursor: "pointer", background: "transparent" }}
            >
              {MIN} min
            </Typography>
            <Typography
              variant="body2"
              onClick={() => setVal(MAX)}
              sx={{ cursor: "pointer", background: "transparent" }}
            >
              {MAX} max
            </Typography>
          </Box>
        </Box>
      </div>
    </StyledBox>
  );
}

export default Cta;
