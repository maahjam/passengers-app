interface Props {
  query: string;
  handleSearch: (query: string) => void;
  handleClearSearch: () => void;
}

const Search: React.FC<Props> = ({
  handleSearch,
  query,
  handleClearSearch,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 px-4 mt-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Search by phone number, name, or last name"
      />
      <button
        onClick={handleClearSearch}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
