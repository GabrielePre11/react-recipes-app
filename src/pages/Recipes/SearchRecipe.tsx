import { useEffect, useState } from "react";
import Container from "../../layout/Container";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import RecipeCard from "../../components/RecipeCard";

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

export default function SearchRecipe() {
  //=========== STATES ===========//
  const [recipes, setRecipes] = useState<RecipesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //=========== SEARCH PARAMS - USERQUERY - URL ===========//
  const [searchParams] = useSearchParams();
  const userQuery = searchParams.get("q") || "";
  const url = `https://dummyjson.com/recipes/search?q=${userQuery}`;

  useEffect(() => {
    const fetchSearchedRecipe = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        // If there's no query in the URL, don't fetch anything
        if (!userQuery) return;

        const response = await fetch(url);

        // If the fetch fails, we throw an error to be caught below
        if (!response.ok) {
          throw new Error(
            `There was an error fetching the featured products: ${response.status}`
          );
        }

        const data: APIResponseType = await response.json();

        // Update the recipes with the fetched results
        setRecipes(data.recipes);
      } catch (error) {
        // Catch any error and update the error state
        console.error("Error fetching featured products:", error);
        setError("Error fetching featured products");
      } finally {
        // Whether it fails or succeeds, we stop the loading state
        setLoading(false);
      }
    };

    fetchSearchedRecipe();
  }, [userQuery, url]);

  return (
    <section className="py-24 md:py-32">
      <Container>
        {/*====== Loading State... ======*/}
        {loading && <Loader />}

        {/*====== Error State ======*/}
        {error && (
          // If there's an error fetching the recipes, show an error message.
          <div className="grid place-content-center py-16">
            <p className="text-lg sm:text-2xl lg:text-3xl">
              Oops! ❌ There was an error loading the movies! Try again!
            </p>
          </div>
        )}

        {/*====== No Results Found ======*/}
        {!loading && !error && recipes.length === 0 && (
          <div className="grid place-content-center text-center pt-20 gap-5">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Recipes Found
            </h2>
            <p className="text-gray-500 mt-2">
              We couldn't find any recipes matching your search.
            </p>

            <img src={notFound} alt="No Recipes Found" />
          </div>
        )}

        {/*========= Recipes =========*/}
        {!loading && !error && recipes.length > 0 && (
          <>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-medium">
              You have searched for: {userQuery}
            </h2>

            <ul className="grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {/*========= Recipe Cards =========*/}
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipeId={recipe.id}
                  recipe={recipe}
                  recipeImage={recipe.image}
                  recipeDifficulty={recipe.difficulty}
                  recipeName={recipe.name}
                  recipeRatings={Number(recipe.rating.toFixed(1))}
                  recipeCookTime={recipe.cookTimeMinutes}
                  recipeMealType={recipe.mealType.slice(0, 1)}
                />
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
