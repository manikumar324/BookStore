import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () =>{
    return(
        <div className="flex justify-center items-center h-screen bg-black">
      <RotatingLines
        strokeColor="#28a745"
        strokeWidth="5"
        animationDuration="0.75"
        width="45"
        visible={true}
        className="ml-2"
      />
    </div>
    )
}

export default Loader;