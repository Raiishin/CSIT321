import React from 'react';

import './style.css'; // Import the corresponding CSS file
import logo from '../assets/SIMLogo.jpg';
import logo1 from '../assets/loginlogo.jpg';

//q: how to use flexbox in tailwind? A: https://tailwindcss.com/docs/flexbox

function Navbar() {
  return (
<div class="flex flex-wrap gap-0 h-24 items-center ">
      <div class="bg-white p-4 basis-1/5 items-right "><img src={logo} alt="Logo" class='ml-24 mb-2 max-w-[70%] min-w-[70%] min-h-[70%] '/></div>
      <div class="bg-white text-[#D4B238] font-bold text-4xl basis-3/5 text-center justify-items-center flex-shrink-0"><h1>SINGAPORE INSTITUTE OF MANAGEMENT</h1></div>
      <div class="bg-white p-5 basis-1/5"><button><img src={logo1} alt="loginlogo" class='ml-24 max-w-[20%]'/></button></div>
      <div class='basis-full h-8 bg-[#e74343] justify-items-left'>
      <nav>
        <ul class="ml-20 space-x-40 px-5 font-bold flex mt-1 text-white">
        <li><a href="Home">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/ContactUs">Contact Us</a></li>
        <li><a href="/FAQs">FAQs</a></li>
       </ul>
    </nav>
      </div>
      <div className='basis-full bodyheight bg-zinc-900'></div>
    </div>

    );
}

export default Navbar;