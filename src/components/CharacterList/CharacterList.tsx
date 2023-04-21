import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

function CharacterList() {
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

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {data.characters.results.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
          <li>{}</li>
        </ul>
      )}
    </div>
  );
}

export default CharacterList;
