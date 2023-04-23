import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import { starCharacter } from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";
import { MobileView } from "react-device-detect";
import CharacterDetailItem from "../CharacterDetailItem/CharacterDetailItem";
import heart from "../../imgs/Heart.png";
import heartSelected from "../../imgs/HeartSelected.png";
import arrowIcon from "../../imgs/Arrow.png";

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
    return <div className="px-6 py-4 md:px-24 md:py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="px-6 py-4 md:px-24 md:py-10">
        Something wrong happened.
      </div>
    );
  }

  const { character } = data;
  const isStarred = characters.find(
    (item) => item.id === character.id
  )?.starred;

  const handleStarCharacter = () => {
    dispatch(starCharacter(character?.id));
  };

  return (
    <div className="px-6 py-4 md:px-24 md:py-10">
      {character && (
        <>
          <div className="relative w-fit">
            <MobileView>
              <Link to="/">
                <img className="w-6 mb-6" src={arrowIcon} alt="Back" />
              </Link>
            </MobileView>

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
    </div>
  );
}

export default CharacterDetail;
