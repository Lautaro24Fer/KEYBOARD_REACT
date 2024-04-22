import { useReducer } from "react";
import "./App.css";
import Piano from "./components/Piano";
import PianoControllers from "./components/PianoControllers";
import OscConfig from "./components/OscConfig";
import InputControlled from "./components/InputControlled";

export default function App() {
  const initialState = {
    volume: {
      level: 0.5,
    },
    envolvent: {
      attack: 0,
      release: 0,
    },
    filters: [
      {
        name: "delay",
        feedback: 0,
        time: 0,
        mix: 0,
        isUsing: true,
      },
    ],
    oscilator: {
      type: "sine",
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ENVOLVENT_ATTACK":
        return {
          ...state,
          envolvent: { ...state.envolvent, attack: action.payload },
        };
      case "SET_ENVOLVENT_RELEASE":
        return {
          ...state,
          envolvent: { ...state.envolvent, release: action.payload },
        };
      case "SET_EFFECTS":
        return {
          ...state,
          filters: state.filters.map((filter) => {
            if (filter.name.toLowerCase() === action.name.toLowerCase()) {
              return {
                ...filter,
                [action.field.toLowerCase()]: action.payload.toLowerCase(),
              };
            }
            return filter;
          }),
        };
      case "SET_OSC_TYPE":
        return {
          ...state,
          oscilator: { ...state.oscilator, type: action.payload },
        };
      case "SET_VOLUME":
        return {
          ...state,
          volume: { ...state.volume, level: action.payload },
        };
      default:
        return;
    }
  };

  const [synthConfig, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="rounded-3xl px-10 app-component">
      <div className="piano-controllers-container font-light text-slate-300">
        <PianoControllers dispatch={dispatch} />
        <div className="error-404-not-found-container">
          <div className="font-light md:text-3xl lg:text-4xl h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-center">Sorry, we're still cooking👨🏻‍🍳</h1>
            <p>New effects soon!</p>
          </div>
        </div>
      </div>
      <div className="oscilator-container text-slate-300">
        <OscConfig dispatch={dispatch} />
        <div
          className="flex flex-col gap-2 text-slate-300 p-3 rounded-md"
          style={{ backgroundColor: "rgb(78, 106, 110)" }}
        >
          <InputControlled
            effectName="volumen"
            inputName="Volumen"
            id="volumen-id"
            max={1}
            defaultValue={1}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div className="piano-container">
        <Piano SoundProperties={synthConfig} />
      </div>
    </div>
  );
}
