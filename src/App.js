import "./App.css";
import { useEffect, useState } from "react";
import HistoryBox from "../src/components/HistoryBox";
import ButtonBox from "./components/ButtonBox";
import DisplayBox from "./components/DisplayBox";

function App() {
  const [number, setNumber] = useState(""); //1
  const [calculation, setCalculation] = useState(""); //2
  const [operation, setOperation] = useState(null); //3
  const [LeftSide, setLeftSide] = useState(null); //4
  const [lastEntry, setLastEntry] = useState(null); //5
  const [answer, setAnswer] = useState(null); //6
  const [historyLog, setHistoryLog] = useState([]); //7

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

  const clickHandler = (e) => {
    setLastEntry(e);
    if (number === "undefined") {
      clearAllClickHandle();
      return;
    }
    if (e === "%") {
      percentClickHandle(e);
    }
    if (e === "CE") {
      clearEntryClickHandle(e);
    }
    if (e === "C") {
      clearAllClickHandle(e);
    }
    if (e === "<x") {
      deleteClickHandle(e);
    }
    if (e === "1/x") {
      inverseClickHandle(e);
    }
    if (e === "x^2") {
      squareClickHandle(e);
    }
    if (e === "sqrt(x)") {
      squareRootClickHandle(e);
    }
    if (e === "/" || e === "x" || e === "+" || e === "-") {
      operationClickHandle(e);
    }
    if (e === "=") {
      equalClickhandle(e);
    }
    if (e === "+/-") {
      signClickHandle(e);
    }
    if (e === ".") {
      decClickHandle(e);
    }
    if (!isNaN(e)) {
      numClickHandle(e);
    }
  };
  const percentClickHandle = (e) => {
    if (number !== "") {
      let ans = (1 / 100) * number;
      setNumber(ans);
      manageHistory(number + " %", ans);
    }
  };
  const clearAllClickHandle = (e) => {
    setNumber("");
    setCalculation("");
    setOperation(null);
    setLeftSide(null);
    setAnswer(null);
  };
  const clearEntryClickHandle = (e) => {
    setNumber("");
  };
  const deleteClickHandle = (e) => {
    let num = number.toString();
    setNumber(num.slice(0, -1));
  };
  const inverseClickHandle = (e) => {
    if (number !== "") {
      let ans = 1 / number;
      setNumber(ans);
      setAnswer(ans);
      manageHistory("1/" + number, ans);
    }
  };
  const squareClickHandle = (e) => {
    if (number !== "") {
      let ans = number * number;
      setNumber(ans);
      setAnswer(ans);
      manageHistory(number + "^2", ans);
    }
  };
  const squareRootClickHandle = (e) => {
    if (number !== "") {
      let ans = Math.sqrt(number);
      setNumber(ans);
      setAnswer(ans);
      manageHistory("sqrt(" + number + ")", ans);
    }
  };
  const signClickHandle = (e) => {
    if (number !== "") {
      setNumber(number * -1);
    }
  };
  const decClickHandle = (e) => {
    if (lastEntry === "=") {
      setCalculation("");
      setOperation(null);
      setLeftSide(null);
      setAnswer(null);
      setNumber("0.");
      return;
    }
    const nums = number + "";
    if (!nums.includes(".")) {
      console.log("does not includes");
      if (number === "") {
        setNumber("0.");
      } else {
        setNumber(number + ".");
      }
    }
  };
  const numClickHandle = (e) => {
    if (number === "undefined") {
      setNumber(e);
      return;
    }
    if (!isNaN(lastEntry) || lastEntry === "." || lastEntry === "+/-") {
      //is number
      setNumber(number + e);
    } else {
      setNumber(e);
    }
  };
  const operationClickHandle = (e) => {
    if (LeftSide !== null && number !== "" && answer === null) {
      console.log("this");
      let ans = solve(LeftSide, number);
      setOperation(e);
      setLeftSide(ans);
      setNumber(ans);
      return;
    }
    setOperation(e);
    if (number !== "") {
      setLeftSide(number);
    } else if (LeftSide === null) {
      setLeftSide("0");
    }
    setNumber("");
  };
  const equalClickhandle = (e) => {
    let ans = solve(LeftSide, number);
    ans = (ans + "").substring(0, 12);

    setAnswer(ans);
    setNumber(ans);
  };

  const solve = (left, right) => {
    setCalculation(left + " " + operation + " " + right);
    let ans = "";
    if (operation === "x") {
      ans = Number(left) * right;
    }
    if (operation === "/") {
      if (number === "0") {
        ans = "undefined";
        return ans;
      }
      ans = Number(left) / right;
    }
    if (operation === "+") {
      ans = Number(left) + Number(right);
    }
    if (operation === "-") {
      ans = Number(left) - right;
    }
    ans = Number(ans);
    let hist = { problem: left + " " + operation + " " + right, answer: ans };
    setHistoryLog((history) => [hist, ...history]);
    if (historyLog.length >= 9) {
      historyLog.splice(-1);
    }
    return Number(ans);
  };

  const manageHistory = (equation, ans) => {
    let hist = { problem: equation, answer: ans };

    setHistoryLog((history) => [hist, ...history]);

    if (historyLog.length >= 9) {
      historyLog.splice(-1);
    }
  };
  useEffect(() => {
    if (LeftSide !== null && operation !== null) {
      setCalculation(LeftSide + " " + operation);
    }
  }, [LeftSide, operation, lastEntry, number]);

  return (
    <div className="App">
      <div className="grid-container">
        <div className="title">
          <p>Calculator</p>
        </div>
        <DisplayBox number={number} calculation={calculation} />
        <HistoryBox historyLog={historyLog} />
        <ButtonBox
          onClick={(e) => clickHandler(e.target.value)}
          functions={functions}
          operations={operations}
          numbers={numbers}
        />
      </div>
    </div>
  );
}

export default App;
