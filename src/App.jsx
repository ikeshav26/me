import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Nav from "./components/Nav.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollPosition from "./components/ScrollPosition.jsx";
import Oneko from "./components/Oneko.jsx";

const App = () => {
  const scrollRef = useRef(null);
  const [locomotiveInstance, setLocomotiveInstance] = React.useState(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
    });

    setLocomotiveInstance(locomotiveScroll);

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      {" "}
      <Nav />
      <Oneko />
      <ScrollPosition locomotiveScroll={locomotiveInstance}/>
      <div ref={scrollRef} data-scroll-container className="text-white ">
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
