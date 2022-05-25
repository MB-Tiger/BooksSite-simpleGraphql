import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineBook } from "react-icons/ai";
import { RiHealthBookLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="lg:sticky fixed lg:w-full w-3/4 top-0 h-screen p-2 px-5 py-8 md:px-10 bg-[#7692FF] text-white border-t z-50">
      <ul className="space-y-4">
        <Link className="flex items-center space-x-4" to={"/"}>
          <li>
            <img
              className="w-14"
              src={require("../img/MR.Logo2.png")}
              alt="Logo"
            />
          </li>
          <li className="text-xl font-semibold">BlogMo</li>
        </Link>
        <hr className="my-4" />
        <li>
          <div className="inline-block">
            <Link to={"/"} className="flex items-center space-x-2">
              <div className="text-2xl">
                <AiOutlineBook />
              </div>
              <div className="text-lg">Books</div>
            </Link>
          </div>
        </li>
        <li>
          <div className="inline-block">
            <Link to={"/authors"} className="flex items-center space-x-2">
              <div className="text-2xl">
                <AiOutlineUser />
              </div>
              <div className="text-lg">Authors</div>
            </Link>
          </div>
        </li>
        <li>
          <div className="inline-block">
            <Link to={"/createbook"} className="flex items-center space-x-2">
              <div className="text-2xl">
                <RiHealthBookLine />
              </div>
              <div className="text-lg">Create Book</div>
            </Link>
          </div>
        </li>
        <li>
          <div className="inline-block">
            <Link to={"/createauthor"} className="flex items-center space-x-2">
              <div className="text-2xl">
                <AiOutlineUserAdd />
              </div>
              <div className="text-lg">Create author</div>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
