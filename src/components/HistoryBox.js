import "./HistoryBox.css";
import History from "./History";

export default function display({ historyLog }) {
  return (
    <div className="history-container">
      <h3>History</h3>
      <div className="history-log">
        {historyLog.map((hist, index) => (
          <History key={index} problem={hist.problem} answer={hist.answer} />
        ))}
      </div>
    </div>
  );
}
