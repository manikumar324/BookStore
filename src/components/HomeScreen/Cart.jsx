import React, { useState, useEffect } from 'react';
import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from 'react-icons/fa';
import empty from "../../assets/emptyCart.json";
import Lottie from 'lottie-react';
import { Modal } from 'antd';
import addressAnimation from '../../assets/two.json';
import { Toaster, toast } from 'react-hot-toast';

const Cart = () => {
    const { cart, removeFromCart } = useCartContext();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [Useraddress, setAddress] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const calculatedTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(calculatedTotal);
    }, [cart]);

    const fetchAddress = async (lat, lon) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
            if (!response.ok) {
                throw new Error('Failed to fetch address');
            }
            const data = await response.json();
            setAddress(data.display_name);
            
            return data.display_name; // Return the fetched address
        } catch (error) {
            toast.error('Failed to fetch address');
            return null; // Return null on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchLocation = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const fetchedAddress = await fetchAddress(latitude, longitude);
                    if (fetchedAddress) {
                       
                        setModalIsOpen(true);
                        setTimeout(() => {
                            handleBuyNow(fetchedAddress); 
                            toast.success('Address fetched successfully!');
                        }, 4000); 
                       
                    }
                },
                () => {
                    toast.error('Geolocation access denied');
                    setIsLoading(false); 
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
        toast.success('Item removed from the cart.');
    };
    

    const handleBuyNow = async (address) => {
        const storedUser = JSON.parse(localStorage.getItem("bookUser"));
        const email = storedUser.email;

        const payload = {
            items: cart,
            totalAmount: total,
            Useraddress: address, 
            email
        };

        
        await makePaymentRequest(payload);
    };

    const makePaymentRequest = async (payload, retryCount = 0) => {
        try {
            const response = await fetch("https://bookbazaarserver.onrender.com/payment", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (retryCount < 1) {
                    return makePaymentRequest(payload, retryCount + 1); // Retry once
                }
                throw new Error('Payment API failed after retrying');
            }

            const data = await response.json();
            if (data.success && data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            toast.error(`Payment failed: ${error.message}`);
        }
    };

    return (
        <>
            <div className="cart-container min-h-screen flex flex-col justify-center items-start overflow-y-auto mx-auto bg-custom-dark shadow-lg p-4">
                <Toaster />
                <div className='flex justify-center items-center w-full mb-4'>
                    <h2 className="text-3xl font-bold text-[#1ED760]">Your Cart</h2>
                    
                </div>
                <hr className="border-t-2 border-white w-full mx-auto mb-4" />

                
                {cart.length === 0 ? (
                    <>
                        <Lottie animationData={empty} className='h-[150px]' />
                        <p className="text-center text-gray-400 font-bold">Your cart is empty.</p>
                        <button className='rounded-lg mt-3 p-2 animate-pulse font-bold bg-white text-spotify-accent' onClick={() => navigate("/")}>Shop Now</button>
                    </>
                ) : (
                    <div className="w-full">
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                            <ul className="flex space-x-4">
                                {cart.map((item) => (
                                    <li key={item._id} className="flex flex-col justify-between bg-gray-700 rounded-lg p-4 transition-shadow hover:shadow-lg w-[200px] flex-shrink-0">
                                        <img
                                            src={item.picture}
                                            alt={item.title}
                                            className='w-full h-[150px] object-cover rounded-md mb-2'
                                        />
                                        <h3 className="text-lg text-spotify-accent font-normal ">Name : <span className='font-semibold text-white italic'>{item.title}</span></h3>
                                        <p className=" text-spotify-accent">Price : <span className='font-semibold text-white italic'>{item.price}</span></p>
                                        <p className=" text-spotify-accent">Quantity : <span className='font-semibold text-white italic'>{item.quantity}</span></p>
                                        <button
                                            onClick={() => handleRemoveFromCart(item._id)}
                                            className="mt-2 text-white bg-main p-2 rounded-md hover:bg-opacity-80 transition-colors font-bold"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col justify-between items-center mt-6">
                            <div className="bg-gray-800 rounded-lg p-4 w-full flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">Total :</h3>
                                <p className="text-xl font-bold text-[#1ED760]"><span className='flex justify-center items-center'><FaRupeeSign />{total}</span></p>
                            </div>
                        </div>
                        <button onClick={handleFetchLocation} className='bg-white mt-4 w-full p-2 text-black font-bold text-[16px]'>Buy Now</button>
                    </div>
                )}
            </div>
            <Modal open={modalIsOpen} closable={false} footer={null} className='flex justify-center items-center'>
                <Lottie animationData={addressAnimation} style={{ width: 200, height: 300 }} />
                {isLoading && <p className="text-center text-white">Fetching address...</p>}
            </Modal>
        </>
    );
};

export default Cart;