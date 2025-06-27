import { Instagram } from "lucide-react";
import Container from "../layout/Container";

import Post from "../assets/Post.png";
import Post2 from "../assets/Post2.png";
import Post3 from "../assets/Post3.png";
import Post4 from "../assets/Post4.png";

const Posts = [
  { id: 1, image: Post },
  { id: 2, image: Post2 },
  { id: 3, image: Post3 },
  { id: 4, image: Post4 },
];

export default function InstagramPosts() {
  return (
    <section className="py-20 bg-lightBlue">
      <Container>
        {/*========= Title and Paragraph =========*/}
        <div className="flex flex-col gap-3 items-center">
          {/* Title */}
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-medium text-center">
            Check out @recipesbook. on Instagram
            <span className="size-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4] shrink-0">
              <Instagram size={25} stroke="white" />
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-sm md:text-[1rem] max-w-2xl text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim{" "}
          </p>
        </div>

        {/*========= Instagram Posts =========*/}
        <ul className="grid items-center gap-5 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {Posts.map((post) => (
            <li
              key={post.id}
              className="mx-auto cursor-pointer transition-all hover:-translate-y-3 hover:shadow-2xs duration-300"
            >
              <img
                src={post.image}
                alt={`Post N.${post.id}`}
                className="rounded-lg"
              />
            </li>
          ))}
        </ul>

        {/*========= View Our Instagram Button =========*/}
        <div className="grid place-items-center mt-12">
          <a href="https://www.instagram.com/" target="_blank">
            <button className="inline-flex items-center gap-3 py-3 px-5 bg-black rounded-xl text-sm text-white font-medium cursor-pointer transition-colors duration-300 hover:bg-black/90">
              View Our Instagram
              <Instagram size={25} stroke="white" />
            </button>
          </a>
        </div>
      </Container>
    </section>
  );
}
