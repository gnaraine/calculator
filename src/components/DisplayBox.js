import "./DisplayBox.css";
import { Textfit } from "react-textfit";

export default function displayBox({ number, calculation }) {
  return (
    <div className="display-container">
      <p className="calculation">{calculation}</p>
      <Textfit mode="single" max={16}>
        <p className="result">{number}</p>
      </Textfit>
    </div>
  );
}
