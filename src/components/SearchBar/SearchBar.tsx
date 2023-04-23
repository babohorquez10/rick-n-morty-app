import { useEffect, useState } from "react";
import filters from "../../imgs/Filters.png";
import filtersActive from "../../imgs/FiltersActive.png";
import search from "../../imgs/search.svg";
import Filters from "../Filters/Filters";
import {
  selectFilters,
  selectSearchKeyWord,
} from "../../reducers/characters/characters.selectors";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { setSearchKeyword } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const filterObject = useSelector(selectFilters);
  const searchKeyword = useSelector(selectSearchKeyWord);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setShowFilters(false);
  }, [filterObject]);

  return (
    <div className="bg-grey-secondary rounded-lg px-5 py-4 mb-4 flex items-center relative">
      <div
        className={`absolute bg-white shadow-filters rounded-md p-6 w-full left-0 top-16 z-10 ${
          !showFilters && "hidden"
        }`}
      >
        <Filters />
      </div>
      <img className="mr-2" src={search} alt="Search" />
      <input
        type="text"
        className="bg-transparent flex-1"
        placeholder="Search or filter results"
        value={searchKeyword}
        onChange={(e) => {
          dispatch(setSearchKeyword(e.target.value));
        }}
      />

      {/* Filters on mobile version. */}
      {isMobile ? (
        <Link to="/filters">
          <img
            className="cursor-pointer"
            src={showFilters ? filtersActive : filters}
            alt="Filters"
            onClick={() => setShowFilters(!showFilters)}
          />
        </Link>
      ) : (
        <img
          className="cursor-pointer"
          src={showFilters ? filtersActive : filters}
          alt="Filters"
          onClick={() => setShowFilters(!showFilters)}
        />
      )}
    </div>
  );
};

export default SearchBar;
