/**
 * About section. Uses .title and .para for GSAP split-text scroll animations (see splitText.ts).
 */
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis
          dolores numquam iusto Ratione earum ducimus autem id iure pariatur
          dolorum quae maiores.
        </p>
      </div>
    </div>
  );
};

export default About;
