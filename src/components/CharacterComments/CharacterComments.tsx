import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Character } from "../../models/interfaces/character.interface";
import { addComment } from "../../reducers/characters/characters.actions";

type CharacterCommentsProps = {
  character?: Character;
};

const CharacterComments: React.FC<CharacterCommentsProps> = ({ character }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (character) {
      dispatch(addComment({ id: character?.id, comment }));
      setComment("");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-bold mb-3">Comments</h4>
      {character?.comments.map((comment) => (
        <div className="border-t border-t-primary-100 py-3">
          {comment.substring(0, 100)}
        </div>
      ))}
      <textarea
        className="w-full bg-grey-secondary rounded-lg px-5 py-4 h-32"
        placeholder="Comments..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="rounded-lg text-white w-28 bg-primary-600 font-medium text-sm py-2 h-10"
        onClick={handleAddComment}
        disabled={!comment}
      >
        Add
      </button>
    </div>
  );
};

export default CharacterComments;
