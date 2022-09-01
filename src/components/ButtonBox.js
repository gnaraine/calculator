import Button from "./Button";
import "./ButtonBox.css";

export default function ButtonBox({onClick}) {
  const functions = ["%", "CE", "C", "1/x", "x^2", "sqrt(x)"];
  const numbers = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
    "+/-",
    ".",
  ];
  const operations = ["<x", "/", "x", "-", "+", "="];

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
