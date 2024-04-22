import "./Keyboard.css";
import { KEYS_NOTES } from "../global/contants";
import Key from "./Key.jsx";

export default function Keyboard() {
  return (
    <section className="keyboard h-full relative rounded-md">
      {KEYS_NOTES.map((item) => (
        <Key key={item.frequency} notename={item.musicalNote} />
      ))}
    </section>
  );
}
