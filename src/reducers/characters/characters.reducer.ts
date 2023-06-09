import { createReducer } from "@reduxjs/toolkit";
import {
  addComment,
  deleteCharacter,
  setCharacters,
  setCharactersError,
  setFilters,
  setLoadingCharacters,
  setSearchKeyword,
  setSortOrder,
  starCharacter,
} from "./characters.actions";
import { Character } from "../../models/interfaces/character.interface";

export type FilterObjectType = {
  starred?: boolean;
  species?: string;
};

interface CharactersState {
  characters: Character[];
  loadingCharacters: boolean;
  charactersError: boolean;
  filters: FilterObjectType;
  sortOrder: "Default" | "A-Z" | "Z-A";
  searchKeyword: string;
}

const initialState: CharactersState = {
  characters: [],
  loadingCharacters: true,
  charactersError: false,
  filters: {},
  sortOrder: "Default",
  searchKeyword: "",
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

  builder.addCase(addComment, (state: CharactersState, action: any) => ({
    ...state,
    characters: state.characters.map((character) =>
      character.id === action.payload.id
        ? {
            ...character,
            comments: character.comments.concat([action.payload.comment]),
          }
        : { ...character }
    ),
  }));

  builder.addCase(setSortOrder, (state: CharactersState, action: any) => ({
    ...state,
    sortOrder: action.payload,
  }));

  builder.addCase(setSearchKeyword, (state: CharactersState, action: any) => ({
    ...state,
    searchKeyword: action.payload,
  }));

  builder.addCase(deleteCharacter, (state: CharactersState, action: any) => ({
    ...state,
    characters: state.characters.filter(
      (character) => character.id !== action.payload
    ),
  }));
});
