import { useParams } from "react-router-dom";
import Container from "../../layout/Container";
import { useEffect, useState } from "react";
import CTA from "../../components/CTA";
import RecipeCard from "../../components/RecipeCard";
import Loader from "../../components/Loader";
import { fetchHomeRecipes } from "../../lib/fetchHomeRecipes";
import {
  BadgeCheck,
  ClockFading,
  Play,
  Printer,
  Share,
  Utensils,
} from "lucide-react";

//=========== Assets ===========//
import recipe1 from "../../assets/recipe1.png";
import recipe2 from "../../assets/recipe2.png";
import recipe3 from "../../assets/recipe3.png";

//=========== RecipeType Interface ===========//
interface RecipeType {
  id: number;
  difficulty: string;
  cookTimeMinutes: number;
  image: string;
  name: string;
  prepTimeMinutes: number;
  rating: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  reviewsCount: number;
  cuisine: string;
  mealType: string[];
}

//=========== otherRecipes array ===========//
const otherRecipes = [
  {
    id: 1,
    text: "Chicken Meatball with Creamy Chees...",
    image: recipe1,
    author: "Andreas Paula",
  },

  {
    id: 2,
    text: "The Creamiest Creamy Chicken an...",
    image: recipe2,
    author: "Andreas Paula",
  },

  {
    id: 3,
    text: "The Best Easy One Pot Chicken and Rice",
    image: recipe3,
    author: "Andreas Paula",
  },
];

export default function Recipe() {
  //=========== ID ===========//
  const { id } = useParams<{ id: string }>();

  //=========== STATES ===========//
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const recipeURL: string = `https://dummyjson.com/recipes/${id}`;

    const getRecipe = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const response = await fetch(recipeURL);
        if (!response.ok) {
          throw new Error(
            `There was an error fetching the recipe: ${response.status}`
          );
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error: unknown) {
        setError("Error fetching recipes. Please try again later.");
        if (error instanceof Error) {
          console.error("Error fetching recipes:", error.message);
        }
      } finally {
        setLoadingState(false);
      }
    };
    getRecipe();
  }, [id]);

  //=========== RECOMMENDED RECIPES STATE ===========//
  const [recommendedRecipes, setRecommendedRecipes] = useState<RecipeType[]>(
    []
  );

  useEffect(() => {
    const getRecommendedRecipes = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const data = await fetchHomeRecipes();
        setRecommendedRecipes(data.recipes);
        console.log(data);
      } catch (error) {
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    };
    getRecommendedRecipes();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <Container>
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

        {/*========= Recipe =========*/}
        {!loadingState && !error && recipe && (
          <>
            {/*=========  HEADER =========*/}
            <header className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/*=========  Left Side =========*/}
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium">
                  {recipe.name}
                </h2>
                <ul className="flex items-center gap-4 flex-wrap">
                  <li className="flex items-center gap-2.5 border-r border-gray-400 pr-5">
                    <span>
                      <ClockFading />
                    </span>
                    <span className="text-gray-700">
                      <h5 className="font-medium text-black text-[1.025rem]">
                        Prep Time
                      </h5>
                      {recipe.prepTimeMinutes} minutes
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5 border-r border-gray-400 pr-5">
                    <span>
                      <ClockFading />
                    </span>
                    <span className="text-gray-700">
                      <h5 className="font-medium text-black text-[1.025rem]">
                        Cook Time
                      </h5>
                      {recipe.cookTimeMinutes} minutes
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5">
                    <span>
                      <Utensils />
                    </span>
                    <h5 className="text-gray-700">
                      {recipe.mealType.slice(0, 1)}
                    </h5>
                  </li>
                </ul>
              </div>

              {/*=========  Right Side - Buttons =========*/}
              <div className="flex items-center gap-5">
                <button
                  className="grid place-items-center bg-lightBlue text-black p-3 rounded-full cursor-pointer"
                  aria-label="Print Recipe"
                >
                  <Printer size={25} />
                </button>

                <button
                  className="grid place-items-center bg-lightBlue text-black p-3 rounded-full cursor-pointer"
                  aria-label="Share Recipe"
                >
                  <Share size={25} />
                </button>
              </div>
            </header>

            {/* RECIPE'S IMAGE & INFORMATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-20">
              {/*========= Left Side / Column =========*/}
              <div>
                <figure className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="rounded-lg object-cover aspect-square md:aspect-[3/2] w-full"
                  />

                  <button
                    id="play-btn"
                    className="absolute grid place-content-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.2)] text-black p-3 rounded-full cursor-pointer border border-white"
                  >
                    <Play size={60} stroke="white" />
                  </button>
                </figure>
              </div>

              {/*========= Right Side / Column =========*/}
              <div>
                <article className="flex flex-col h-full gap-3 bg-lightBlue p-5 pb-0 rounded-lg">
                  <h3 className="text-3xl font-medium text-black">
                    Ingredients
                  </h3>
                  <ul className="grid grid-cols-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-2 mb-2 border-b border-gray-400 last:border-b-0"
                      >
                        <span>{`${index + 1}.`}</span>
                        <span className="font-medium font-secondary text-sm sm:text-lg truncate">
                          {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm sm:text-base text-center text-gray-700 mt-auto">
                    Please ensure all ingredients are safe for those with
                    allergies or dietary restrictions.
                  </p>
                </article>
              </div>
            </div>

            {/*========= INSTRUCTIONS, OTHER RECIPES, CTA =========*/}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-20">
              {/*========= Left Side / Column =========*/}
              <div>
                <h3 className="text-3xl font-medium text-black">
                  Instructions
                </h3>

                <ul className="grid grid-cols-1 gap-4 mt-5">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 py-2 border-b border-gray-400 last:border-b-0"
                    >
                      <span>
                        <BadgeCheck size={30} />
                      </span>
                      <p className="md:text-lg">{instruction}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/*========= Right Side / Column =========*/}
              <div className="flex flex-col gap-5 mt-10 sm:mt-0">
                <h3 className="text-3xl font-medium text-black">
                  Other Recipes
                </h3>
                <ul className="grid grid-cols-1 gap-6 sm:gap-2 mt-7 sm:mt-5">
                  {otherRecipes.map((recipe, index) => (
                    <li
                      key={recipe.id}
                      className="flex flex-col sm:flex-row items-center gap-6"
                    >
                      <img
                        src={recipe.image}
                        alt={`Recipe ${index + 1}`}
                        className="rounded-lg object-cover w-full sm:w-[130px] cursor-pointer"
                      />

                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-medium">{recipe.text}</h3>
                        <span className="text-gray-500">
                          by {recipe.author}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </Container>

      <CTA />

      <Container>
        {/*========= Title =========*/}
        <div className="flex flex-col gap-3 items-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center">
            You may like these recipe too
          </h2>
        </div>

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

        {/* Recommended Recipes */}
        {!loadingState && !error && recommendedRecipes && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 mt-10">
            {/*========= Recipe Cards =========*/}
            {recommendedRecipes.map((recipe) => (
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
