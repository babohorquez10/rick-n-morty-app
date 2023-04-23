import { useState } from "react";
import FilterButton from "../FilterButton/FilterButton";
import {
  setFilters,
  setSortOrder,
} from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";
import { MobileView, isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import arrowIcon from "../../imgs/Arrow.png";

export type FilterObjectType = {
  starred?: boolean;
  species?: string;
};

const Filters = () => {
  const dispatch = useAppDispatch();
  const [characterFilter, setCharacterFilter] = useState("All");
  const characterFilterOptions = ["All", "Starred", "Others"];

  const [speciesFilter, setSpeciesFilter] = useState("All");
  const speciesFilterOptions = ["All", "Human", "Alien"];

  const [sortOrder, setCharacterSortOrder] = useState("Default");
  const sortOrderOptions = ["Default", "A-Z", "Z-A"];

  const handleFilter = () => {
    const filterObject: FilterObjectType = {};

    if (characterFilter !== "All") {
      filterObject.starred = characterFilter === "Starred";
    }

    if (speciesFilter !== "All") {
      filterObject.species = speciesFilter;
    }

    dispatch(setSortOrder(sortOrder));
    dispatch(setFilters(filterObject));
  };

  return (
    <div className={isMobile ? "px-6 py-4 h-screen" : ""}>
      <MobileView>
        <div className="flex mb-4">
          <Link to="/">
            <img className="w-6 mb-6" src={arrowIcon} alt="Back" />
          </Link>
          <span className="flex-1 text-center font-semibold text-base">
            Filters
          </span>
        </div>
      </MobileView>

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

      <h5 className="text-grey text-sm font-medium mb-2">Sort Order</h5>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {sortOrderOptions.map((item) => (
          <FilterButton
            key={item}
            active={sortOrder === item}
            label={item}
            handleClick={() => setCharacterSortOrder(item)}
          />
        ))}
      </div>

      {/* Filters in mobile version */}
      {isMobile ? (
        <Link to={"/"}>
          <button
            className="rounded-lg w-full text-white bg-primary-600 font-medium text-sm py-2 h-10"
            onClick={handleFilter}
          >
            Filter
          </button>
        </Link>
      ) : (
        <button
          className="rounded-lg w-full text-white bg-primary-600 font-medium text-sm py-2 h-10"
          onClick={handleFilter}
        >
          Filter
        </button>
      )}
    </div>
  );
};

export default Filters;
