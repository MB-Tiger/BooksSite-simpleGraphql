import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiMenu } from "react-icons/fi";

const MainLayout = () => {
  const [isNavbar, setIsNavbar] = useState(false);

  return (
    <>
      <div className="w-full flex space-x-2 items-center h-8 bg-[#F2F3F7] px-4 md:px-9">
        <div className="bg-[#DD7069] w-4 h-4 rounded-full"></div>
        <div className="bg-[#F3BF55] w-4 h-4 rounded-full"></div>
        <div className="bg-[#63C355] w-4 h-4 rounded-full"></div>
      </div>
      <div className="grid grid-cols-4">
        <div
          className={`lg:col-span-1 col-span-4 lg:block ${
            isNavbar ? "block" : "hidden"
          }`}
        >
          <Navbar setIsNavbar={setIsNavbar} />
        </div>
        <div className="lg:col-span-3 col-span-4 border-t border-l">
          <div
            className="lg:hidden block container mt-4"
            onClick={() => setIsNavbar(true)}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiMenu className="text-2xl" />
              <div>Menu</div>
            </div>
          </div>
          <Outlet />
          <div
            className={`w-full top-0 min-h-screen bg-black bg-opacity-40 z-[49] ${
              isNavbar ? "fixed" : "hidden"
            }`}
            onClick={() => setIsNavbar(false)}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
