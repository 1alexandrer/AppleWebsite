import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import VideoCarousel from "./VideoCarousel";

function Highlights() {
  // Register the ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#title", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#highlights",
      },
    }
   );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".link", {
      opacity: 1,
      y: 0,
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".link",
      },
    }
   );
  }, []);

  return (
    <section
      id="highlights"
      className="bg-zinc h-full w-screen overflow-hidden common-padding"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full justify-between md:flex  items-baseline">
          <h1 id="title" className="section-heading text-nowrap">
            Get the highlights.
          </h1>
          <div className="flex items-end gap-5 flex-nowrap md:flex md:p-4">
            <p className="link text-nowrap">Watch the trailer</p>
            <p className="link text-nowrap">Watch the event</p>
          </div>
        </div>
      </div>
      <VideoCarousel/>
    </section>
  );
}

export default Highlights;
