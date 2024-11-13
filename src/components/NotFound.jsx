import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/notfound.json'; 
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(6);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark text-white">
      <Link to ="/not-found">
      <Lottie animationData={notFoundAnimation} width={300} height={300} />
      </Link>
      <h1 className='text-purple-600'>Returning to home in <span className='text-spotify-accent font-bold'>{timer}</span> seconds...</h1>
    </div>
  );
};

export default NotFound;