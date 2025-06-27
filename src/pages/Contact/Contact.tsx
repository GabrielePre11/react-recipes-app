import Container from "../../layout/Container";

import contactChef from "../../assets/chef-contact.png";
import { useEffect, useState } from "react";
import CTA from "../../components/CTA";
import { fetchHomeRecipes } from "../../lib/fetchHomeRecipes";
import RecipeCard from "../../components/RecipeCard";
import Loader from "../../components/Loader";

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

export default function Contact() {
  const [recommendedRecipes, setRecommendedRecipes] = useState<RecipesType[]>(
    []
  );
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendedRecipes = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const data = await fetchHomeRecipes();
        setRecommendedRecipes(data.recipes);
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
    <section className="py-24 md:py-28 lg:py-32">
      <Container>
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
          Contact us
        </h2>
      </Container>

      <Container className="grid grid-cols-1 items-center md:grid-cols-[0.8fr_1fr] gap-10">
        {/*========= Left Side =========*/}
        <figure className="mt-10">
          <img src={contactChef} alt="Chef" className="place-self-center" />
        </figure>

        {/*========= Right Side =========*/}
        <form action="submit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {/*========= Name =========*/}
            <input
              type="text"
              placeholder="Your Name"
              inputMode="text"
              className="border border-zinc-300 rounded-lg py-3 px-4 text-lg outline-0 focus:ring focus:ring-green focus:ring-offset-2"
              required
            />

            {/*========= Email =========*/}
            <input
              type="email"
              inputMode="email"
              placeholder="Your Email"
              className="border border-zinc-300 rounded-lg py-3 px-4 text-lg outline-0 focus:ring focus:ring-green focus:ring-offset-2"
              required
            />
          </div>

          {/*========= Textarea / Message =========*/}
          <textarea
            placeholder="Your Message"
            inputMode="text"
            className="w-full border border-zinc-300 rounded-lg py-3 px-4 text-lg outline-0 mt-6 resize-none focus:ring focus:ring-green focus:ring-offset-2"
            rows={6}
            required
          ></textarea>

          {/*========= Button =========*/}
          <button
            type="submit"
            className="inline-block mt-6 cursor-pointer bg-green text-white py-3 px-6 rounded-lg hover:bg-greenDark transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </Container>

      <CTA />

      <Container>
        {/*========= Title =========*/}
        <div className="flex flex-col gap-3 items-center">
          {/*========= Title ========= */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center">
            Check out these delicious recipes
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

        {/*========= Recommended Recipes =========*/}
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
