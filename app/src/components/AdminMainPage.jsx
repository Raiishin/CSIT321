// Body.jsx
import React from 'react';
import './style.css'; // Import the corresponding CSS file
import editsbtn from '../assets/editsbtn.jpg';
import createacctbtn from '../assets/createacctbtn.jpg';
import logoutbtn from '../assets/logoutbtn.jpg';
import { useNavigate } from 'react-router-dom';

function AdminMainPage() {
    const navigate = useNavigate();

    const navEditAccountPage = () => {
      navigate('/EditAccountPage');
    };
  
    const navCreateAccountPage = () => {
      navigate('/CreateAccountPage');
    };
  
    const navHome = () => {
      navigate('/Home');
    };

  return (
    <div className='fixed grid grid-cols-3 pt-9 w-full'>
        <div class='col-span-3 flex justify-center pt-6 pb-8 bg-zinc-900'>
        <p className='text-[#ccd6f6] text-4xl font-bold'>Welcome SAdmin123!</p></div>

        <div class='col-span-3 flex justify-center pb-4 bg-zinc-900'>
        <p className='text-[#ccd6f6] text-2xl font-bold'>What would you like to do today?</p>
        </div>

        <div className='bg-[#9CFFE7] basis-2/6 flex pb-14 pt-14 items-center justify-center min-w-[70%]'>
        <button onClick={navEditAccountPage}><img src={editsbtn} alt="editsbtn" class='max-w-full max-h-full w-40'/></button></div>

        <div className='bg-[#9CFFE7] basis-2/6 flex pb-14 pt-14 items-center justify-center min-w-[70%]'>
        <button onClick={navCreateAccountPage}><img src={createacctbtn} alt="createacctbtn" class='max-w-full max-h-full w-40'/></button></div>

        <div className=' bg-[#9CFFE7] basis-2/6 flex pb-14 pt-14 items-center justify-center min-w-[70%]'>
        <button onClick={navHome}><img src={logoutbtn} alt="logoutbtn" class='max-w-full max-h-full w-40'/></button></div>


        </div>
        

        
      
  );
}

export default AdminMainPage;