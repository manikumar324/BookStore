import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    const addToCart = (item)=>{
        setCart((prevCart)=>{
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
            if(existingItem){
                return prevCart.map((cartItem) =>
                cartItem._id === item._id
            ? {...cartItem, quantity : cartItem.quantity + item.quantity} : cartItem
                );
            }
            return [...prevCart, item];  //Add items with its quantity
        });
    };

    const removeFromCart = (itemId) =>{
        setCart((prevCart)=>{
            const existingItem = prevCart.find((cartItem)=> cartItem._id === itemId);
            if(existingItem){
                if(existingItem.quantity > 1){
                    return prevCart.map((cartItem)=>
                    cartItem._id === itemId
                        ? { ...cartItem, quantity : cartItem.quantity - 1}
                        : cartItem
                    );
                }
                return prevCart.filter(( cartItem ) => cartItem._id !== itemId);
            }
            return prevCart;
        });
    };

    const clearCart =()=>{
        setCart([]);
    }

    const cartLength = cart.length;
    console.log(cartLength)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartLength}}>
        {children}
    </CartContext.Provider>
  )
}

export const useCartContext=()=>{
    return useContext(CartContext)
}