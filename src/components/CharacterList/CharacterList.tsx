import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import { setCharacters } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";
import ListTitle from "../ListTitle/ListTitle";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    if (data?.characters?.results) {
      dispatch(setCharacters(data.characters.results.slice(0, 5)));
    }
  }, [data]);

  const charactersArray = useSelector(selectCharacters);
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
    </>
  );
}

export default CharacterList;
