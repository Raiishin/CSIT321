import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';

const Navbar = props => {
  const navigate = useNavigate();

  const isUserLoggedIn = true; // Change to reference global store/state

  const ClickableLink = ({ link, text }) => (
    <a
      className="text-xs m-1 md:m-4 lg:m-4 cursor-pointer text-brown"
      onClick={() => navigate(link)}>
      {text}
    </a>
  );

  return (
    <div className="flex justify-between pl-2 pr-4 bg-light-brown">
      {/* <div className="m-4 cursor-pointer flex" onClick={() => navigate('/')}>
        <img src={logo} className="w-[70px]"></img>
        <h1 className="text-brown">Cinematic Adventures</h1>
      </div> */}

      <div className="m-4 self-center flex">
        <ClickableLink link="/" text="Home" />
        <ClickableLink link="/promotions" text="Promotions" />
        {isUserLoggedIn ? (
          <div className="flex mt-2">
            <img src={avatar} className="w-[40px] mr-2" onClick={() => navigate('/profile')}></img>
            <div
              className="mt-1"
              // onClick={() => reset()}
            >
              <ClickableLink link="/login" text="Logout" />
            </div>
          </div>
        ) : (
          <ClickableLink link="/login" text="Login" />
        )}

        {/* <div className="">
          {accessLevel === userTypeEnum.MANAGEMENT && (
            <div className="flex">
              <ClickableLink link="/report" text="View Reports" />
            </div>
          )}

          {accessLevel === userTypeEnum.ADMIN && (
            <div className="flex">
              <ClickableLink link="/manage-movies" text="Manage Movies" />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
