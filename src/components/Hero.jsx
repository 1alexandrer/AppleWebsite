import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { smallHeroVideo, heroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrc = () => {
    window.innerWidth < 760
      ? setVideoSrc(smallHeroVideo)
      : setVideoSrc(heroVideo);
  };
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    return () => {};
  }, []);

  useGSAP(() => {
    gsap.to(".hero-title", { opacity: 1, delay: 1.5 });
    gsap.to("#cta", {opacity:1, translateY: -40, delay: 2.1})
  });
  return (
    <section className="nav-height relative bg-black w-full">
      <div className="h-5/6 flex-center flex-col">
        <p className="hero-title">iPhone 16</p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-32">
        <a href="#highlights" className="border-blue bg-blue rounded-3xl px-5 py-2 hover:bg-[#29a2ff]">Buy</a>
        <p className="py-2 text-xl font-normal"> From $199/mo or $1999</p>
      </div>
    </section>
    
    
  );
};

export default Hero;
