import React, { useEffect, useRef, useState } from 'react';

const Oneko = () => {
  const nekoRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !nekoRef.current) return;

    const nekoEl = nekoRef.current;
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 10;
    
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation == null
      ) {
        let availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          availableIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          availableIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          availableIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          availableIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0)
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    const handleMouseMove = (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    let lastFrameTimestamp;

    function onAnimationFrame(timestamp) {
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
    }

    animationFrameId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  const handleCatHover = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1000);
  };

  return (
    <>
      <div
        ref={nekoRef}
        id="oneko"
        aria-hidden="true"
        style={{
          width: "32px",
          height: "32px",
          position: "fixed",
          pointerEvents: "auto",
          imageRendering: "pixelated",
          zIndex: 9999,
          backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')",
          cursor: "pointer",
        }}
        onMouseEnter={handleCatHover}
      />
      {showHearts && (
        <div
          style={{
            position: "fixed",
            left: nekoRef.current ? `${parseInt(nekoRef.current.style.left) + 16}px` : "0px",
            top: nekoRef.current ? `${parseInt(nekoRef.current.style.top) - 8}px` : "0px",
            pointerEvents: "none",
            zIndex: 10000,
            transform: "translateX(-50%)",
            transition: "all 0.3s ease-out",
          }}
        >
          <div className="flex gap-0.5">
            <span className="text-red-500 text-sm opacity-90" style={{ animation: "heartFloat 1s ease-out" }}>💖</span>
            <span className="text-pink-500 text-sm opacity-90" style={{ animation: "heartFloat 1s ease-out 0.1s" }}>💕</span>
            <span className="text-red-400 text-sm opacity-90" style={{ animation: "heartFloat 1s ease-out 0.2s" }}>💗</span>
          </div>
        </div>
      )}
      <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Oneko;