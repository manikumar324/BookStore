import Lottie from 'lottie-react';
import React, { useState, useEffect } from 'react';
import hello from "../../assets/hello.json";
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaRedo } from 'react-icons/fa';
import { IoLogoDropbox } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Cookie from "js-cookie"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';


const AboutMe = () => {
  const [load,setLoad] = useState(false)
  const [location, setLocation] = useState("Location Not Found");
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const storedUser = JSON.parse(localStorage.getItem("bookUser"));
  const name = storedUser ? storedUser.name : "Guest";


  const navigate = useNavigate()

  const fetchLocation = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      if (data) {
        setLocation(`${data.display_name}`);
      } else {
        setLocation("Location Not Found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation("Location Not Found");
    }
  };

  const getGeolocation = () => {
    setLoad(true)
    setTimeout(()=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
            fetchLocation(latitude, longitude);
            setLoad(false)
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLocation("Unable to retrieve location");
          }
        );
      } else {
        setLocation("Geolocation not supported by this browser.");
      }
    },1000)
  };

 


  const fetchOrders = async() =>{
    navigate("/orders")
  }

  useEffect(() => {
    const SM = JSON.parse(localStorage.getItem("bookUser"))
    const email = SM.email.toLowerCase()
    getGeolocation(); 
    
  }, []);

  const logout = () =>{
    localStorage.removeItem("bookUSer")
    Cookie.remove("userToken")
    
    toast("Logged Out")
    setTimeout(() => {
      navigate("/login")
    }, 2000);
  }

  
  return (
    <div className='flex flex-col bg-custom-dark h-screen overflow-y-auto items-start pb-5'>
      <Toaster/>
      <div className='bg-gradient-to-r from-black to-white shadow-xl w-full h-[250px] flex items-start'>
        <Link to="/">
          <Lottie animationData={hello} className='h-[250px] w-[150px]' />
        </Link>
        
        <TypeAnimation 
          sequence={[
            `Book Bazaar Welcomes You`, 1000,
            `Book Bazaar Welcomes You, ${name.toUpperCase()}!`, 1000,
          ]}
          wrapper="span"
          speed={30}
          style={{ 
            fontSize: '1.8em',
            fontWeight: 'bold',
            color: '#4A4A4A', 
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)',
            alignSelf: 'center',
            fontFamily: "monospace",
            marginLeft: '20px',
            transition: 'color 1s ease',
          }}
          repeat={Infinity}
        />
      </div>

      <div className='mt-6 w-full px-6'>
        <div className='bg-white p-2 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-shadow duration-300 ' onClick={fetchOrders}>
          <IoLogoDropbox className='h-[35px] text-spotify-accent text-[40px]' />
          <h1 className='ml-4 text-2xl font-semibold text-gray-800'>Orders</h1>
        </div>

        <hr className='my-4 border-t-2 border-gray-300' />

        <div className='bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow duration-300'>
          <div className='flex items-center w-full'>
            <FaLocationDot className='text-spotify-accent text-[30px]' />
            <div className='ml-2 h-[50px] overflow-y-auto  rounded-lg text-xs font-semibold text-gray-800 w-full md:max-w-xs'>
              {location}
            </div>
          </div>
          
          {load ? (
            <span className='ml-1 mt-1'>
            <RotatingLines
        strokeColor="#3498db"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
        className="ml-2"
      /></span>
            )
            :
            (<button onClick={getGeolocation} className='mt-2 bg-custom-dark p-[7px] shadow-2xl  rounded-full  md:mt-0 md:ml-4 text-spotify-accent hover:text-green-500 transition duration-300'>
            <FaRedo className='h-[20px] w-[20px]' />
          </button>)
          }
        </div>

        <hr className='my-4 border-t-2 border-gray-300' />
        

        <div className='flex align-bottom justify-center mt-6'>
          <button onClick={logout} className='bg-red-600 text-white w-full py-3 rounded-lg flex items-center justify-center font-bold shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105'>
            <FaSignOutAlt className='mr-2' /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;