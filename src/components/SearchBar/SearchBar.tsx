import { useState } from "react";
import filters from "../../imgs/Filters.png";
import filtersActive from "../../imgs/FiltersActive.png";
import search from "../../imgs/search.svg";
import FilterButton from "../FilterButton/FilterButton";

type SearchBarProps = {
  handleFilterResults: (filterObject: {}) => void;
};

export type FilterObjectType = {
  starred?: boolean;
  species?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ handleFilterResults }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [characterFilter, setCharacterFilter] = useState("All");
  const characterFilterOptions = ["All", "Starred", "Others"];

  const [speciesFilter, setSpeciesFilter] = useState("All");
  const speciesFilterOptions = ["All", "Human", "Alien"];

  const handleFilter = () => {
    const filterObject: FilterObjectType = {};

    if (characterFilter !== "All") {
      filterObject.starred = characterFilter === "Starred";
    }

    if (speciesFilter !== "All") {
      filterObject.species = speciesFilter;
    }

    handleFilterResults(filterObject);
    setShowFilters(false);
  };

  return (
    <div className="bg-grey-secondary rounded-lg px-5 py-4 mb-4 flex items-center relative">
      <div
        className={`absolute bg-white shadow-filters rounded-md p-6 w-full left-0 top-16 z-10 ${
          !showFilters && "hidden"
        }`}
      >
        <h5 className="text-grey text-sm font-medium mb-2">Character</h5>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {characterFilterOptions.map((item) => (
            <FilterButton
              key={item}
              active={characterFilter === item}
              label={item}
              handleClick={() => setCharacterFilter(item)}
            />
          ))}
        </div>

        <h5 className="text-grey text-sm font-medium mb-2">Specie</h5>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {speciesFilterOptions.map((item) => (
            <FilterButton
              key={item}
              active={speciesFilter === item}
              label={item}
              handleClick={() => setSpeciesFilter(item)}
            />
          ))}
        </div>

        <button
          className="rounded-lg w-full text-white bg-primary-600 font-medium text-sm py-2 h-10"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
      <img className="mr-2" src={search} alt="Search" />
      <input
        type="text"
        className="bg-transparent flex-1"
        placeholder="Search or filter results"
      />
      <img
        className="cursor-pointer"
        src={showFilters ? filtersActive : filters}
        alt="Filters"
        onClick={() => setShowFilters(!showFilters)}
      />
    </div>
  );
};

export default SearchBar;
