import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Nav from "./components/Nav.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      {" "}
      <Nav />
      <div ref={scrollRef} data-scroll-container className="text-white ">
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
