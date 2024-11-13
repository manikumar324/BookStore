import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { useBooksContext } from "../Context/BooksContext";
import { Drawer, message, Rate } from "antd";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useCartContext } from "../Context/CartContext";
import toast, { Toaster } from 'react-hot-toast';

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { filteredBooks, setSearchTerm, loading, error } = useBooksContext();
  const { addToCart } = useCartContext();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
      addToCart(itemToAdd); //In itemToAdd we have all the information about the item like price,title,author,description which includes the quantity.
      toast.success("Item add to cart")
      closeDrawer();
    }
  };

  const storedUser = JSON.parse(localStorage.getItem("bookUser"));
  const name = storedUser ? storedUser.name : "Guest";
  const firstLetter = name[0].toUpperCase();

  return (
    <div className="bg-custom-dark p-5 min-h-screen">
      <Toaster/>
      <div className="flex items-center mb-4">
        <div className="bg-white flex justify-center items-center rounded-full p-3 h-7 w-7">
          <Link to="/search">
            <h1 className="font-bold text-spotify-accent ">{firstLetter}</h1>
          </Link>
        </div>
        <h1 className="font-bold ml-2 text-white">Search</h1>
      </div>

      {/* Search Input Section */}
      <div className="relative mt-4">
        <input
          type="text"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleInputChange}
          className="bg-white rounded-full pl-10 pr-4 py-2 w-full"
          required
          placeholder=" "
        />
        <FaSearch className="absolute left-3 top-3 text-text" />

        {/* Type Animation for Placeholder */}
        <div
          className={`absolute left-9 top-2 transition-all duration-300 ${
            focus ? "hidden" : "block"
          }`}
        >
          <TypeAnimation
            sequence={[
              "Search Books...",
              1000,
              "Search Authors...",
              1000,
              "Search Genres...",
              1000,
              "Search Fiction...",
              1000,
              "Search Non-Fiction...",
              1000,
              "Search Mystery...",
              1000,
              "Search Fantasy...",
              1000,
              "Search", // Clear after
              500, // Pause before repeating
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ color: "black", fontFamily: "cursive" }}
          />
        </div>
      </div>

      <div className="mt-4 h-screen overflow-y-auto w-full">
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-white">Error fetching books!</p>}
        {filteredBooks.length > 0 ? (
          <div className="flex w-full justify-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-10">
              {filteredBooks.map((book, index) => (
                <li key={book.id || index} className="flex-shrink-0">
                  <img
                    src={book.picture}
                    alt={book.title}
                    className="w-full h-[200px] md:h-[350px] max-h-[500px] object-cover rounded cursor-pointer"
                    onClick={() => openDrawer(book)} // Open drawer on click
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && <p className="text-white">No books found.</p>
        )}
      </div>

      <Drawer
        placement="bottom"
        closable={false}
        onClose={closeDrawer}
        open={drawerVisible}
        height={500}
        style={{ backgroundColor: "#222227" }}
      >
        {selectedBook && (
          <div className="p-4 rounded-lg">
            <hr
              className="bg-spotify-accent mx-auto mb-4 white w-11 h-1 rounded-lg animate-wiggle"
              onClick={closeDrawer}
            />
            <img
              src={selectedBook.picture}
              alt={selectedBook.title}
              className="w-full h-[250px] object-contain rounded-lg mb-2"
            />
            <p className="text-lg font-semibold text-gray-200 mb-2">
              Author: {selectedBook.author}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              {selectedBook.description}
            </p>
            <Rate
              disabled
              allowHalf
              value={selectedBook.rating}
              className="text-yellow-300 mb-2"
            />
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
            <button
              onClick={handleAddToCart}
              className="bg-slate-50 w-full p-2 rounded-md mt-2 text-black font-bold"
            >
              Add To Cart
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Search;
