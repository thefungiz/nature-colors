import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import ColorBoxDisplay from './ColorDisplay';
import { getColors, sortByCentroid, sortByHex } from '../service/color-service';
import { Options, SearchBy, SimpleRow, SortBy } from '../types';
import RadioBox from './RadioBox';

const aboutThis = `This project is a spin off of jaffer's research into what we know about colors throughout history transposing into the digital space.
Please read more here - https://people.csail.mit.edu/jaffer/Color/Dictionaries
Source Code https://github.com/thefungiz/nature-colors`

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<SimpleRow[]>(sortByHex(getColors(Options.All)));
  const [selectedOption, setSelectedOption] = useState<Options>(Options.All);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.Name);

  const handleOptionChange = (value: Options) => {
    setSelectedOption(value);
  };

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value);
  };

  const handleSearchByChange = (value: SearchBy) => {
    setSearchBy(value);
  };

  const searchByToFunc: Record<SearchBy, (value: SimpleRow, index: number, array: SimpleRow[]) => unknown> = {
    [SearchBy.Name]: x => x.name.toLowerCase().includes(query),
    [SearchBy.Hex]: x => x.hex.toLowerCase().includes(query),
    [SearchBy.Centroid]: x => x.centroidNumber.includes(query),
  };

  const sortByToFunc: Record<SortBy, (rows: SimpleRow[]) => SimpleRow[]> = {
    [SortBy.Name]: (rows) => rows,
    [SortBy.Hex]: (rows) => sortByHex(rows),
    [SortBy.Centroid]: (rows) => sortByCentroid(rows),
  };
  
  useEffect(() => {
    const colors = query === '' ? getColors(selectedOption) : getColors(selectedOption, searchByToFunc[searchBy])
    setData(sortByToFunc[sortBy](colors));
  }, [query, selectedOption, sortBy]);

  let markup = ''
  markup += '<div class="color-box-container">\n'
  data.forEach(x => markup += `<div style="background-color: #${x.hex}" class="color-box"><div>${x.name}</div><div>#${x.hex}</div></div>\n`)
  markup += '</div>\n'
  console.log(markup)

  return (
    <div>
      <h1>Nature Colors <button onClick={() => alert(aboutThis)}>More about this project</button></h1>
      <SearchBox query={query} setQuery={(value) => setQuery(value.toString().toLowerCase())} />
      <RadioBox
        name="Search By"
        options={SearchBy}
        selectedOption={searchBy}
        onChange={handleSearchByChange}
      />
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
