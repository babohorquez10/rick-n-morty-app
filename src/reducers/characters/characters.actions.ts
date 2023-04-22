import { createAction } from "@reduxjs/toolkit";
import { Character } from "../../models/interfaces/character.interface";

export const setCharacters = createAction<Character[]>(
  "characters/setCharacters"
);
export const starCharacter = createAction<string>("characters/starCharacter");
