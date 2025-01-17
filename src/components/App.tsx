import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import ColorBoxDisplay from './ColorDisplay';
import { getColors, sortByCentroid, sortByHex } from '../service/color-service';
import { Options, SimpleRow, SortBy } from '../types';
import RadioBox from './RadioBox';

const aboutThis = `This project is a spin off of jaffer's research into what we know about colors throughout history transposing into the digital space.
Please read more here - https://people.csail.mit.edu/jaffer/Color/Dictionaries`

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<SimpleRow[]>(sortByHex(getColors(Options.All)));
  const [selectedOption, setSelectedOption] = useState<Options>(Options.All);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);

  const handleOptionChange = (value: Options) => {
    setSelectedOption(value);
  };

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value);
  };

  const sortByToFunc: Record<SortBy, (rows: SimpleRow[]) => SimpleRow[]> = {
    [SortBy.Name]: (rows) => rows,
    [SortBy.Hex]: (rows) => sortByHex(rows),
    [SortBy.Centroid]: (rows) => sortByCentroid(rows),
  };
  
  useEffect(() => {
    const colors = query === '' ? getColors(selectedOption) : getColors(selectedOption, x => x.name.toLowerCase().includes(query) || x.hex.includes(query))
    setData(sortByToFunc[sortBy](colors));
  }, [query, selectedOption, sortBy]);

  return (
    <div>
      <h1>Nature Colors <button onClick={() => alert(aboutThis)}>More about this project</button></h1>
      <SearchBox query={query} setQuery={(value) => setQuery(value.toString().toLowerCase())} />
      <RadioBox
        name="Sort By"
        options={SortBy}
        selectedOption={sortBy}
        onChange={handleSortByChange}
      />
      <RadioBox
        name="Reference(s)" 
        options={Options}
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />
      <ColorBoxDisplay data={data} />

    </div>
  );
};

export default App;