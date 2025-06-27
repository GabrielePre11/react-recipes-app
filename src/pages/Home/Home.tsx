import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import CTA from "../../components/CTA";
import FeaturedRecipes from "../../components/FeaturedRecipes";
import InstagramPosts from "../../components/InstagramPosts";
import LearnMore from "../../components/LearnMore";

export default function Home() {
  return (
    <>
      <Banner />
      <Categories />
      <FeaturedRecipes />
      <InstagramPosts />
      <LearnMore />
      <CTA />
    </>
  );
}
