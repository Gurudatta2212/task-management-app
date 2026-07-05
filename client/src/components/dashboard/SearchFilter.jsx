function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900 dark:border dark:border-slate-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white md:w-96"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Priority">Priority</option>
        </select>

      </div>
    </div>
  );
}

export default SearchFilter;