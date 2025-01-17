import React from 'react';

interface RadioBoxProps<T extends string> {
  options: Record<string, T>;
  selectedOption: T;
  onChange: (value: T) => void;
}

const RadioBox = <T extends string>({
  options,
  selectedOption,
  onChange,
}: RadioBoxProps<T>): React.ReactElement => {
  return (
    <form>
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
