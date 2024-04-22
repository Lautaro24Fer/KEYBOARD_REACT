export default function Key({
  notename,
  isPressed,
  handleClickNote,
  handleUnclickNote,
}) {
  const handleClick = ({ target }) => {
    target.classList.add("pressed");
  };

  const handleUnClick = ({ target }) => {
    target.classList.remove("pressed");
  };

  return (
    <div
      className={`${notename.includes("b") ? "black-note" : "white-note"} ${
        isPressed ? "pressed" : ""
      }`}
      id={`${notename}-id`}
      style={{ border: "1px solid black" }}
      onMouseDown={(e) => {
        handleClick(e);
        handleClickNote(notename);
      }}
      onMouseUp={(e) => {
        handleUnClick(e);
        handleUnclickNote(notename);
      }}
    ></div>
  );
}
