import { useGSAP } from "@gsap/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Nav = () => {
  const [dropdown, setdropdown] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
  ];

  // useGSAP(()=>{
  //   gsap.fromTo('.dropdown',{
  //     borderRadius:"50%"
  //   })
  // })


  return (
    <div>
      <div
        onClick={() => setdropdown(!dropdown)}
        className={`z-50 cursor-pointer fixed top-10 right-10 flex flex-col justify-center items-center transition-all duration-300 ${
          dropdown ? "gap-0" : "gap-2"
        }`}
      >
        <div
          className={`h-[3px] w-8 bg-[#c8c8c8] transition-all duration-300 ${
            dropdown ? "rotate-45 translate-y-[1.5px]" : ""
          }`}
        ></div>
        <div
          className={`h-[3px] w-8 bg-[#c8c8c8] transition-all duration-300 ${
            dropdown ? "-rotate-45 -translate-y-[1.5px]" : ""
          }`}
        ></div>
      </div>

     
      <div
        className={`dropdown fixed top-0 right-0 w-full sm:w-1/3 h-screen bg-[#1a1a1a] z-40 transition-transform duration-500 ease-in-out ${
          dropdown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-4xl font-bold text-[#c8c8c8] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
