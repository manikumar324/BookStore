import React from 'react';
import { useState,useEffect } from 'react';
import { Skeleton, Drawer, Rate } from "antd";
import view from '../../assets/view.svg';
import ScreeningSoon from '../../assets/trending.json';
import Lottie from 'lottie-react';
import {IoMdAdd , IoMdRemove} from 'react-icons/io';
import {useBooksContext} from '../Context/BooksContext';
import {useCartContext} from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const Trending = () => {
    const{ books , loading , error } = useBooksContext();
    const{ addToCart } = useCartContext();
    const[showLoading, setShowLoading]=useState(true);
    const[showAll, setShowAll]=useState(false);
    const[quantity, setQuantity]=useState(1);
    const[drawerVisible, setDrawerVisible]=useState(false);
    const[selectedMovie, setSelectedMovie]=useState(null);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowLoading(false)
        },1000)

        return ()=>clearTimeout(timer)
    },[])

    const ScreeningSoonMovies = books.filter((movie) => movie.category === "Fiction"); //Filter movies for ScreeningSoon(Fiction) Category

    const handleShowAll=()=>{
        setShowAll(true)
    }

    const openDrawer=(movie)=>{
        setSelectedMovie(movie);
        setQuantity(1); //Reset Quantity when opening the drawer
        setDrawerVisible(true)
    }

    const closeDrawer=()=>{
        setSelectedMovie(null);
        setDrawerVisible(false)
    }

    const handleAddToCart = () => {
        if(selectedMovie) {
            const itemToAdd = {...selectedMovie , quantity }
            addToCart(itemToAdd); //it is useCallback hook we are passing itemToAdd prop to the addToCart function
            toast.success('Item add to cart')
            closeDrawer(); //Optionally close the drawer after adding to cart
        }
    }

    if (showLoading || loading) {
        return (
          <div className='bg-custom-dark'>
            <Toaster />
            <div className="flex justify-between items-center text-white mb-4">
              <h1 className="text-[18px] font-semibold text-[#ECEDF0] ml-2">Trending Now</h1>
            </div>
            <div className="flex gap-[10px] overflow-x-scroll scrollbar-hide">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  active
                  paragraph={false}
                  className="flex-shrink-0 w-[196px] h-[286px]"
                  title={{ width: "100%" }}
                  style={{
                    background: "linear-gradient(135deg, black,#0E0E12)",
                  }}
                />
              ))}
            </div>
          </div>
        );
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    

  return (
    <div className='bg-custom-dark'>
        <div className='flex justify-between items-center text-white mb-2'>
            <h1 className='text-[18px] mt-2 font-semibold text-[#ECEDF0] ml-2'>Trending Now</h1>
            <Lottie animationData={ScreeningSoon} className='h-[50px] mt-2' />
        </div>

        <div className='flex gap-[10px] overflow-x-scroll scrollbar-hide'>
            {(showAll? ScreeningSoonMovies : ScreeningSoonMovies.slice(0,5)).map((movie, index)=>(
                <div 
                key={index}
                className='bg-white p-5 pb-9 flex flex-col justify-around items-center  flex-shrink-0 w-[196px] h-[286px] cursor-pointer'
                onClick={()=>openDrawer(movie)}
                >
                <img 
                    src={movie.picture} 
                    alt={movie.title}
                    className='w-[156px] h-[236px] object-cover'
                    />
                </div>
            ))}
            {!showAll && ScreeningSoonMovies.length > 5 &&(
                <button
                onClick={handleShowAll}
                className='w-[140px] h-[286px] flex-shrink-0 bg-[#222227] flex flex-col relative'
                >
                <img 
                src={view}
                alt='view'
                className='flex-shrink-0 text-white bg-[#0067B3] p-3 rounded-full w-[48px] h-[48px] absolute top-[108px] left-[49px]'
                />
                <p className='text-[#A9ADB9] text-xs font-semibold w-[65px] h-[16px] absolute top-[162px] left-[40px]'>
                    View More
                </p>
                </button>
            )}
        </div>
        <Drawer
            title={
                <div className='flex flex-col justify-center items-center text-white mb-4'>
                    <hr className='bg-spotify-accent white w-11 h-1 rounded-lg animate-wiggle'onClick={closeDrawer}/>
                    <span className='text-gray-200 mt-2 font-semibold'>
                        {selectedMovie ? selectedMovie.title : ""}
                    </span>
                </div>
            }
            placement='bottom'
            closable={false}
            onClose={closeDrawer}
            style={{backgroundColor : "#222227"}}
            open={drawerVisible}
            height={500}
        >
            {selectedMovie && (
                <div className='p-4 rounded-lg'>
                    <img 
                    src={selectedMovie.picture}
                    alt={selectedMovie.title}
                    className='w-full h-[250px] object-contain rounded-lg mb-2'
                    />
                    <p className='text-lg font-semibold text-gray-200 mb-2'>Author : {selectedMovie.author}</p>
                    <p className='text-gray-400 text-sm leading-relaxed mb-2'>{selectedMovie.description}</p>
                    <Rate disabled allowHalf value={selectedMovie.rating} className='text-yellow-300 mb-2'/>
                    <p className='text-white'>Price : {selectedMovie.price}</p>
                    <div className='flex mt-4 items-center justify-between'>
                        <button
                            onClick={()=>setQuantity(Math.max(quantity - 1, 1))}
                            className='bg-white bg-opacity-80 border border-white/10 text-red-600 p-2 rounded-lg shadow-lg'
                        >
                        <IoMdRemove />
                        </button>
                        <span className='text-white'>{quantity}</span>
                        <button
                            onClick={()=>setQuantity(quantity + 1)}
                            className='bg-white bg-opacity-80 border border-white/10 text-green-600 p-2 rounded-lg shadow-lg'
                        >
                        <IoMdAdd />
                        </button>
                    </div>
                    <button
                    onClick={handleAddToCart}
                    className='bg-slate-50 w-full p-2 rounded-md mt-2 text-black font-bold'>
                        Add To Cart
                    </button>
                </div>
            )}
        </Drawer>
    </div>
  )
}

export default Trending;