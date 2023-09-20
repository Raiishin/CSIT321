import React from 'react';
import HomeImage from '../assets/home.jpg';
import ContactHQImage from '../assets/contact-hq.jpg';

const Home = () => {
  return (
    <div className="grid grid-row-2 gap-10 p-6 bg-light-brown">
      <div className="p-2 flex flex-row">
        <img src={HomeImage} alt="HomeImage" className="max-w-[40%]" />

        <div className="p-8">
          <h1 className="text-4xl sm:text-4xl font-bold text-cyan">Welcome to SIM!</h1>

          <p className="w-3/4 text-cyan inline-block pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci semper,
            faucibus est luctus, ornare augue. Pellentesque ex ex, dictum vel hendrerit sit amet,
            luctus at velit. Mauris in lacus vel ligula elementum congue et a justo. Pellentesque ex
            ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum
            congue et a justo.Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit.
            Mauris in lacus vel ligula elementum congue et a justosimp.
          </p>

          <p className="w-3/4 text-cyan inline-block pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci semper,
            faucibus est luctus, ornare augue. Pellentesque ex ex, dictum vel hendrerit sit amet,
            luctus at velit. Mauris in lacus vel ligula elementum congue et a justo. Pellentesque ex
            ex, dictum vel hendrerit sit amet, luctus at velit. Mauris in lacus vel ligula elementum
            congue et a justo.Pellentesque ex ex, dictum vel hendrerit sit amet, luctus at velit.
          </p>
        </div>
      </div>

      <div className="p-2 flex flex-row">
        <img src={ContactHQImage} alt="ContactHQImage" className="max-w-[40%]" />

        <div className="p-8">
          <p className="w-3/4 text-cyan inline-block pt-4">
            Mauris in lacus vel ligula elementum congue et a justosimp. Curabitur sit amet orci
            semper, faucibus est luctus, ornare augue. Pellentesque ex ex, dictum vel hendrerit sit
            amet, luctus at velit. Mauris in lacus vel ligula elementum congue et a justo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
