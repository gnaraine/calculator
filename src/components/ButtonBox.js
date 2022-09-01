import Button from "./Button";
import "./ButtonBox.css";

export default function ButtonBox({ onClick, functions, numbers, operations }) {
  return (
    <>
      <div className="button-container">
        <div className="functions">
          {functions.map((btn) => (
            <Button key={btn} value={btn} onClick={onClick} />
          ))}
        </div>

        <div className="numbers">
          {numbers.map((btn) => (
            <Button key={btn} value={btn} onClick={onClick} />
          ))}
        </div>

        <div className="operations">
          {operations.map((btn) => (
            <Button key={btn} value={btn} onClick={onClick} />
          ))}
        </div>
      </div>
    </>
  );
}
