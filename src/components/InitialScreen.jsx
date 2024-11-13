import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from '../assets/book-loading.gif'; // Adjust the path as needed

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
      <div className="flex justify-center items-center h-screen bg-custom-dark">
        <img src={loadingAnimation} />
      </div>
    )
  );
};

export default InitialScreen;
