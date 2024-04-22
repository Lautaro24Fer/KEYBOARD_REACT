import "./Keyboard.css";
import { KEYS_NOTES } from "../global/contants";
import Key from "./Key.jsx";

export default function Keyboard({
  keysPressed,
  handleClickNote,
  handleUnclickNote,
}) {
  return (
    <section className="keyboard h-full relative rounded-md">
      {KEYS_NOTES.map((item) => (
        <Key
          key={item.frequency}
          notename={item.musicalNote}
          isPressed={keysPressed.includes(item)}
          handleClickNote={handleClickNote}
          handleUnclickNote={handleUnclickNote}
        />
      ))}
    </section>
  );
}
