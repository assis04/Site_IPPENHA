import { Link } from "react-router-dom";
import { InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import logo from "../assets/logo.svg";
import { NAV_LINKS } from "../data/constants";

/**
 * Header / nav compartilhado entre todas as páginas.
 */
export default function Header() {
  return (
    <header className="w-full bg-white">
      {/* faixa superior */}
      <div className="h-2 bg-[#3AAF7D]" />

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo da Igreja Presbiteriana da Penha"
            className="h-12"
          />
        </Link>

        {/* Links */}
        <ul className="hidden lg:flex gap-8 items-center text-gray-700 font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="hover:text-[#0F715C] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <button className="bg-[#0F715C] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
            Contribua
          </button>

          <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <YoutubeLogoIcon size={22} weight="fill" />
          </div>

          <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <InstagramLogoIcon size={22} />
          </div>
        </div>
      </nav>
    </header>
  );
}
