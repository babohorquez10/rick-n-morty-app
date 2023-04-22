import { createReducer } from "@reduxjs/toolkit";
import { setCharacters, starCharacter } from "./characters.actions";
import { Character } from "../../models/interfaces/character.interface";

interface CharactersState {
  characters: Character[];
  selectedCharacter?: Character;
}

const initialState: CharactersState = {
  characters: [],
};

export const charactersReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(setCharacters, (state: CharactersState, action: any) => ({
    ...state,
    characters: action.payload,
  }));

  builder.addCase(starCharacter, (state: CharactersState, action: any) => ({
    ...state,
    characters: state.characters.map((character) => ({
      ...character,
      starred:
        character.id === action.payload
          ? !character.starred
          : character.starred,
    })),
  }));
});
