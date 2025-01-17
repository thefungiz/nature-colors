import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import ColorBoxDisplay from './ColorDisplay';
import { getColors, sortByHex } from '../service/color-service';
import { Options, SimpleRow } from '../types';
import RadioBox from './RadioBox';

const aboutThis = `# Sources
# REF: https://people.csail.mit.edu/jaffer/Color/Dictionaries (main resource)
# REF: https://people.csail.mit.edu/jaffer/Color/M.htm (Maerz and Paul, Dictionary of Color, 1st ed.)
# REF: https://people.csail.mit.edu/jaffer/Color/R.htm (Ridgway, Color Standards and Color Nomenclature)
# REF: https://people.csail.mit.edu/jaffer/Color/Dictionaries#nbs-iscc (NBS/ISCC Centroids)`

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<SimpleRow[]>(sortByHex(getColors(Options.R)));
  const [selectedOption, setSelectedOption] = useState<Options>(Options.R);
  const [isSortChecked, setIsSortChecked] = useState(false);

  const handleOptionChange = (value: Options) => {
    setSelectedOption(value);
  };
  
  useEffect(() => {
    const colors = query === '' ? getColors(selectedOption) : getColors(selectedOption, x => x.name.includes(query) || x.hex.includes(query))
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
      <SearchBox query={query} setQuery={setQuery} />
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