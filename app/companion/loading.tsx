"use client";
import Lottie from "lottie-react";
import React from "react";
import soundWaves from "@/constants/soundwaves.json";

const Loading = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {" "}
      <Lottie
        animationData={soundWaves}
        autoPlay={true}
        className="loading-lottie"
      />
    </div>
  );
};

export default Loading;
