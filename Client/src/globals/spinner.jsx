import React from "react";
import { CircularProgress } from "@mui/material";

function Spinner({ size, bg, fullScreen, customClasses }) {
  const getSize = () => {
    switch (size) {
      case "extraSmall":
        return 10;
      case "small":
        return 20;
      case "medium":
        return 30;
      case "large":
        return 40;
      case "extraLarge":
        return 50;
      default:
        return 24;
    }
  };

  const getColor = () => {
    switch (bg) {
      case "light":
        return "primary";
      case "dark":
        return "accentPrimary";
      default:
        return "primary";
    }
  };

  if (fullScreen === true) {
    return (
      <div className="grid h-screen content-center">
        <CircularProgress
          size={getSize()}
          color={getColor()}
          className=" m-auto"
        />
      </div>
    );
  } else {
    return (
      <CircularProgress
        size={getSize()}
        color={getColor()}
        className={`m-auto ${customClasses}`}
      />
    );
  }
}

export default Spinner;
