/* eslint-disable react/prop-types */
import Pizzicato from "pizzicato";
import { useState, useEffect } from "react";
import { KEYS_NOTES } from "../global/contants";
import Keyboard from "./Keyboard";

export default function Piano({ SoundSource, SoundProperties }) {
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    const { attack, release } = SoundProperties.envolvent;

    const { oscilator } = SoundProperties;

    const soundsGroup = pressedKeys.map((key) => {
      var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
        frequency: 135,
        peak: 1,
      });
      const sound = new Pizzicato.Sound({
        source: SoundSource ?? "wave",
        options: {
          frequency: key.frequency,
          type: oscilator.type,
        },
      });
      let volumeLevel = parseFloat(SoundProperties.volume.level);

      sound.attack = attack;
      sound.release = release;
      sound.volume = volumeLevel;
      sound.addEffect(lowPassFilter);
      return sound;
    });

    const MUSICAL_GROUP = new Pizzicato.Group(soundsGroup);

    //AGREGAR EFECTOS

    const { filters } = SoundProperties;

    const delay = filters[0];

    if (Number(delay.feedback) + Number(delay.time) + Number(delay.mix) > 0) {
      const DELAY_EFFECT = new Pizzicato.Effects.Delay({
        feedback: delay.feedback,
        time: delay.time,
        mix: delay.mix,
      });

      MUSICAL_GROUP.addEffect(DELAY_EFFECT);
    }

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
    };
  }, [pressedKeys]);

  const handleClickNote = (note) => {
    const index = KEYS_NOTES.findIndex((k) => k.musicalNote === note);

    if (index > -1 && !pressedKeys.includes(KEYS_NOTES[index])) {
      const newPressedKeys = [...pressedKeys];
      newPressedKeys.push(KEYS_NOTES[index]);
      setPressedKeys(newPressedKeys);
    }
  };

  const handleUnclickNote = (note) => {
    const index = pressedKeys.findIndex((k) => k.musicalNote === note);
    if (index > -1) {
      const newPressedKeys = [...pressedKeys];
      newPressedKeys.splice(index, 1);
      setPressedKeys(newPressedKeys);
    }
  };

  return (
    <>
      <Keyboard
        keysPressed={pressedKeys}
        handleClickNote={handleClickNote}
        handleUnclickNote={handleUnclickNote}
      />
    </>
  );
}
