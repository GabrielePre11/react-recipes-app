import { Link } from "react-router-dom";
import Container from "../layout/Container";

const Links = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="left-0 bottom-0 w-full z-20">
      <Container>
        {/* Footer Top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="flex flex-col gap-2">
            {/*============ Logo ============*/}
            <Link to={"/"}>
              <img
                src="/recipesbook.png"
                alt="Recipesbook. logo"
                width={150}
                className="pt-0.5"
              />
            </Link>
            <p className="text-gray-500 text-sm max-w-sm">
              Lorem ipsum dolor sit amet, consectetuipisicing elit,{" "}
            </p>
          </div>

          <ul className="flex flex-col md:flex-row md:items-center md:gap-3 space-y-2 md:space-y-0">
            {Links.map((link) => (
              <li
                key={link.href}
                className="text-lg transition hover:underline duration-300"
              >
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="text-gray-400 my-5" />

        <div className="flex items-center justify-center gap-1.5 text-center text-sm md:text-[1rem] text-black pb-5">
          © 2025 Made by{" "}
          <span className="font-medium text-gray-800">Gabriele Prestano</span>
        </div>
      </Container>
    </footer>
  );
}
