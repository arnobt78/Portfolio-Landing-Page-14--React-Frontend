/**
 * Header: logo, email link, nav (About, Work, Contact). On desktop, # links
 * are intercepted and smooth-scroll to sections. smoother is a no-op used by initialFX.
 */
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

/** No-op for compatibility with initialFX (replaces ScrollSmoother). */
// eslint-disable-next-line react-refresh/only-export-components
export const smoother = {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  paused: (_value: boolean) => {},
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  scrollTop: (_value: number) => {},
  scrollTo: (selector: string) => {
    const el = document.querySelector(selector);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
};

const Navbar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          const href = element.getAttribute("data-href");
          if (href?.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section instanceof HTMLElement) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Logo
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          example@mail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
