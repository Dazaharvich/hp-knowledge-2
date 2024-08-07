'use client'
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-screen py-6 px-5 lg:px-64 bg-[#252525] flex justify-between text-neutral-300 border-r-cyan-200 shadow-cust-xl rounded-md ">
      <span className="text-lg font-semibold flex justify-center items-center"><h2 className='text-3xl'>Knowledge Base</h2></span>
      <ul className="hidden md:flex items-center space-x-5">
        <li className="block text-slate-300 text-xl font-bold my-5 mx-2">menu1</li>
        <li className="block text-slate-300 text-xl font-bold my-5 mx-2">menu2</li>
        <li><button className="bg-[#0634b6] hover:bg-blue-700 hover:border-b-neutral-400 text-white font-bold py-3 px-4 mt-5 rounded-xl">Nuevo Caso</button></li>
      </ul>

      {/* Hamburger Menu */}
      <div className="relative md:hidden">
        <button onClick={toggleMenu} className="space-y-1 group">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>

        {/* Menu */}
        <ul className={`bg-[#252525] w-screen pb-10 absolute top-0 right-0 duration-150 flex flex-col space-y-3 justify-end ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li className="px-10 py-8 ml-auto">
            <button onClick={toggleMenu} className="relative">
              <div className="w-6 h-1 rotate-45 absolute bg-white"></div>
              <div className="w-6 h-1 -rotate-45 absolute bg-white"></div>
            </button>
          </li>
          <li className="flex justify-center w-full py-4 hover:bg-[#202020]">menu1</li>
          <li className="flex justify-center w-full py-4 hover:bg-[#202020]">menu2</li>
          <li className="flex justify-center w-full py-4 hover:bg-[#202020]">menu3</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;