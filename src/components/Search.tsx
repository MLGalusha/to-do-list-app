interface SearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

function Search({ searchQuery, setSearchQuery }: SearchProps) {
  function querySearch(query: string) {
    if (query.trim()) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
    return;
  }
  return (
    <form>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => querySearch(e.target.value)}
        placeholder="Search a task..."
      />
    </form>
  );
}

export default Search;
