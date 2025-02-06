interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <form>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search a task..."
      />
    </form>
  );
}

export default Search;
