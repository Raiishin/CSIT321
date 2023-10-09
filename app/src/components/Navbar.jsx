import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../store/globalStore';

import SIMLogo from '../assets/SIM-logo.jpg';
import LoginImage from '../assets/login.jpg';
import { isUndefined } from 'lodash';

//q: how to use flexbox in tailwind? A: https://tailwindcss.com/docs/flexbox

const Navbar = () => {
  const navigate = useNavigate();
  const { userId } = useGlobalStore();

  const NavbarButtons = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Contact Us', route: '/contact' },
    { name: 'FAQs', route: '/faq' }
  ];

  return (
    <div class="flex flex-wrap items-center">
      <div class="p-4 basis-1/5 items-right">
        <img src={SIMLogo} alt="SIMLogo" class="ml-24 mb-2 max-w-[70%] min-w-[70%] min-h-[70%] " />
      </div>

      <div class="text-gold font-bold text-4xl basis-3/5 text-center justify-items-center flex-shrink-0">
        <h1>SINGAPORE INSTITUTE OF MANAGEMENT</h1>
      </div>

      {isUndefined(userId) && (
        <div class="p-5 basis-1/5">
          <button onClick={() => navigate('/login')}>
            <img src={LoginImage} alt="LoginImage" class="ml-24 max-w-[20%]" />
          </button>
        </div>
      )}

      <div className="basis-full bg-light-brown">
        <nav>
          <ul class="pl-8 space-x-10 font-bold flex text-white">
            {NavbarButtons.map(navbarButton => (
              <li
                className="h-12 w-28 bg-red cursor-pointer flex justify-center items-center rounded-lg"
                onClick={() => navigate(navbarButton.route)}
              >
                {navbarButton.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
