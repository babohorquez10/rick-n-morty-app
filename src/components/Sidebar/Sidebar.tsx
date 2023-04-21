import CharacterList from "../CharacterList/CharacterList";

function Sidebar() {
  return (
    <div className="px-4 py-10">
      <h1 className="font-bold text-2xl">Rick and Morty List</h1>
      <CharacterList />
    </div>
  );
}

export default Sidebar;
