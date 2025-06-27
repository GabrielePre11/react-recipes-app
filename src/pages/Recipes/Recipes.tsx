import { useCallback, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import Filters from "../../components/Filters";
import Container from "../../layout/Container";
import { fetchRecipes } from "../../lib/fetchRecipes";
import RecipeCard from "../../components/RecipeCard";
import Loader from "../../components/Loader";

//=========== notFound Image ===========//
import notFound from "../../assets/not-found.svg";

//=========== APIResponseType Interface ===========//
interface APIResponseType {
  limit: number;
  recipes: RecipesType[];
  skip: number;
  total: number;
}

//=========== RecipesType Interface ===========//
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

//=========== Filters Type & FiltersType Interface ===========//
type Filters = "cuisine" | "difficulty";

interface FiltersType {
  cuisine: string[];
  difficulty: string;
}

export default function Recipes() {
  //=========== States ===========//
  const [recipes, setRecipes] = useState<RecipesType[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<FiltersType>({
    cuisine: [],
    difficulty: "",
  });

  // Limit for pagination
  const limit: number = 15;

  // Function to handle filter changes
  // This function updates the selected filters based on user interaction
  const handleFilterChange = useCallback((type: Filters, value: string) => {
    // Update the selected filters based on the previous state
    setSelectedFilters((prev) => {
      // If the filter type is "cuisine" (ex: Italian, Mexican, etc.)
      if (type === "cuisine") {
        // Check if the value is already selected
        const alreadySelected = prev.cuisine.includes(value);

        // If it's already selected, remove it. Otherwise, add it.
        return {
          ...prev,
          cuisine: alreadySelected
            ? prev.cuisine.filter((item) => item !== value) // Remove the selected cuisine
            : [...prev.cuisine, value], // Add the new cuisine to the list
        };
      }

      // If the filter type is "difficulty" (ex: easy, medium)
      else if (type === "difficulty") {
        return {
          ...prev,
          // If the same difficulty is selected again, deselect it (set it to an empty string).
          // Otherwise, set the selected difficulty.
          difficulty: prev.difficulty === value ? "" : value,
        };
      }

      // If the filter type is not recognized, return the previous state unchanged
      return prev;
    });
  }, []);

  //=========== Filter recipes based on selected filters ===========//
  const filteredRecipes = recipes.filter((recipe) => {
    /*
    - Check if the recipe matches the selected cuisine filters.
    - If no cuisines are selected, consider it a match (include all).
    - Otherwise, only match if the recipe's cuisine is in the selected list.
    */
    const matchesCuisine =
      selectedFilters.cuisine.length === 0 ||
      selectedFilters.cuisine.includes(recipe.cuisine);

    /*
    - Check if the recipe matches the selected difficulty filter.
    - If no difficulty is selected, consider it a match (include all).
    - Otherwise, only match if the recipe's difficulty matches the selected one.
    */
    const matchesDifficulty =
      selectedFilters.difficulty.length === 0 ||
      selectedFilters.difficulty.includes(recipe.difficulty);

    // Include the recipe only if it matches both filters
    return matchesCuisine && matchesDifficulty;
  });

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const data: APIResponseType = await fetchRecipes(page, limit);
        setRecipes((prev) => {
          const existingIDs = new Set(prev.map((recipe) => recipe.id));

          const newRecipes = data.recipes.filter(
            (recipe) => !existingIDs.has(recipe.id)
          );

          return [...prev, ...newRecipes];
        });
      } catch (error: unknown) {
        setError("Error fetching recipes. Please try again later.");
        if (error instanceof Error) {
          console.error("Error fetching recipes:", error.message);
        }
      } finally {
        setLoadingState(false);
      }
    };
    getRecipes();
  }, [page]);

  // Function to load more recipes when the "Load More" button is clicked
  const loadMoreRecipes = useCallback(() => {
    setLoadingState(true);
    setPage((prev) => prev + 1);
  }, []);

  return (
    <section className="pb-20">
      <Banner />
      <Categories />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mt-20">
          {/*========= Filters=========*/}
          <Filters
            filters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/*========= Loading State =========*/}
          {loadingState && <Loader />}

          {/*========= Error State =========*/}
          {error && (
            <div className="grid place-items-center mt-20">
              <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
              <p className="text-gray-500 mt-2">
                Please try again later or contact support.
              </p>
            </div>
          )}

          {/*========= Recipes =========*/}
          {!loadingState && !error && recipes && (
            <div>
              {/*========= No recipes found =========*/}
              {!loadingState && !error && filteredRecipes.length === 0 && (
                <div className="grid place-items-center mt-20">
                  {/*========= Title =========*/}
                  <h2 className="text-2xl font-semibold text-gray-700">
                    No recipes found
                  </h2>
                  {/*========= Message =========*/}
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or loading more recipes.
                  </p>

                  {/*========= SVG =========*/}
                  <img
                    src={notFound}
                    alt="No recipes found"
                    className="py-16"
                    width={300}
                  />
                </div>
              )}

              {/*========= List =========*/}
              <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {/*========= Recipe Cards =========*/}
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    recipeId={recipe.id}
                    recipeImage={recipe.image}
                    recipeDifficulty={recipe.difficulty}
                    recipeName={recipe.name}
                    recipeRatings={Number(recipe.rating.toFixed(1))}
                    recipeCookTime={recipe.cookTimeMinutes}
                    recipeMealType={recipe.mealType.slice(0, 1)}
                  />
                ))}
              </ul>

              {/*========= Load More Recipes Button =========*/}
              <div className="grid place-items-center mt-10">
                <button
                  className="py-2 px-6 bg-green rounded-lg text-lg text-white font-medium cursor-pointer transition-colors duration-300 hover:bg-greenDark"
                  aria-label="Load More"
                  onClick={loadMoreRecipes}
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
