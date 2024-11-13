import axios from "axios";
import React, { useState } from "react";
import login from "../../assets/log-in.json"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const[name,setName] = useState("")
  const [email, setEmail] = useState("");
  const[loading,setIsLoading] = useState(false)
  const [Otp, setOtp] = useState("");
  const navigate = useNavigate();

  const OnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onNameChange = (e) =>{
    setName(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    

    try {
      const response = await axios.post("https://bookbazaarserver.onrender.com/login", {name,email})
      if (response.status === 200) {
        toast.success(response.data.message);
        setOtp(response.data.data);
        localStorage.setItem("bookUser", JSON.stringify({ name : name, email:email }));
        setIsLoading(false)
        const emailData = response.data.mail;

        setTimeout(()=>{
          navigate("/otp", { state: { Otp: response.data.data, Email: emailData } });
      },2000)
    }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="bg-white h-screen flex justify-center items-center">
        <Toaster />
        <form
          className=" bg-slate-400 m-6 shadow-lg  backdrop-blur-3xl w-full drop-shadow-md  flex flex-col p-5 rounded justify-around"
          onSubmit={onFormSubmit}
        >
          <h1 className="text-white text-center italic font-semibold">
            Welcome to <span className=" italic font-bold animate-wiggle">BookBazaar📖</span>
          </h1>
          <Lottie animationData={login} className="h-[150px]"/>
          <Link to="/login"><h1 className="text-white text-xl text-center font-bold">
            Login
          </h1></Link>
          <input
          type="text"
          value={name}
          onChange={onNameChange}
          className="p-2 outline-none text-black mt-6 text-sm bg-white placeholder:text-gray-400 placeholder:text-sm rounded-full"
          placeholder="Enter your Name"
          required/>

          <input
            type="email"
            value={email}
            placeholder="Enter Your Email"
            required
            className="p-2 outline-none text-black mt-6 text-sm bg-white placeholder:text-gray-400 placeholder:text-sm rounded-full"
            onChange={OnChangeEmail}
          />
          {loading ? <button
            type="submit"
            className="bg-gray-600 text-white outline-none font-semibold rounded-lg w-32 mt-6 flex items-center justify-center"
          >
            Sending <span className='ml-1 mt-3'><ThreeDots 
          height="30" 
          width="30" 
          color="#3498db" 
          ariaLabel="three-dots-loading"
        /></span>
          </button> : <button
            type="submit"
            className="bg-spotify-accent text-white outline-none font-semibold rounded-lg w-24 p-2 mt-6"
          >
            Send Otp
          </button>}
        </form>
      </div>
    </>
  );
};

export default Login;