export async function fetchRecipes(page: number = 1, limit: number = 8) {
  const skipProducts = (page - 1) * limit;

  const url: string = `https://dummyjson.com/recipes?limit=${limit}&skip=${skipProducts}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching the featured products: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
}
