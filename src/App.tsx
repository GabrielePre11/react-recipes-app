import { Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes/Recipes";
import Category from "./pages/Recipes/Category";
import Recipe from "./pages/Recipes/Recipe";
import Favorites from "./pages/Favorites/Favorites";
import Contact from "./pages/Contact/Contact";
import SearchRecipe from "./pages/Recipes/SearchRecipe";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/recipes/tag/:category" element={<Category />} />
          <Route path="/recipes/search" element={<SearchRecipe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
