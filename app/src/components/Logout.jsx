import React from 'react';

const Logout = () => {
  return (
    <div>
      <div className="py-4">
        <div className="flex flex-col m-8 place-items-center gap-2">
          <p className="text-5xl font-bold text-white">You have logout successfully!</p>
          <p className="text-5xl font-bold text-white">Thank you for using</p>
          <p className="text-5xl font-bold text-white">SIM Attendance Application</p>
          <p className="text-2xl font-bold text-white pt-10">
            Please leave a rating / review to help us improve
          </p>

          <button
            onClick={() =>
              (window.location.href =
                'https://docs.google.com/forms/d/e/1FAIpQLSfdGzaK1cwkOHoNZS1DKdRjenpBGZM8dJJ9Bsd-jAoGICowPw/viewform?usp=sf_link')
            }
            class="mt-6 bg-transparent bg-light-blue font-semibold text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
          >
            Leave Rating / Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
