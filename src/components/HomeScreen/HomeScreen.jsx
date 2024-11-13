import React, { useEffect, useState } from 'react';
import { useBooksContext } from '../Context/BooksContext';
import { Carousel, Skeleton, Drawer, Rate } from 'antd';
import TopPicks from './TopPicks';
import Thriller from './Thriller';
import Trending from './Trending';
import Advertisements from './Advertisements';
import { useCartContext } from '../Context/CartContext';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

const HomeScreen = () => {
  const { books, loading, error } = useBooksContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const carouselRef = React.useRef();
 
  const { addToCart } = useCartContext();

  
  const carouselBooks = books.slice(0, 5);

  const handleChange = (current) => {
    setCurrentSlide(current);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

  const openDrawer = (book) => {
    setSelectedBook(book);
    setQuantity(1); 
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedBook(null);
  };

  const handleAddToCart = () => {
    if (selectedBook) {
      const itemToAdd = { ...selectedBook, quantity };
      addToCart(itemToAdd);
      toast.success('Item add to cart')
      closeDrawer();
    }
  };

  if (loading) {
    return (
      <div style={{ background: "#0E0E12" }}>
        <Carousel
          autoplay
          dots={false}
          ref={carouselRef}
          afterChange={handleChange}
          className="rounded-full shadow-lg"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="relative h-[400px] w-full" key={index}>
              <Skeleton active className="h-full w-full" />
            </div>
          ))}
        </Carousel>
        <div className="flex mt-1 relative justify-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-[6px] h-[6px] rounded-full bg-spotify-accent" />
          ))}
        </div>
        <br />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Toaster />
      <div style={{ background: "#0E0E12" }}>
        <Carousel
          autoplay
          dots={false}
          ref={carouselRef}
          afterChange={handleChange}
          className="rounded-full shadow-lg"
        >
          {carouselBooks.map((book, index) => (
            <div className="relative h-[400px] w-full" key={index} onClick={() => openDrawer(book)}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(14, 14, 18, 0) 0%, rgba(14, 14, 18, 0.91) 79%, #0E0E12 94%), url(${book.picture})`,
                  height:"475px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "top"
                }}
              />
              <div className="flex flex-col justify-end items-start ml-4 h-full relative z-10 pb-4">
                <h2 className="text-xl font-bold text-white">{book.title}</h2>
                <p className="text-sm text-gray-400 italic">{book.author}</p>
              </div>
            </div>
          ))}
        </Carousel>
        
        <div className="flex mt-1 relative justify-center space-x-1">
          {carouselBooks.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-[6px] h-[6px] rounded-full cursor-pointer ${currentSlide === index ? 'bg-spotify-accent' : 'bg-main'}`}
            />
          ))}
        </div>
        
        <br />
      </div>

      <TopPicks />
      <Thriller />
      <Trending />
      <Advertisements />
     

      <Drawer
        title={
          <div className="flex flex-col justify-center items-center text-white mb-4">
            <hr className="bg-spotify-accent white w-11 h-1 rounded-lg animate-wiggle" onClick={closeDrawer} />
            <span className="text-gray-200 mt-2 font-semibold">
              {selectedBook ? selectedBook.title : ""}
            </span>
          </div>
        }
        placement="bottom"
        closable={false}
        onClose={closeDrawer}
        style={{ backgroundColor: "#222227" }}
        open={drawerVisible}
        height={500}
        
      >
        {selectedBook && (
          <div className="p-4 rounded-lg">
            <img
              src={selectedBook.picture}
              alt={selectedBook.title}
              className="w-full h-[250px] object-contain rounded-lg mb-2"
            />
            <p className="text-lg font-semibold text-gray-200 mb-2">Author: {selectedBook.author}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">{selectedBook.description}</p>
            <Rate disabled allowHalf value={selectedBook.rating} className="text-yellow-300 mb-2" />
            <p className="text-white">Price: {selectedBook.price}</p>
            <div className="flex mt-4 items-center justify-between">
              <button
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                className="bg-white bg-opacity-80 border border-white/10 text-red-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdRemove />
              </button>
              <span className="text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-white bg-opacity-80 border border-white/10 text-green-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdAdd />
              </button>
            </div>
            <button onClick={handleAddToCart} className="bg-slate-50 w-full p-2 rounded-md mt-2 text-black font-bold">
              Add To Cart
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default HomeScreen;