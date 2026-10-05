import { useId } from "react";

type Option<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
};

export default function SegmentedControl<T extends string>({
  label,
  value,
  onChange,
  options,
}: SegmentedControlProps<T>) {
  const name = useId();

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-2 p-0 text-sm font-semibold text-stone-900">
        {label}
      </legend>
      <div className="flex gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex-1">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-control border border-stone-200 bg-white px-4 py-3 text-center text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100 peer-checked:border-dusk-500 peer-checked:bg-dusk-500 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dusk-500">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}