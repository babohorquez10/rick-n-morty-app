import { createAction } from "@reduxjs/toolkit";
import { Character } from "../../models/interfaces/character.interface";
import { FilterObjectType } from "../../components/Filters/Filters";

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
