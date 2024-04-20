/* eslint-disable react/prop-types */
import Pizzicato from "pizzicato";
import { useState, useEffect } from "react";
import { KEYS_NOTES } from "../global/contants";

export default function Piano() {
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    const soundsGroup = pressedKeys.map((key) => {
      const sound = new Pizzicato.Sound({
        source: "wave",
        options: {
          frequency: key.frequency,
        },
      });
      return sound;
    });

    const MUSICAL_GROUP = new Pizzicato.Group(soundsGroup);
    MUSICAL_GROUP.play();

    const handleEventKeyDown = (e) => {
      if (e.repeat) {
        return;
      }
      //VALIDACION SI LA KEY ES PERMITIDA
      const index = KEYS_NOTES.findIndex((k) => k.keyboardKey === e.key);
      if (index > -1 && !pressedKeys.includes(KEYS_NOTES[index])) {
        const newPressedKeys = [...pressedKeys];
        newPressedKeys.push(KEYS_NOTES[index]);
        setPressedKeys(newPressedKeys);
      }
    };

    const handleEventKeyUp = (e) => {
      const index = pressedKeys.findIndex((k) => k.keyboardKey === e.key);
      if (index > -1) {
        const newPressedKeys = [...pressedKeys];
        newPressedKeys.splice(index, 1);
        setPressedKeys(newPressedKeys);
      }
    };

    document.addEventListener("keydown", handleEventKeyDown);
    document.addEventListener("keyup", handleEventKeyUp);

    return () => {
      document.removeEventListener("keydown", handleEventKeyDown);
      document.removeEventListener("keyup", handleEventKeyUp);
      MUSICAL_GROUP.stop();
    };
  }, [pressedKeys]);

  return <div>{JSON.stringify(pressedKeys)}</div>;
}
