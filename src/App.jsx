import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [xValue, setxValue] = useState(0);
  const [Rotate, setRotate] = useState(0);
  const [yValue, setyValue] = useState(0);

  const flyref = useRef();

  const handleClick = () => {
    const padding = 10;

    // Get the dimensions of the viewport
    const maxX = (window.innerWidth - flyref.current.clientWidth) / 2;
    const maxY = (window.innerHeight - flyref.current.clientHeight) / 2;

    // Generate random positions within the viewport bounds
    const randomX = gsap.utils.random(-maxX, maxX);
    const randomY = gsap.utils.random(-maxY, maxY);
    const randomRotate = gsap.utils.random(-45, 45);

    setxValue(randomX);
    setRotate(randomRotate);
    setyValue(randomY);
  };

  useGSAP(() => {
    gsap.to(flyref.current, {
      x: xValue,
      y: yValue,
      duration: 1.5,
      rotate: Rotate,
      ease: "power1.inOut",
      onComplete: () => {
        // Add a shake effect after moving
        gsap.fromTo(
          flyref.current,
          { rotation: -10 },
          { rotation: 10, duration: 0.2, yoyo: true, repeat: 5 }
        );
      },
    });
  }, [xValue, yValue, Rotate]);

  // Floating effect
  useGSAP(() => {
    gsap.to(flyref.current, {
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <main>
      <img
        ref={flyref}
        src="https://www.pngarts.com/files/12/Blue-Butterflies-PNG-Image-Background.png" // Replace with your chosen butterfly image URL
        alt="Beautiful Butterfly"
        onClick={handleClick}
      />
    </main>
  );
};

export default App;
