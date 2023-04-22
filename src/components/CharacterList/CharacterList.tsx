import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import { setCharacters } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";
import ListTitle from "../ListTitle/ListTitle";
import { useParams } from "react-router-dom";
import SearchBar, { FilterObjectType } from "../SearchBar/SearchBar";
import { Character } from "../../models/interfaces/character.interface";

function CharacterList() {
  const dispatch = useAppDispatch();
  const CHARACTERS_QUERY = gql`
    {
      characters {
        info {
          count
        }
        results {
          id
          name
          status
          species
          image
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(CHARACTERS_QUERY);
  const { selectedCharacterId } = useParams();
  const [filterObject, setFilterObject] = useState<FilterObjectType>({});

  useEffect(() => {
    if (data?.characters?.results) {
      dispatch(
        setCharacters(
          data.characters.results.map((item: Character) => ({
            ...item,
            starred: false,
          }))
          // .slice(0, 5)
        )
      );
    }
  }, [data]);

  const charactersArray = useSelector(selectCharacters).filter((item: any) => {
    const noFilterMatchMatch =
      Object.entries(filterObject).findIndex(
        (entry) => item[entry[0]] !== entry[1]
      ) === -1;

    return noFilterMatchMatch;
  });

  const starredCharacters = charactersArray.filter(
    (character) => !!character.starred
  );
  const characters = charactersArray.filter((character) => !character.starred);

  const handleFilter = (filterObject: FilterObjectType) => {
    setFilterObject(filterObject);
  };

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong.</>;
  }

  return (
    <>
      <div className="h-full">
        <SearchBar handleFilterResults={handleFilter} />

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
