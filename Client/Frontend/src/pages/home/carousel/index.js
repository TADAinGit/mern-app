import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from './Carousel.module.css'
import React from "react";

function CarouselCustom({ children }) {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
    >
      {children}
    </Carousel>
  );
}

export default CarouselCustom;
