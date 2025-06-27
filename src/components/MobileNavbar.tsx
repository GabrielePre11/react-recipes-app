import { CircleX } from "lucide-react";
import Container from "../layout/Container";
import { NavLink } from "react-router-dom";

const Links = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
];

type MobileNavbarProps = {
  setMobileMenuOpen: (value: boolean) => void;
};

export default function MobileNavbar({ setMobileMenuOpen }: MobileNavbarProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-zinc-100 z-40">
      <Container className="grid grid-cols-1">
        <header className="flex items-center justify-between py-6 border-b-2 border-green">
          <h3 className="text-4xl font-secondary">Menu</h3>
          <button
            className="text-green transition-transform duration-200 hover:rotate-180 cursor-pointer"
            aria-label="Close Navbar"
            onClick={() => setMobileMenuOpen(false)}
          >
            <CircleX size={35} />
          </button>
        </header>

        <ul className="grid grid-cols-1 mt-6">
          {Links.map((link) => (
            <li
              key={link.href}
              className="text-4xl pt-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `relative inline-block after:content-[''] after:absolute after:bg-green after:-bottom-2.5 after:left-0 after:h-1 after:transition-all after:duration-300 ${
                    isActive ? "after:w-[80%]" : "after:w-0 hover:after:w-[80%]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
