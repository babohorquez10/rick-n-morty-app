import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { selectCharacters } from "../../reducers/characters/characters.selectors";
import {
  deleteCharacter,
  starCharacter,
} from "../../reducers/characters/characters.actions";
import { useAppDispatch } from "../../app/hooks";
import { MobileView } from "react-device-detect";
import CharacterDetailItem from "../CharacterDetailItem/CharacterDetailItem";
import heart from "../../imgs/Heart.png";
import heartSelected from "../../imgs/HeartSelected.png";
import arrowIcon from "../../imgs/Arrow.png";
import deleteIcon from "../../imgs/delete.png";
import CharacterComments from "../CharacterComments/CharacterComments";
import { useState } from "react";

function CharacterDetail() {
  const dispatch = useAppDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { selectedCharacterId } = useParams();
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
  const characterData = characters.find((item) => item.id === character.id);
  const isStarred = characterData?.starred;

  const handleStarCharacter = () => {
    dispatch(starCharacter(character?.id));
  };

  const handleDeleteCharacter = () => {
    dispatch(deleteCharacter(character?.id));
  };

  return (
    <div className="px-6 py-4 md:px-24 md:py-10 overflow-y-scroll h-full">
      {character && (
        <>
          <div className="flex justify-between items-center">
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

            <div className="relative">
              <img
                className="h-8 cursor-pointer"
                onClick={() => setShowDeleteConfirmation(true)}
                src={deleteIcon}
                alt="Delete"
              />
              {showDeleteConfirmation && (
                <div className="absolute right-0 w-56 p-4 bg-white shadow-filters rounded-md">
                  <p className="font-normal text-sm text-grey mb-2">
                    Are you sure you want to delete this character?
                  </p>
                  <div className="flex justify-between gap-x-3">
                    <Link to="/">
                      <button
                        className="flex-1 rounded-lg text-white w-16 bg-primary-600 font-medium text-sm py-2"
                        onClick={handleDeleteCharacter}
                      >
                        Delete
                      </button>
                    </Link>
                    <button
                      className="flex-1 rounded-lg text-primary-600 w-16 bg-primary-100 font-medium text-sm py-2"
                      onClick={() => setShowDeleteConfirmation(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">{character.name}</h1>

          <CharacterDetailItem title="Species" value={character.species} />
          <CharacterDetailItem title="Status" value={character.status} />
          <CharacterDetailItem title="Gender" value={character.gender} />

          <div className="pt-4 mt-3">
            <CharacterComments character={characterData} />
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterDetail;
