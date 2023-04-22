import { Character } from "../../models/interfaces/character.interface";
import heart from "../../imgs/Heart.png";
import heartSelected from "../../imgs/HeartSelected.png";
import { useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { starCharacter } from "../../reducers/characters/characters.actions";

type CharacterCardProps = {
  character: Character;
  selected: boolean;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const handleStarCharacter = (id: string) => {
    dispatch(starCharacter(id));
  };

  return (
    <div
      className={`py-4 cursor-pointer border-t border-t-primary-100 ${
        selected && "bg-primary-100 rounded-lg"
      }`}
    >
      <Link to={`characters/${character.id}`}>
        <div className="px-5 flex items-center">
          <img
            className="rounded-full h-10 mr-4"
            src={character.image}
            alt="Character"
          />
          <div className="flex-1">
            <div className="font-semibold text-base leading-5">
              {character.name}
            </div>
            <div className="font-normal text-base leading-5 text-grey">
              {character.species}
            </div>
          </div>
          <img
            className="cursor-pointer"
            src={character.starred ? heartSelected : heart}
            onClick={() => handleStarCharacter(character.id)}
            alt="Star"
          />
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
