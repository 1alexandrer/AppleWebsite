import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playImg, replayImg, pauseImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const {
    isEnd,
    isLastVideo,
    startPlay,
    videoId,
    isPlaying: isPlaying,
  } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 0.75,
      ease: "power2.out",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoaded = (i, e) => setLoadedData((pre) => [...pre, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vh"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
             
              ease: "power3.out",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }

    return () => {};
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));

        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: false }));
        break;
      default:
        return video;
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#text-vdo", {
      opacity: 1,
      duration: 3,
      delay: 2.3,

      scrollTrigger: {
        trigger: "#text-vdo",
      },
    });
  }, []);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[40vh] h-[24vh]">
              <div className="w-full h-full flex-center rounded-3xl sm:h-full sm:w-full overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[i] = el)}
                  onLoadedMetadata={(e) => {
                    handleLoaded(i, e);
                    console.log("jello");
                  }}
                  muted
                  preload="auto"
                  playsInline={true}
                  id="video"
                  onEnded={() => {
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last");
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
                <div className="absolute top-3 sm:top-2  md:top-12 left-[5%] z=10">
                  {list.textLists.map((text, index) => (
                    <p
                      id="text-vdo"
                      key={text}
                      className="md:text-2xl sm:w-full sm:h-full sm:object-cover text-md font-semibold sm:font-base opacity-0 text-gray-200"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop:blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              onClick={() => {
                // Finish the current video and animation
                if (videoRef.current[videoId]) {
                  videoRef.current[videoId].pause(); // Pause the current video
                  videoRef.current[videoId].currentTime =
                    hightlightsSlides[videoId].videoDuration; // Jump to the end of the current video
                }

                // Update state to switch to the clicked video
                setVideo((prevVideo) => ({
                  ...prevVideo,
                  videoId: i, // Set the clicked span's index as the current video ID
                  isEnd: false, // Reset the end state
                  isPlaying: true, // Set to playing
                  startPlay: true, // Trigger play
                }));

                // Start playing the new video
                if (videoRef.current[i]) {
                  videoRef.current[i].play();
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "playing" : "paused"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
