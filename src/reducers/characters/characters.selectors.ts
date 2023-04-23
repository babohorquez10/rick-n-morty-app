import { RootState } from "../../app/store";

export const selectCharacters = (state: RootState) =>
  state.characters.characters;

export const selectLoadingCharacters = (state: RootState) =>
  state.characters.loadingCharacters;

export const selectCharactersError = (state: RootState) =>
  state.characters.charactersError;

export const selectFilters = (state: RootState) => state.characters.filters;
export const selectSortOrder = (state: RootState) => state.characters.sortOrder;
export const selectSearchKeyWord = (state: RootState) =>
  state.characters.searchKeyword;
