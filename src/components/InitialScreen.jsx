import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/book.json'; // Adjust the path as needed

const InitialScreen = () => {
  const [showScreen, setShowScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScreen(false);
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    showScreen && (
      <div className="flex justify-center items-center h-screen">
        <Lottie 
          animationData={loadingAnimation} 
          width={200} 
          height={200} 
        />
      </div>
    )
  );
};

export default InitialScreen;
