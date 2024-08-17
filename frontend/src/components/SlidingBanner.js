import React, { useState, useEffect } from 'react';
import img1 from "../utils/images/Banner.jpg";
import img2 from "../utils/images/img2.jpg";
import img3 from "../utils/images/Banner4.jpg";

const bannerImages = [
  img1,
  img2,
  img3,
];

const SlidingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full lg:h-[30rem] md:h-[26rem] sm:h-[24rem] h-[20rem] lg:mt-28 md:mt-24 sm:mt-20 mt-16 ">
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className="w-full lg:h-[30rem] md:h-[26rem] sm:h-[24rem] h-[20rem] flex-shrink-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
