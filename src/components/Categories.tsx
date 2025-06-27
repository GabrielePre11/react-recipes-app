import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../layout/Container";
import { useRef } from "react";
import { Link } from "react-router-dom";

//=========== Recipes Categories ===========//
const recipesCategories = [
  { name: "Italian", img: "🍕" },
  { name: "Main course", img: "🍽️" },
  { name: "Cocktail", img: "🍸" },
  { name: "Salad", img: "🥗" },
  { name: "Soup", img: "🥣" },
  { name: "Baking", img: "🧁" },
  { name: "Mexican", img: "🌮" },
  { name: "Indian", img: "🪷" },
  { name: "Pakistani", img: "🌶️" },
  { name: "Asian", img: "🍜" },
  { name: "Drink", img: "🥤" },
  { name: "Japanese", img: "🍣" },
  { name: "Breakfast", img: "🥞" },
  { name: "Smoothie", img: "🍓" },
  { name: "Korean", img: "🥢" },
  { name: "Thai", img: "🍚" },
  { name: "Vegetarian", img: "🌱" },
  { name: "Dessert", img: "🍰" },
  { name: "Snack", img: "🍪" },
  { name: "Grilling", img: "🔥" },
  { name: "Chicken", img: "🍗" },
  { name: "Beef", img: "🥩" },
  { name: "Pasta", img: "🍝" },
  { name: "Rice", img: "🍚" },
];

export default function Categories() {
  //=========== scrollRef ===========//
  const scrollRef = useRef<HTMLUListElement | null>(null);

  //=========== scroll To Left ===========//
  const scrollToLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  //=========== scroll To Right ===========//
  const scrollToRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="pt-12 lg:pt-16">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">Categories</h2>

          {/*=========== Arrows ===========*/}
          <div className="flex items-center gap-3">
            {/*=========== LEFT ===========*/}
            <button
              className="grid place-content-center bg-green p-2 size-10 rounded-full text-white cursor-pointer transition-colors duration-300 hover:bg-greenDark"
              aria-label="Scroll left"
              onClick={scrollToLeft}
            >
              <ChevronLeft />
            </button>

            {/*=========== RIGHT ===========*/}
            <button
              className="grid place-content-center bg-green p-2 size-10 rounded-full text-white cursor-pointer transition-colors duration-300 hover:bg-greenDark"
              aria-label="Scroll right"
              onClick={scrollToRight}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/*=========== Categories ===========*/}
        <ul
          className="mt-10 flex items-center space-x-10 md:space-x-12 lg:space-x-16 overflow-x-auto scrollbar-hidden"
          ref={scrollRef}
        >
          {recipesCategories.map((category) => (
            <Link key={category.name} to={`/recipes/tag/${category.name}`}>
              <li className="grid place-items-center gap-3 cursor-pointer">
                <span className="grid place-content-center text-4xl md:text-6xl px-3 py-5 bg-lightBlue rounded-full transition-transform duration-300 hover:scale-105">
                  {category.img}
                </span>
                <h3 className="text-lg font-medium truncate">
                  {category.name}
                </h3>
              </li>
            </Link>
          ))}
        </ul>
      </Container>
    </section>
  );
}
