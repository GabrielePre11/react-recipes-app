import { ClockFading, Heart, Star, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface RecipesType {
  id: number;
  difficulty: string;
  cookTimeMinutes: number;
  image: string;
  name: string;
  prepTimeMinutes: number;
  rating: number;
  cuisine: string;
  mealType: string[];
}

interface FeaturedRecipesType {
  recipeId: number;
  recipe: RecipesType;
  recipeImage: string;
  recipeDifficulty: string;
  recipeName: string;
  recipeRatings: number;
  recipeCookTime: number;
  recipeMealType: string[];
}

type DifficultyType = "Easy" | "Medium" | "Hard";

const difficultyColors: Record<DifficultyType, string> = {
  Easy: "text-green",
  Medium: "text-lightOrange",
  Hard: "text-red-400",
};

export default function RecipeCard({
  recipeId,
  recipe,
  recipeImage,
  recipeDifficulty,
  recipeName,
  recipeRatings,
  recipeCookTime,
  recipeMealType,
}: FeaturedRecipesType) {
  const { addToFavorites, alreadyInFavorites, removeFromFavorites } =
    useFavoritesStore();

  return (
    <li className="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-200">
      {/*========= Recipe Image =========*/}
      <Link to={`/recipes/${recipeId}`}>
        <figure>
          <img
            src={recipeImage}
            alt={`Image of ${recipeName}`}
            className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer rounded-xl"
            loading="lazy"
          />
        </figure>
      </Link>

      {/*========= Recipe Infos =========*/}
      <div className="flex flex-col gap-3 mt-3 p-2">
        {/* Difficulty */}
        <span
          className={`inline-block w-max py-0.5 px-4 border rounded-full font-secondary ${
            difficultyColors[recipeDifficulty as DifficultyType]
          }`}
        >
          {recipeDifficulty}
        </span>

        <div className="flex flex-col gap-3">
          {/* Title & Ratings */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg truncate font-medium">{recipeName}</h3>
            <span className="flex items-center gap-1.5 font-secondary pl-2">
              <Star size={20} fill="yellow" />
              {recipeRatings}
            </span>
          </div>

          {/* Cook Time */}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5">
                <ClockFading size={20} />
                <span className="">{`${recipeCookTime} min`}</span>
              </span>

              {/* Meal Type */}
              <span className="flex items-center gap-1.5">
                <Utensils size={20} />
                <span className="">{recipeMealType}</span>
              </span>
            </div>

            {/* Favorites Button */}
            <button
              className="p-0.5 cursor-pointer"
              aria-label="Add to favorites"
              onClick={() => {
                if (alreadyInFavorites(recipeId)) {
                  removeFromFavorites(recipeId);
                } else {
                  addToFavorites({
                    id: recipeId,
                    difficulty: recipeDifficulty,
                    cookTimeMinutes: recipeCookTime,
                    image: recipeImage,
                    name: recipeName,
                    prepTimeMinutes: recipe.prepTimeMinutes,
                    rating: recipeRatings,
                    cuisine: recipe.cuisine,
                    mealType: recipeMealType,
                  });
                }
              }}
            >
              <Heart
                size={25}
                stroke="red"
                fill={alreadyInFavorites(recipeId) ? "red" : "none"}
                className="transition-colors duration-300 hover:fill-red-500"
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
