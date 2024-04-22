/* eslint-disable react/prop-types */
//SET_OSC_TYPE

export default function OscConfig({ dispatch }) {
  const handleWaveformChange = ({ target: { value } }) => {
    dispatch({ type: "SET_OSC_TYPE", payload: value });
  };

  return (
    <form
      className="bg-slate-200 lg:flex justify-around lg:h-full lg:backdrop:items-center rounded-md radio-waves-container"
      style={{ backgroundColor: "rgb(78, 106, 110)" }}
    >
      <label className="flex gap-2 items-center">
        <input
          type="radio"
          name="waveform"
          value="sine"
          onChange={handleWaveformChange}
          defaultChecked
        />
        Sine
      </label>
      <label className="flex gap-2 items-center ">
        <input
          type="radio"
          name="waveform"
          value="square"
          onChange={handleWaveformChange}
        />
        Square
      </label>
      <label className="flex gap-2 items-center">
        <input
          type="radio"
          name="waveform"
          value="sawtooth"
          onChange={handleWaveformChange}
        />
        Sawtooth
      </label>
      <label className="flex gap-2 items-center">
        <input
          type="radio"
          name="waveform"
          value="triangle"
          onChange={handleWaveformChange}
        />
        Triangle
      </label>
    </form>
  );
}
