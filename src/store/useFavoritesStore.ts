import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//=============== RECIPE INTERFACE ===============//
interface Recipe {
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

//=============== STORE INTERFACE ===============//
interface FavoritesStore {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  alreadyInFavorites: (id: number) => boolean;
  removeFromFavorites: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      //=============== Add To Favorites Function ===============//
      addToFavorites: (recipe: Recipe) => {
        // Check if recipe is a valid object and its ID is a number
        if (!recipe || typeof recipe.id !== "number") return;

        // If the recipe is already in the favorites, just return to prevent duplicates
        if (get().alreadyInFavorites(recipe.id)) return;

        // Add the recipe to favorites by updating the state with the previous recipes and the new one
        set((state) => ({
          favorites: [...state.favorites, recipe],
        }));
      },

      //=============== Check If Already In Favorites Function ===============//
      alreadyInFavorites: (id) => {
        // Check if the favorites array contains a recipe with the given ID
        return get().favorites.some((recipe) => recipe && recipe.id === id);
      },

      removeFromFavorites: (id: number) => {
        set((state) => ({
          // Filter out the recipe with the given ID from the favorites array
          favorites: state.favorites.filter(
            (recipe) => recipe && recipe.id !== id
          ),
        }));
      },
    }),
    {
      name: "favorites",

      // Zustand now requires explicit storage definition for persist.
      // createJSONStorage ensures data is stored as JSON and supports custom storage (like localStorage or sessionStorage).
      storage: createJSONStorage(() => localStorage),
    }
  )
);
