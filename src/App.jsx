import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { BooksProvider } from './components/Context/BooksContext';
import { CartProvider } from './components/Context/CartContext';
import InitialScreen from './components/InitialScreen';
import AboutMe from './components/HomeScreen/AboutMe';
import Orders from './components/HomeScreen/Orders';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

const HomeScreen = lazy(() => import('./components/HomeScreen/HomeScreen'));
const Login = lazy(() => import('./components/Login/Login'));
const OtpVerify = lazy(() => import('./components/Login/OtpVerify'));
const Cart = lazy(() => import('./components/HomeScreen/Cart'));
const Search = lazy(() => import('./components/HomeScreen/Search'));


const App = () => {
  // const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [showInitialScreen, setShowInitialScreen] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const shouldHideComponents = showInitialScreen || ['/login', '/otp'].includes(location.pathname) || location.pathname === '*';

  return (
    <div className='font-sans'>
      {!shouldHideComponents && <Navbar />}
      {showInitialScreen ? (
        <InitialScreen />
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/otp' element={<OtpVerify />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/about' element={<ProtectedRoute><AboutMe /></ProtectedRoute>} />
            <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
      {!shouldHideComponents && <Footer />}
    </div>
  );
};

const WrappedApp = () => (
  <BooksProvider>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </BooksProvider>
);

export default WrappedApp;