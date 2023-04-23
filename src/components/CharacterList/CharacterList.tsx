import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";
import {
  selectCharacters,
  selectCharactersError,
  selectFilters,
  selectLoadingCharacters,
  selectSearchKeyWord,
  selectSortOrder,
} from "../../reducers/characters/characters.selectors";
import ListTitle from "../ListTitle/ListTitle";
import { useParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function CharacterList() {
  const { selectedCharacterId } = useParams();

  const filterObject = useSelector(selectFilters);
  const loading = useSelector(selectLoadingCharacters);
  const error = useSelector(selectCharactersError);
  const sortOrder = useSelector(selectSortOrder);
  const searchKeyword = useSelector(selectSearchKeyWord);

  const charactersArray = useSelector(selectCharacters)
    .filter((item: any) => {
      const noFilterMatch =
        Object.entries(filterObject).findIndex(
          (entry) => item[entry[0]] !== entry[1]
        ) === -1;

      const hasKeyword = searchKeyword
        ? item.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
        : true;

      return noFilterMatch && hasKeyword;
    })
    .sort((charA, charB) => {
      if (sortOrder === "Default") return 1;
      if (charA.name > charB.name) return sortOrder === "A-Z" ? 1 : -1;
      else if (charA.name < charB.name) return sortOrder === "A-Z" ? -1 : 1;
      return 0;
    });

  const starredCharacters = charactersArray.filter(
    (character) => !!character.starred
  );
  const characters = charactersArray.filter((character) => !character.starred);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong.</>;
  }

  return (
    <>
      <div className="h-full">
        <SearchBar />

        {Object.keys(filterObject).length > 0 && (
          <div className="flex justify-between mb-4">
            <span className="text-blue text-base font-semibold">
              {charactersArray.length} Results
            </span>
            <span className="text-green bg-light-green text-sm font-semibold rounded-xl py-0.5 px-3">
              {Object.keys(filterObject).length} Filter
            </span>
          </div>
        )}

        <div className="overflow-scroll h-full">
          <ListTitle
            title="Starred Characters"
            count={starredCharacters?.length}
          />
          {starredCharacters.map((item) => (
            <CharacterCard
              key={item.id}
              selected={selectedCharacterId === item.id}
              character={item}
            />
          ))}

          <ListTitle title="Characters" count={characters?.length} />
          {characters.map((item) => (
            <CharacterCard
              key={item.id}
              character={item}
              selected={selectedCharacterId === item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CharacterList;
