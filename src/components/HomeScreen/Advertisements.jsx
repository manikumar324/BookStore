import React, { useState } from 'react';
import { Carousel } from 'antd';

const Advertisements = () => {
  const bookQuotes = [
    "A room without books is like a body without a soul. – Cicero",
    "Books are a uniquely portable magic. – Stephen King",
    "So many books, so little time. – Frank Zappa",
    "A book is a dream that you hold in your hand. – Neil Gaiman",
    "Reading gives us someplace to go when we have to stay where we are. – Mason Cooley",
    "Books are a treasure trove of knowledge and imagination.",
    "Between the pages of a book is a wonderful place to be.",
    "Books are the quietest and most constant of friends. – Charles W. Eliot",
    "Books let you travel without moving your feet. – Jhumpa Lahiri",
    "In books, we find a new world without ever leaving our chair."
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = (current) => {
    setCurrentSlide(current);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const customDotRender = (_, { index }) => {
    return (
      <div
        className={`w-[8px] h-[8px] rounded-full cursor-pointer ${currentSlide === index ? 'bg-main' : 'bg-spotify-accent'}`}
        onClick={() => handleDotClick(index)}
      />
    );
  };

  return (
    <div className="flex pt-4 justify-around p-2 bg-custom-dark" >
      
      <div className="flex items-center justify-center h-[168px] bg-white text-spotify-accent">
        <div className="text-[12px] w-[28px] h-[168px] transform -rotate-90 flex justify-center items-center">
          <p style={{ color: "green", fontSize: "14px", fontWeight: "900" }}>Quotes</p>
        </div>
      </div>

      {/* Carousel div */}
      <div className="w-[80vw] h-[168px]" style={{ backgroundImage: "radial-gradient(circle, #1E1E1E,#121212)", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Carousel
          autoplay
          dots={false}
          customDot={customDotRender} 
          afterChange={handleChange}
          className="h-[168px]"
        >
          {bookQuotes.map((quote, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-[168px] text-white p-4"
              
            >
              <h2 className="text-center align-middle mt-6 text-lg lg:text-xl font-serif italic leading-tight  text-[#1DB954]">
                "{quote}"
              </h2>
            </div>
          ))}
        </Carousel>
        
        
        <div className="flex justify-center space-x-1 mt-1">
          {bookQuotes.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-[8px] h-[8px] rounded-full cursor-pointer ${currentSlide === index ? 'bg-spotify-accent' : 'bg-main'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisements;