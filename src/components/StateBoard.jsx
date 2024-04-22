export default function StateBoard({ keys, effects }) {
  return (
    <div
      className="absolute bottom-0 right-0 m-2 flex flex-col gap-2 text-slate-400 w-min h-max rounded"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.200)" }}
    >
      <div className="text-sm">{JSON.stringify(keys)}</div>
      <div className="">{JSON.stringify(effects)}</div>
    </div>
  );
}
