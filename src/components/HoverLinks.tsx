/**
 * Link text with hover effect: duplicate text in .hover-in for CSS-based
 * animation. data-cursor="disable" when cursor is false so custom cursor doesn’t switch.
 */
import "./styles/style.css";

const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div className="hover-link" data-cursor={!cursor && `disable`}>
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
