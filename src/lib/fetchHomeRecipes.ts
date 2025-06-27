export const fetchHomeRecipes = async () => {
  const homeRecipesURL: string = "https://dummyjson.com/recipes?limit=8";

  try {
    const response = await fetch(homeRecipesURL);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching the featured products: ${response.status}`
      );
    }
    const recipesData = await response.json();
    return recipesData;
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
};
