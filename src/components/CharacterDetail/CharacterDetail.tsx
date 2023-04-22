import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import CharacterDetailItem from "../CharacterDetailItem/CharacterDetailItem";
import heart from "../../imgs/Heart.png";
import heartSelected from "../../imgs/HeartSelected.png";
import { starCharacter } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";

function CharacterDetail() {
  const { selectedCharacterId } = useParams();
  const dispatch = useAppDispatch();
  const characters = useSelector(selectCharacters);
  const CHARACTER_QUERY = gql`
      {
        character(id: ${selectedCharacterId}) {
          id
          name
          status
          species
          gender
          image
        }
      }
    `;

  const { data, loading, error } = useQuery(CHARACTER_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something wrong happened.</>;
  }

  const { character } = data;
  const isStarred = characters.find(
    (item) => item.id === character.id
  )?.starred;

  const handleStarCharacter = () => {
    dispatch(starCharacter(character?.id));
  };

  return (
    <>
      {character && (
        <>
          <div className="relative w-fit">
            <img
              className="rounded-full h-20 mb-2"
              src={character.image}
              alt="Character avatar"
            />
            <img
              className="rounded-full cursor-pointer absolute right-0 bottom-0 p-1 bg-white"
              src={isStarred ? heartSelected : heart}
              onClick={handleStarCharacter}
              alt="Star"
            />
          </div>

          <h1 className="text-2xl font-bold mb-4">{character.name}</h1>

          <CharacterDetailItem title="Species" value={character.species} />
          <CharacterDetailItem title="Status" value={character.status} />
          <CharacterDetailItem title="Gender" value={character.gender} />
        </>
      )}
    </>
  );
}

export default CharacterDetail;
