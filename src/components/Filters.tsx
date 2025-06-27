import { Plus } from "lucide-react";
import { useState } from "react";

//=========== Filters Type ===========//
type Filters = "cuisine" | "difficulty";

//=========== FiltersProps Type ===========//
type FiltersProps = {
  filters: {
    cuisine: string[];
    difficulty: string;
  };
  onFilterChange: (type: Filters, value: string) => void;
};

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <aside className="grid grid-cols-1 place-content-start gap-7 lg:border-r lg:border-gray-400 pr-5">
      {/*========= Header =========*/}
      <header className="flex items-center justify-between">
        <h2 className="font-medium text-2xl">Filters</h2>

        {/*========= Close Filters =========*/}
        <button
          className="grid place-items-center bg-green text-white p-1 rounded-full cursor-pointer transition-colors duration-300 hover:bg-greenDark"
          aria-label="Close Filters"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Plus
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      </header>

      <ul className={`grid-cols-1 space-y-9 ${isOpen ? "grid" : "hidden"}`}>
        {/*========= Cuisines Block =========*/}
        <li className="flex flex-col gap-2">
          <h4 className="text-lg font-medium">Cuisines</h4>

          {/*========= Italian =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Italian Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Italian")}
              onChange={() => onFilterChange("cuisine", "Italian")}
            />
            <span className="text-[1rem]">🍝 Italian</span>
          </div>

          {/*========= Japanese =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Japanese Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Japanese")}
              onChange={() => onFilterChange("cuisine", "Japanese")}
            />
            <span className="text-[1rem]">🍣 Japanese</span>
          </div>

          {/*========= American =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="American Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("American")}
              onChange={() => onFilterChange("cuisine", "American")}
            />
            <span className="text-[1rem]">🍔 American</span>
          </div>

          {/*========= Mexican =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Mexican Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Mexican")}
              onChange={() => onFilterChange("cuisine", "Mexican")}
            />
            <span className="text-[1rem]">🌮 Mexican</span>
          </div>

          {/*========= Indian =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Indian Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Indian")}
              onChange={() => onFilterChange("cuisine", "Indian")}
            />
            <span className="text-[1rem]">🪷 Indian</span>
          </div>

          {/*========= Spanish =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Spanish Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Spanish")}
              onChange={() => onFilterChange("cuisine", "Spanish")}
            />
            <span className="text-[1rem]">🥘 Spanish</span>
          </div>

          {/*========= Pakistani =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Pakistani Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.cuisine.includes("Pakistani")}
              onChange={() => onFilterChange("cuisine", "Pakistani")}
            />
            <span className="text-[1rem]">🌶️ Pakistani</span>
          </div>
        </li>

        {/*========= Difficulty Block =========*/}
        <li className="flex flex-col gap-2">
          <h4 className="text-lg font-medium">Difficulty</h4>

          {/*========= Easy =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Easy Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.difficulty.includes("Easy")}
              onChange={() => onFilterChange("difficulty", "Easy")}
            />
            <span className="text-[1rem]">🟢 Easy</span>
          </div>

          {/*========= Medium =========*/}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Medium Checkbox"
              className="accent-green w-5 h-5"
              checked={filters.difficulty.includes("Medium")}
              onChange={() => onFilterChange("difficulty", "Medium")}
            />
            <span className="text-[1rem]">🟠 Medium</span>
          </div>
        </li>
      </ul>
    </aside>
  );
}
