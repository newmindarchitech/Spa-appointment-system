'use client';
import React, { useEffect, useState } from "react";
import { slides } from "../../constants/navbarindex";
import "./carousel_styles/carousel.css"
const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const slideRight = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="hero bg-base-200 min-h-screen relative ">
      <div className=" carousel relative w-full h-full">
        {slides.map((image, index) => (
          <div
            key={image.id}
            id={image.id}
            //className="absolute inset-0 transition-opacity duration-500"
             className={` w-full  ${index === current ? " carousel-item relative h-full carousel_card_transition carousel_card_active" : "carousel_card_transition"}`}
          >
            <img
              src={image.imgSrc}
              alt="carousel"
              className="w-full h-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <button className="btn btn-circle" onClick={slideLeft}>❮</button>
              <button className="btn btn-circle" onClick={slideRight}>❯</button>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-content text-center flex-col lg:flex-row">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello There</h1>
          <p className="py-6 mb-5 text-amber-50">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut
            assumenda excepturi exercitationem quasi. In deleniti eaque aut
            repudiandae et a id nisi.
          </p>
          <button className="btn btn-soft btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;