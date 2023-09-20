// Body.jsx
import React from 'react';
import './style.css'; // Import the corresponding CSS file
import img1 from '../assets/homeimg.jpg';

function FAQs() {
  return (
    <div className='grid grid-cols-2 gap-10 pt-20 pl-6 pr-6'>
        <div className='basis-2/5 pt-10 pl-32'><h1 className='text-4xl sm:text-4xl font-bold text-[#ccd6f6]'>FAQs</h1>
        <p className='w-96 text-[#ccd6f6] inline-block pt-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci semper, faucibus est luctus, ornare augue. Pellentesque ex ex, 
        dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justo.
        Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue 
        et a justo.Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justosimp. Contact us at 61234567 or
        email to sim123@simmail.com</p>
        
        </div>
        <div className='basis-2/5 pt-24 pl-20'></div>
        <div className=' basis-2/5 pt-2 pl-32'>
        </div>
        <div className=' basis-2/5 pt-10 pr-32'>
        </div>
    </div>
      
  );
}

export default FAQs;