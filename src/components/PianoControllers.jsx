import InputControlled from "./InputControlled";

export default function PianoControllers({ dispatch }) {
  return (
    <>
      <div className="relative envolve-container">
        <h3 className="absolute top-0 right-0 m-2">Envolve</h3>
        <InputControlled
          effectName="envolve"
          inputName="Attack"
          id="envolve-attack-id"
          min={0}
          max={3}
          step={0.1}
          defaultValue={0}
          dispatch={dispatch}
        />
        <InputControlled
          effectName="envolve"
          inputName="Release"
          id="envolve-release-id"
          min={0}
          max={3}
          step={0.1}
          defaultValue={0}
          dispatch={dispatch}
        />
      </div>
      <div className="relative delay-container">
        <h3 className="absolute top-0 right-0 m-2">Delay</h3>
        <InputControlled
          effectName="Delay"
          inputName="Feedback"
          id="delay-feedback-id"
          min={0}
          max={3}
          step={0.1}
          defaultValue={0}
          dispatch={dispatch}
        />
        <InputControlled
          effectName="delay"
          inputName="Time"
          id="delay-time-id"
          min={0}
          max={3}
          step={0.1}
          defaultValue={0}
          dispatch={dispatch}
        />
        <InputControlled
          effectName="delay"
          inputName="Mix"
          id="delay-mix-id"
          min={0}
          max={3}
          step={0.1}
          defaultValue={0}
          dispatch={dispatch}
        />
      </div>
      <div className="relative reverb-container"></div>
      <div className="relative convolver-container"></div>
      <div className="relative tremolo-container"></div>
      <div className="relative lps-container"></div>
      <div className="relative hpf-container"></div>
    </>
  );
}
