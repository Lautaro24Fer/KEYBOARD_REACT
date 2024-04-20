import "./App.css";
import Piano from "./components/Piano";
import Pizzicato from "pizzicato";
import { KEYS_NOTES_PIANO } from "./global/contants";

export default function App() {
  const key = KEYS_NOTES_PIANO[9].path;

  const sound = new Pizzicato.Sound({
    source: "file",
    options: { path: key },
    function() {
      console.log("loaded");
    },
  });

  return (
    <div>
      <button onClick={() => sound.play()}>Play</button>
      {/* PERMITEDKEYS: ARRAY DE CONSTRAINTS __ MUSICALGROUP: GROUP DE PIZZICATO CON LOS SONIDOS NUEVOS */}
      <Piano />
    </div>
  );
}
