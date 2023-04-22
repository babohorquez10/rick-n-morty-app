import { Character } from "../../models/interfaces/character.interface";
import heart from "../../imgs/Heart.png";

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="py-4 cursor-pointer border-t border-t-primary-100">
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
        <img className="cursor-pointer" src={heart} alt="Star" />
      </div>
    </div>
  );
};

export default CharacterCard;
