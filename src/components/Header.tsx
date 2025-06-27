import { Link, NavLink } from "react-router-dom";
import Container from "../layout/Container";
import { Bookmark, Menu, Search } from "lucide-react";
import MobileSearch from "./MobileSearch";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import Searchbar from "./Searchbar";

const Links = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] border-b border-zinc-500 backdrop-blur-sm bg-white/60">
      <Container className="flex items-center justify-between py-5">
        {/*============ Logo ============*/}
        <Link to={"/"}>
          <img
            src="/recipesbook.png"
            alt="Recipesbook. logo"
            width={150}
            className="pt-0.5"
          />
        </Link>

        {/*============ Searchbar [DESKTOP] ============*/}
        <Searchbar />

        {/*============ Searchbar [MOBILE] ============*/}
        {isOpen && <MobileSearch setIsOpen={setIsOpen} />}

        {/*============ Navbar [DESKTOP] ============*/}
        <ul className="hidden lg:flex items-center gap-6">
          {Links.map((link) => (
            <li key={link.href} className="text-xl">
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `relative inline-block after:content-[''] after:absolute after:bg-green after:-bottom-1 after:left-0 after:h-1 after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/*============ Mobile Navbar ============*/}
        {mobileMenuOpen && (
          <MobileNavbar setMobileMenuOpen={setMobileMenuOpen} />
        )}

        {/*============ Icons / Buttons ============*/}
        <div className="flex items-center gap-3">
          {/*============ Search ============*/}
          <Search
            className="md:hidden cursor-pointer transition-transform duration-200 hover:scale-105 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {/*============ Favorites ============*/}
          <Link to={"/favorites"}>
            <Bookmark className="grid place-content-center cursor-pointer transition-all duration-200 hover:scale-105 lg:bg-green lg:p-2 lg:rounded-full lg:size-11 lg:text-white lg:hover:bg-greenDark" />
          </Link>

          {/*============ Open Navbar ============*/}
          <Menu
            className="cursor-pointer transition-transform duration-200 hover:scale-105 lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </Container>
    </header>
  );
}
