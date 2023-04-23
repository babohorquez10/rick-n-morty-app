import { isMobile } from "react-device-detect";
import MainPage from "./pages/MainPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import "./App.css";
import { useEffect } from "react";
import { Character } from "./models/interfaces/character.interface";
import {
  setCharacters,
  setCharactersError,
  setLoadingCharacters,
} from "./reducers/characters/characters.actions";
import { useAppDispatch } from "./app/hooks";
import { gql, useQuery } from "@apollo/client";
import Filters from "./components/Filters/Filters";

function App() {
  const routerArray = [
    {
      path: "/",
      element: <MainPage />,
      children: !isMobile
        ? [
            {
              path: "characters/:selectedCharacterId",
              element: <CharacterDetail />,
            },
          ]
        : [],
    },
  ];

  if (isMobile) {
    routerArray.push({
      path: "characters/:selectedCharacterId",
      element: <CharacterDetail />,
      children: [],
    });

    routerArray.push({
      path: "filters",
      element: <Filters />,
      children: [],
    });
  }

  const router = createBrowserRouter(routerArray);
  const dispatch = useAppDispatch();

  const CHARACTERS_QUERY = gql`
    {
      characters {
        info {
          count
        }
        results {
          id
          name
          status
          species
          image
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(CHARACTERS_QUERY);

  useEffect(() => {
    dispatch(setLoadingCharacters(loading));
  }, [loading]);

  useEffect(() => {
    if (error) {
      dispatch(setCharactersError(true));
    }
  }, [error]);

  useEffect(() => {
    if (data?.characters?.results) {
      dispatch(
        setCharacters(
          data.characters.results.map((item: Character) => ({
            ...item,
            starred: false,
            comments: [],
          }))
        )
      );
    }
  }, [data]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
