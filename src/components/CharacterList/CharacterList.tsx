import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import { setCharacters } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";

function CharacterList() {
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

  const dispatch = useAppDispatch();
  const characters = useSelector(selectCharacters);

  const { data, loading, error } = useQuery(CHARACTERS_QUERY);

  useEffect(() => {
    if (data?.characters?.results) {
      console.log(data.characters.results);
      dispatch(setCharacters(data.characters.results.slice(0, 5)));
    }
  }, [data]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="h-full">
          {characters.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default CharacterList;
