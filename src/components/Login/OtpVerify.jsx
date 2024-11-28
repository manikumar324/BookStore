import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import toast, { Toaster } from "react-hot-toast";
import login from "../../assets/login.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { RotatingLines } from 'react-loader-spinner';
import Cookie from "js-cookie";

const OtpVerify = () => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const[loading,setIsLoading] = useState(false)
  const[reload,setReload] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();       //Used to Accesses data passed from the previous component.
  const { Email, Otp } = location.state || {}; // Access Email and Otp from previous component
  //auto email verification
 

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;

    if (value && index < otpDigits.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtpDigits(newOtpDigits);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (e.key === "ArrowRight" && index < otpDigits.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (Otp) {
        setOtpDigits(Otp.split("")); // Auto-fill OTP in input
        setIsLoading(true)
      setTimeout(()=>{
        handleSubmit();              // Call submit function automatically
        setIsLoading(false)
      },1000)
    }
  }, [Otp]); // Runs only if Otp is present in location state
  

  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    setIsLoading(true)

    // const enteredOtp = otpDigits.join("");
    // console.log("Entered OTP:", enteredOtp);

    try {
      // const otpToSubmit = Otp; // Use the OTP from location.state directly
      const response = await axios.post("https://bookstoreserver-k47w.onrender.com/validate-otp", {
        enteredOtp : Otp, // Send the OTP retrieved from location.state
        Email, // Send the email for validation
      });

      if (response.data.success) {
        // toast.success(response.data.message);
        Cookie.set("userToken",response.data.token)
        // setIsLoading(false)
        setTimeout(()=>{
          navigate("/")
      },2000)
      } else {
        toast.error(response.data.message);
        
      }
    } catch (error) {
      toast.error("Invalid Otp");
      
    }
  };

  const handleResendOtp = async () => {
    setReload(true)
    try {
      const response = await axios.post("https://bookstoreserver-k47w.onrender.com/resend-otp", {
        email: Email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setReload(false)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <form
        className="bg-slate-400 m-10 backdrop-blur-3xl p-6 rounded shadow-lg flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-lg mb-4 text-center italic font-normal">
          Enter OTP sent to {Email}
        </h2>

        <Lottie animationData={login} className="h-[150px]"/>

        <div className="flex mt-2 justify-around">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-9 rounded-full backdrop-blur-xl ml-2 h-9 text-center text-xl border-2 border-spotify-accent bg-slate-400 placeholder:text-white ${
                digit ? "bg-main text-white font-bold" : ""
              }`}
              style={{
                borderColor: digit ? "transparent" : "black",
                backgroundColor: digit ? "black" : "transparent",
              }}
              placeholder=""
            />
          ))}
        </div>
        {loading ?<button
          type="submit"
          className="bg-gray-600  text-white rounded-lg w-full p-2 mt-6 font-bold flex items-center justify-center"
        >
          Verifying <span className='ml-1 mt-1'>
          <RotatingLines
      strokeColor="#3498db"
      strokeWidth="5"
      animationDuration="0.75"
      width="30"
      visible={true}
      className="ml-2"
    /></span>
        </button> :<button
          type="submit"
          className="bg-spotify-accent  text-black rounded-lg w-full p-2 mt-6 font-bold "
        >
          Verified
        </button>}
        <br />
        <hr />
        <br />

        {reload ?<button
          type="button"
          onClick={handleResendOtp} // Call the resend function on click
          className="text-black text-center mb-4 w-full font-bold flex items-center justify-center"
        >
          Sending  <ThreeDots 
          height="30" 
          width="30" 
          color="#3498db" 
          ariaLabel="three-dots-loading" 
          className="ml-2"
        />
        </button>:<button
          type="button"
          onClick={handleResendOtp} // Call the resend function on click
          className="text-black text-center mb-4 w-full font-bold"
        >
          Resend OTP ?
        </button>}
      </form>
    </div>
  );
};

export default OtpVerify;