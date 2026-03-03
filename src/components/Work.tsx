/**
 * Work gallery: horizontal scroll. useGSAP runs once on mount. ScrollTrigger pins
 * the section and scrubs a timeline that translates .work-flex by the total
 * scrollable width (setTranslateX). Cleanup kills the timeline and trigger on unmount.
 */
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  /** Compute total horizontal scroll distance from work-box count and container width */
  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    const padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  /* Placeholder images from Lorem Picsum (replace with /images/yourfile.webp for local) */
  const workImages = [
    "https://picsum.photos/seed/work1/800/600",
    "https://picsum.photos/seed/work2/800/600",
    "https://picsum.photos/seed/work3/800/600",
    "https://picsum.photos/seed/work4/800/600",
    "https://picsum.photos/seed/work5/800/600",
    "https://picsum.photos/seed/work6/800/600",
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {workImages.map((imageUrl, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Project Name</h4>
                    <p>Category</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Javascript, TypeScript, React, Threejs</p>
              </div>
              <WorkImage image={imageUrl} alt={`Project ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
