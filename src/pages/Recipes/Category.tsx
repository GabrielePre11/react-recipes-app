import { useParams } from "react-router-dom";
import Container from "../../layout/Container";
import Categories from "../../components/Categories";

import heroBanner from "../../assets/heroBanner.png";
import underLine from "../../assets/underline.png";
import { useEffect, useState } from "react";
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

export default function Category() {
  const { category } = useParams<{ category: string }>();

  const [categoryRecipes, setCategoryRecipes] = useState<RecipesType[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Recipes - ${category}`;
    const categoryURL: string = `https://dummyjson.com/recipes/tag/${category}`;

    const getCategoryRecipes = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const response = await fetch(categoryURL);
        if (!response.ok) {
          throw new Error(
            `There was an error fetching this category's recipes: ${response.status}`
          );
        }

        const data: APIResponseType = await response.json();
        setCategoryRecipes(data.recipes);
      } catch (error: unknown) {
        setError("Error fetching recipes. Please try again later.");
        if (error instanceof Error) {
          console.error("Error fetching recipes:", error.message);
        }
      } finally {
        setLoadingState(false);
      }
    };
    getCategoryRecipes();
  }, [category]);

  return (
    <section className="py-32">
      <Container>
        <figure className="grid justify-start items-center relative">
          <img
            src={heroBanner}
            alt="Banner"
            className="relative aspect-video object-cover rounded-lg sm:aspect-auto"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="font-secondary text-4xl text-white sm:text-6xl md:text-8xl truncate">
              {category}
            </h2>
          </div>

          <img
            src={underLine}
            alt="Underline"
            className="absolute bottom-0 sm:-bottom-17 md:-bottom-13 lg:-bottom-10 left-1/2 transform -translate-x-1/2"
            width={600}
          />
        </figure>
      </Container>

      <Categories />

      <Container>
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

        {/*========= No recipes found =========*/}
        {!loadingState && !error && categoryRecipes.length === 0 && (
          <div className="grid place-items-center mt-28">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700">
              No recipes found
            </h2>
            {/* Message */}
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or loading more recipes.
            </p>

            {/* SVG */}
            <img
              src={notFound}
              alt="No recipes found"
              className="py-16"
              width={450}
            />
          </div>
        )}

        {/*========= Recipes =========*/}
        {!loadingState && !error && categoryRecipes && (
          <ul className="grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {/*========= Recipe Cards =========*/}
            {categoryRecipes.map((recipe) => (
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
      </Container>
    </section>
  );
}
