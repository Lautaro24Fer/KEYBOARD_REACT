/* eslint-disable react/prop-types */
export default function InputControlled({
  effectName,
  inputName,
  id,
  max,
  defaultValue,
  dispatch,
}) {
  const handleOnChange = (e) => {
    if (effectName === "envolve") {
      return dispatch({
        type: `SET_ENVOLVENT_${inputName.toUpperCase()}`,
        payload: e.target.value,
      });
    }
    return dispatch({
      type: "SET_EFFECTS",
      name: effectName,
      payload: e.target.value,
      field: inputName,
    });
  };

  return (
    <>
      <label htmlFor={id} className="text-sm">
        {inputName}
      </label>
      <input
        type="range"
        name={inputName}
        id={id}
        min={0}
        max={max}
        step={0.1}
        defaultValue={defaultValue}
        className="w-3/4"
        style={{ height: "4px", backgroundColor: "black" }}
        onChange={handleOnChange}
      />
    </>
  );
}
