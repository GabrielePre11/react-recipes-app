import { useEffect, useState } from "react";
import Container from "../layout/Container";
import { fetchHomeRecipes } from "../lib/fetchHomeRecipes";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import RecipeCard from "./RecipeCard";

//=========== APIResponseType Interface ===========//
interface APIResponseType {
  limit: number;
  recipes: FeaturedRecipesType[];
  skip: number;
  total: number;
}

//=========== FeaturedRecipesType Interface ===========//
interface FeaturedRecipesType {
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

export default function FeaturedRecipes() {
  const [featuredRecipes, setFeaturedRecipes] = useState<FeaturedRecipesType[]>(
    []
  );
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeaturedRecipes = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const data: APIResponseType = await fetchHomeRecipes();
        setFeaturedRecipes(data.recipes);
      } catch (error) {
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    };
    getFeaturedRecipes();
  }, []);

  return (
    <section className="pt-24">
      <Container>
        {/*========= Title and Paragraph =========*/}
        <div className="flex flex-col gap-3 items-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            Simple and tasty recipes
          </h2>

          {/* Paragraph */}
          <p className="text-sm md:text-[1rem] max-w-2xl text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim{" "}
          </p>
        </div>

        {/*========= Loading State =========*/}
        {loadingState && <Loader />}

        {/*========= Featured Recipes =========*/}
        {!loadingState && !error && featuredRecipes && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 mt-10">
            {/*========= Recipe Cards =========*/}
            {featuredRecipes.map((recipe) => (
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
        )}

        {/*========= View All Recipes Button =========*/}
        <div className="grid place-items-center my-12">
          <Link to={"/recipes"}>
            <button className="py-2 px-6 bg-green rounded-lg text-lg text-white font-medium cursor-pointer transition-colors duration-300 hover:bg-greenDark">
              View All Recipes
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
