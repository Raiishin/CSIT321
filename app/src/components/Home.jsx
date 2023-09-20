// Body.jsx
import React from 'react';
import './style.css'; // Import the corresponding CSS file
import img1 from '../assets/homeimg.jpg';
import img2 from '../assets/contact-hq.jpg';

function Home() {
  return (
    <div className='grid grid-cols-2 gap-10 pt-20 pl-6 pr-6 min-w-[100%] min-h-[100%]'>
        <div className='basis-2/5 pt-10 pl-32 min-w-[70%]'><img src={img1} alt="homeimg" class='max-w-full max-h-full '/></div>
        <div className='basis-2/5 pt-24 pl-20'>
        <h1 className='text-4xl sm:text-4xl font-bold text-[#ccd6f6]'>Welcome to SIM!</h1>
            
        <p className='w-96 text-[#ccd6f6] inline-block pt-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci semper, faucibus est luctus, ornare augue. Pellentesque ex ex, 
        dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justo.
        Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue 
        et a justo.Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justosimp.</p></div>
        
        <div className=' basis-2/5 pt-2 pl-32'><img src={img2} alt="contact-hq" class='pt-10'/>

        </div>
        <div className='basis-2/5 pt-20 pl-20'>
        <p className='w-96 text-[#ccd6f6] inline-block pt-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci semper, faucibus est luctus, ornare augue. Pellentesque ex ex, 
        dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justo.
        Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue 
        et a justo.Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justosimp.
        Curabitur sit amet orci semper, faucibus est luctus, ornare augue. Pellentesque ex ex, 
        dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justo.</p>
        </div>
    </div>
      
  );
}

export default Home;