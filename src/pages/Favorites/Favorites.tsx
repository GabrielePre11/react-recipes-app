import { Link } from "react-router-dom";
import { House } from "lucide-react";
import notFound from "../../assets/not-found.svg";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import Container from "../../layout/Container";
import RecipeCard from "../../components/RecipeCard";

export default function Favorites() {
  //=============== FAVORITE'S STORE ===============//
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <section className="py-28">
      <Container>
        {/*====== Back To Home Button ====== */}
        <Link to="/">
          <button className="inline-flex items-center gap-1.5 bg-green text-neutral-100 font-medium transition-colors duration-300 hover:bg-greenDark rounded-lg py-1.5 px-3 text-sm cursor-pointer">
            <House size={20} /> Go Back To Homepage
          </button>
        </Link>

        {/*====== Title ====== */}
        <h2 className="text-3xl mt-5 font-medium">Your Recipes</h2>

        {/*====== No Favorites Found ====== */}
        {!favorites.length && (
          <div className="grid place-content-center text-center pt-20 gap-5">
            {/*====== Title ======*/}
            <h2 className="text-2xl font-semibold text-gray-700">
              No Favorites Found
            </h2>

            {/*====== Message ======*/}
            <p className="text-gray-500 mt-2">
              You haven't added any recipes to your favorites yet.
            </p>

            {/*====== SVG ======*/}
            <img src={notFound} alt="No Favorites Found" width={500} />
          </div>
        )}

        {/*====== Favorites ====== */}
        {favorites && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 mt-10">
            {favorites.map((recipe) => (
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
