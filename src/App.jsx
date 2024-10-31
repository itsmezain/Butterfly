import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [xValue, setxValue] = useState(0);
  const [Rotate, setRotate] = useState(0);
  const [yValue, setyValue] = useState(0);

  const randomX = gsap.utils.random(-500, 500, 200);
  const randomRotate = gsap.utils.random(-360, 720, 30);
  const randomY = gsap.utils.random(-300, 300, 200);

  const flyref = useRef();

  useGSAP(() => {
    gsap.to(flyref.current, {
      x: xValue,
      y: yValue,
      duration: 1.5,
      rotate: Rotate,
      ease: "power1.inOut",
      onComplete: () => {
        // Add a shake effect after moving
        gsap.fromTo(flyref.current, { rotation: -10 }, { rotation: 10, duration: 0.2, yoyo: true, repeat: 5 });
      }
    });
    
    // Floating effect
    gsap.to(flyref.current, {
      y: "+=5",
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, [xValue, yValue, Rotate]);

  return (
    <main>
      <img
        ref={flyref}
        src="https://www.pngarts.com/files/12/Blue-Butterflies-PNG-Image-Background.png" // Beautiful butterfly image
        alt="Beautiful Butterfly"
        onClick={() => {
          setxValue(randomX);
          setRotate(randomRotate);
          setyValue(randomY);
        }}
      />
    </main>
  );
};

export default App;