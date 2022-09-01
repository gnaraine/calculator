import "./History.css";
import { Textfit } from "react-textfit";

export default function history({ answer, problem }) {
  return (
    <div className="history">
      <Textfit mode="single" max={16}>
        <p className="problem">{problem}</p>
      </Textfit>
      <p className="answer">{answer}</p>
    </div>
  );
}
