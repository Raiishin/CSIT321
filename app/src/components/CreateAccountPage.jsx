import React from 'react';

const CreateAccountPage = () => {
  return (
    <div className=" grid grid-cols-2 pt-9 w-full">
      <div class="col-span-2 flex justify-center pt-6 pb-8 ">
        <p className="text-[#ccd6f6] text-4xl font-bold">Create New Account</p>
      </div>

      <div class="col-span-2 ml-20 mr-20 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">First Name:</p>
        <input class="ml-2 w-[15%] rounded" type="text" name="name" />

        <p className="text-[#ccd6f6] text-2xl font-bold ml-4">Last Name:</p>
        <input class="ml-2 w-[15%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 ml-8 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">Address:</p>
        <input class="ml-2 w-[37.4%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 ml-16 mr-1 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">Email:</p>
        <input class="ml-2 w-[38.3%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 ml-2 mr-12 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">Confirm Email:</p>
        <input class="ml-2 w-[38%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 ml-3 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">Password:</p>
        <input class="ml-2 w-[37%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 mr-28 ml-6 flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] text-2xl font-bold">Confirm Password:</p>
        <input class="ml-2 w-[40.4%] rounded" type="text" name="name" />
      </div>

      <div class="col-span-2 mr- flex justify-center pt-4 ">
        <p className="text-[#ccd6f6] ml-16 text-2xl font-bold">Type:</p>
        <label className="text-[#ccd6f6] text-2xl font-bold ml-10">
          <input type="radio" name="options" value="option1" className="ml-2" />
          Student
        </label>
        <label className="text-[#ccd6f6] text-2xl font-bold ml-6">
          <input type="radio" name="options" value="option1" className="ml-2" />
          Staff
        </label>
        <label className="text-[#ccd6f6] text-2xl font-bold ml-6">
          <input type="radio" name="options" value="option1" className="ml-2" />
          Admin
        </label>
        <button class="bg-[#75c058] text-white font-bold py-1 px-12 rounded ml-14">Create</button>
      </div>
    </div>
  );
};

export default CreateAccountPage;
