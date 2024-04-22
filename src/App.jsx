import { useReducer } from "react";
import "./App.css";
import Piano from "./components/Piano";
import PianoControllers from "./components/PianoControllers";

export default function App() {
  const initialState = {
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
      default:
        return;
    }
  };

  const [synthConfig, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="rounded-3xl px-10 app-component">
      <div className="piano-controllers-container font-light text-slate-300">
        <PianoControllers dispatch={dispatch} />
      </div>
      <div className="piano-container">
        <Piano SoundProperties={synthConfig} />
      </div>
    </div>
  );
}
