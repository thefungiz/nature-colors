import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import ColorBoxDisplay from './ColorDisplay';
import { getColors, sortByHex } from '../service/color-service';
import { Options, SimpleRow } from '../types';
import RadioBox from './RadioBox';

const aboutThis = `This project is a spin off of jaffer's research into what we know about colors throughout history transposing into the digital space.
Please read more here - https://people.csail.mit.edu/jaffer/Color/Dictionaries`

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<SimpleRow[]>(sortByHex(getColors(Options.All)));
  const [selectedOption, setSelectedOption] = useState<Options>(Options.All);
  const [isSortChecked, setIsSortChecked] = useState(false);

  const handleOptionChange = (value: Options) => {
    setSelectedOption(value);
  };
  
  useEffect(() => {
    const colors = query === '' ? getColors(selectedOption) : getColors(selectedOption, x => x.name.toLowerCase().includes(query) || x.hex.includes(query))
    setData(isSortChecked ? sortByHex(colors) : colors);
  }, [query, selectedOption, isSortChecked]);

  return (
    <div>
      <h1>Nature Colors <button onClick={() => alert(aboutThis)}>More about this project</button></h1>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={isSortChecked}
          onChange={() => setIsSortChecked(!isSortChecked)}
        />
        Sort by Hex
      </label>
      <SearchBox query={query} setQuery={(value) => setQuery(value.toString().toLowerCase())} />
      <RadioBox
        options={Options}
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />
      <ColorBoxDisplay data={data} />

    </div>
  );
};

export default App;