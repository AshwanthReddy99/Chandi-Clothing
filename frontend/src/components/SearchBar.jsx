function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center py-10">
      <input
        type="text"
        placeholder="Search sarees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[500px] border-2 border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-[#5D001E]"
      />
    </div>
  );
}

export default SearchBar;