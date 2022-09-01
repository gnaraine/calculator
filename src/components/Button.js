import "./Button.css";

export default function Button({ className, value, onClick }) {
  return (
    <div>
      <button className={className} value={value} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}
