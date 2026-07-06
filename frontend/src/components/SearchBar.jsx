function SearchBar({ search, setSearch }) {
  return (
    <section className="py-8 sm:py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <input
          type="text"
          placeholder="🔍 Search your favourite saree..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            border-2
            border-gray-300
            rounded-xl
            px-5
            py-3
            text-base
            sm:text-lg
            focus:outline-none
            focus:border-[#5D001E]
            shadow-sm
          "
        />

      </div>

    </section>
  );
}

export default SearchBar;