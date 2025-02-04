import "./styles/Search.css";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <form className="task-search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
      />
    </form>
  );
}

export default Search;
