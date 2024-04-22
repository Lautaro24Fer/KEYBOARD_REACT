export default function Key({ notename }) {
  return (
    <div
      className={`${notename.includes("b") ? "black-note" : "white-note"} `}
      id={`${notename}-id`}
      style={{ border: "1px solid black" }}
    ></div>
  );
}
