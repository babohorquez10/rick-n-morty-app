import CharacterList from "../CharacterList/CharacterList";

function Sidebar() {
  return (
    <div className="px-4 py-10 h-full">
      <h1 className="font-bold text-2xl mb-5">Rick and Morty List</h1>
      <CharacterList />
    </div>
  );
}

export default Sidebar;
