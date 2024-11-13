import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import ordersLottie from "../../assets/orders.json";
import { ThreeDots } from "react-loader-spinner";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = JSON.parse(localStorage.getItem("bookUser"))?.email.toLowerCase();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('https://bookbazaarserver.onrender.com/orders', { email: userEmail });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">Loading</p>
        <span className='ml-1 mt-4'><ThreeDots 
          height="40" 
          width="40" 
          color="#3498db" 
          ariaLabel="three-dots-loading" 
          className="ml-2"
        /></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-custom-dark min-h-screen">
      <Link to="/orders">
        <div className='flex border border-white w-full justify-between items-center mb-6 p-2  rounded-lg shadow-lg bg-custom-dark'>
          <h2 className="text-xl font-bold text-center text-spotify-accent">Your Orders</h2>
          <Lottie animationData={ordersLottie} className='h-[50px]' />
        </div>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col ">
              <p className="text-gray-600 mb-2 text-lg font-semibold">Total Amount: <span className="font-bold text-spotify-accent">₹{order.totalAmount}</span></p>
              <div className="mt-2">
                <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                <ul className="list-disc ml-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 mb-2">
                      <img src={item.picture} alt={item.title} className="h-16 w-16 object-cover rounded shadow-md mr-2" />
                      <span className="text-md">{item.title} (x{item.quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;