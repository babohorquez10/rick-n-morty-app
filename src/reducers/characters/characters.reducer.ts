import { createReducer } from "@reduxjs/toolkit";
import { setCharacters } from "./characters.actions";
import { Character } from "../../models/interfaces/character.interface";

interface CharactersState {
  characters: Character[];
  selectedCharacter?: Character;
}

const initialState: CharactersState = {
  characters: [],
};

export const charactersReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(setCharacters, (state: any, action: any) => ({
    ...state,
    characters: action.payload,
  }));
});
