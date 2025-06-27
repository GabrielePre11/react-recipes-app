import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type MobileSearchProps = {
  setIsOpen: (value: boolean) => void;
};

export default function MobileSearch({ setIsOpen }: MobileSearchProps) {
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
    setIsOpen(false); // Close the search modal after searching
  };

  //========= Close the mobile navbar on scroll to enhancing the UX =========//
  const closeSearchOnScroll = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    window.addEventListener("scroll", closeSearchOnScroll);
    return () => window.removeEventListener("scroll", closeSearchOnScroll);
  }, [closeSearchOnScroll]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm lg:hidden min-h-screen"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="flex flex-col sm:flex-row w-[310px] sm:w-[500px] max-w-md gap-2 bg-white p-3 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          inputMode="search"
          placeholder="Search..."
          name="mobile-searchbar"
          className="flex border border-zinc-500 rounded-lg py-3 px-2 flex-1 text-lg outline-0"
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
          className="flex items-center gap-2 justify-center w-full sm:w-max bg-green p-3.5 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-greenDark"
          aria-label="Search..."
          aria-live="polite"
          onClick={handleSearch}
        >
          <span className="text-xl sm:hidden">Search</span>
          <Search size={30} />
        </button>
      </div>
    </div>
  );
}
