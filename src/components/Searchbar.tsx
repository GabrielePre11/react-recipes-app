import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim().toLocaleLowerCase()) return;
    navigate(
      `/recipes/search?q=${encodeURIComponent(
        searchQuery.trim().toLowerCase()
      )}`
    );
    setSearchQuery(""); // Clear the search input after navigating
  };

  return (
    <div className="hidden md:flex relative items-center border border-zinc-500 rounded-lg">
      <input
        type="text"
        inputMode="search"
        placeholder="What recipe are you looking for?"
        name="desktop-searchbar"
        className="flex flex-1 outline-0 py-3 px-3 w-[320px] lg:w-[400px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <button
        className="absolute top-2/4 -translate-y-2/4 right-1.5 grid place-content-center bg-green text-white cursor-pointer size-10 rounded-full p-4 transition-colors duration-300 hover:bg-greenDark"
        onClick={handleSearch}
      >
        <Search size={25} />
      </button>
    </div>
  );
}
