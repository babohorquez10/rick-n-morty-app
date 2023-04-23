import { createAction } from "@reduxjs/toolkit";
import { Character } from "../../models/interfaces/character.interface";
import { FilterObjectType } from "./characters.reducer";

type AddCommentType = {
  id: string;
  comment: string;
};

export const setCharacters = createAction<Character[]>(
  "characters/setCharacters"
);
export const starCharacter = createAction<string>("characters/starCharacter");
export const setLoadingCharacters = createAction<boolean>(
  "characters/setLoadingCharacters"
);
export const setCharactersError = createAction<boolean>(
  "characters/setCharactersError"
);
export const setFilters = createAction<FilterObjectType>(
  "characters/setFilters"
);
export const addComment = createAction<AddCommentType>("characters/addComment");
export const setSortOrder = createAction<string>("characters/setSortOrder");
export const setSearchKeyword = createAction<string>(
  "characters/setSearchKeyword"
);
export const deleteCharacter = createAction<string>(
  "characters/deleteCharacter"
);
