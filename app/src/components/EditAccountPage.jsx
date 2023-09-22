// Body.jsx
import React from 'react';
import './style.css'; // Import the corresponding CSS file
import timetablebtn from '../assets/timetablebtn.jpg';
import takeattendancebtn from '../assets/takeattendancebtn.jpg';
import logoutbtn from '../assets/logoutbtn.jpg';
import Editingbtn from '../assets/Editingbtn.png';

function EditAccountPage() {
  return (
    <div className='fixed grid grid-cols-3 pt-9 w-full'>
        <div class='col-span-3 flex justify-center pt-8 bg-zinc-900'>
        <p className='text-[#ccd6f6] text-4xl font-bold'>Edit Accounts</p></div>

        <div className='w-[90%] col-span-3 fixed max-h-[60%] overscroll-auto overflow-y-auto mt-24 ml-20'>
        <table className='border-collapse bg-gray-50 border-b-2 border-slate-500 w-[100%] font-sans'>
        <thead class='bg-[#dcdcdc]'>
          <tr>
            <th class='p-3 text-sm font-semibold tracking-wide text-left'>No.</th>
            <th class='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
            <th class='p-3 text-sm font-semibold tracking-wide text-left'>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>1</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>John Doe</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>2</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Mickey Mouse</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>3</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>John Wick</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>4</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Donald Trump</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>5</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Donald Duck</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>6</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Nicky Minaj</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>7</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Fred Perry</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>8</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Benjamin Barker</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>8</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Tim Cook</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
          <tr class='bg-white'>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>8</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>Steve Jobs</td>
            <td class='p-3 text-sm font-semibold tracking-wide text-left'>
                <button><img src={Editingbtn} alt="Editingbtn" class='w-6'/></button></td>
          </tr>
        </tbody>
      </table>

        </div>

        </div>
      
  );
}

export default EditAccountPage;