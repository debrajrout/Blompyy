export default function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="radio-togglers flex w-full flex-row  justify-center gap-1  shadow ">
      {options.map((option) => (
        <label
          key={option.value}
          className=" bg-slate-500 px-6 text-white shadow-lg shadow-black/50"
        >
          <input
            type="radio"
            name="bgType"
            onClick={(ev) => onChange(ev.target.value)}
            defaultChecked={defaultValue === option.value}
            value={option.value}
          />
          <div>
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
