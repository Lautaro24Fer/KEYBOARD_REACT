/* eslint-disable react/prop-types */
import Pizzicato from "pizzicato";
import { useState, useEffect } from "react";
import { KEYS_NOTES } from "../global/contants";
import StateBoard from "./StateBoard";
import Keyboard from "./Keyboard";
import { decl } from "postcss";

export default function Piano({ SoundSource, SoundProperties }) {
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    const { attack, release } = SoundProperties.envolvent;

    const soundsGroup = pressedKeys.map((key) => {
      const sound = new Pizzicato.Sound({
        source: SoundSource ?? "wave",
        options: {
          frequency: key.frequency,
        },
      });
      sound.attack = attack;
      sound.release = release;
      sound.effects;
      return sound;
    });

    const MUSICAL_GROUP = new Pizzicato.Group(soundsGroup);

    //AGREGAR EFECTOS

    const { filters } = SoundProperties;

    const delay = filters[0];

    const DELAY_EFFECT = new Pizzicato.Effects.Delay({
      feedback: delay.feedback,
      time: delay.time,
      mix: delay.mix,
    });

    MUSICAL_GROUP.addEffect(DELAY_EFFECT);

    //FIN AGREGAR EFECTOS

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
      //MUSICAL_GROUP.removeEffect(DELAY_EFFECT)
    };
  }, [pressedKeys]);

  return (
    <>
      <StateBoard keys={pressedKeys} effects={SoundProperties} />
      <Keyboard keysPressed={pressedKeys} />
    </>
  );
}
