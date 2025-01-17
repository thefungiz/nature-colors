import React from 'react';

interface RadioBoxProps<T extends string> {
  options: Record<string, T>;
  selectedOption: T;
  onChange: (value: T) => void;
  name: string;
}

const RadioBox = <T extends string>({
  options,
  selectedOption,
  onChange,
  name,
}: RadioBoxProps<T>): React.ReactElement => {
  return (
    <form>
      <h3>{name}</h3>
      {Object.values(options).map((option) => (
        <label key={option} style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="radio"
            name="options"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </form>
  );
};

export default RadioBox;
