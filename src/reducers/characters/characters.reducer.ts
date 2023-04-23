import { createReducer } from "@reduxjs/toolkit";
import {
  setCharacters,
  setCharactersError,
  setFilters,
  setLoadingCharacters,
  starCharacter,
} from "./characters.actions";
import { Character } from "../../models/interfaces/character.interface";
import { FilterObjectType } from "../../components/Filters/Filters";

interface CharactersState {
  characters: Character[];
  loadingCharacters: boolean;
  charactersError: boolean;
  filters: FilterObjectType;
}

const initialState: CharactersState = {
  characters: [],
  loadingCharacters: true,
  charactersError: false,
  filters: {},
};

export const charactersReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(setCharacters, (state: CharactersState, action: any) => ({
    ...state,
    characters: action.payload,
  }));

  builder.addCase(
    setLoadingCharacters,
    (state: CharactersState, action: any) => ({
      ...state,
      loadingCharacters: action.payload,
    })
  );

  builder.addCase(
    setCharactersError,
    (state: CharactersState, action: any) => ({
      ...state,
      charactersError: action.payload,
    })
  );

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

  builder.addCase(setFilters, (state: CharactersState, action: any) => ({
    ...state,
    filters: action.payload,
  }));
});
