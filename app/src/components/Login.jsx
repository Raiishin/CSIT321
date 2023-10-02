import React, { useEffect } from 'react';
import useGlobalStore from '../store/globalStore';

const Login = () => {
  useEffect(() => {
    useGlobalStore.setState({ userId: 'rzGXmlC15rbKndUyyRIz', userType: 0 });
  }, []);

  const userId = useGlobalStore(state => state.userId);

  console.log('userId', userId);

  return (
    <div className="pt-20">
      <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-[#F0F8FF]">
        <h2 className="text-2xl font-semibold mb-4 text-center	">Sign In</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
            />
          </div>
          <div className="mb-4 pt-5">
            <button
              type="submit"
              className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Login
            </button>
          </div>
          <div className="text-start">
            <a href="/reset-password" className="text-gray-500 hover:underline">
              Forgot Password? Click here
            </a>
          </div>
        </form>
      </div>
      {/* <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name">
              Email:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value="email"></input>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password">
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"></input>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default Login;
