interface SearchProps {
  searchQuery: string;
  onSetSearchQuery: (searchQuery: string) => void;
}

function Search({ searchQuery, onSetSearchQuery }: SearchProps) {
  return (
    <form>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSetSearchQuery(e.target.value)}
        placeholder="Search a task..."
      />
    </form>
  );
}

export default Search;
