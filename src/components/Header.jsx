import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  InstagramLogoIcon,
  YoutubeLogoIcon,
  ListIcon,
  XIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import logo from "../assets/logo.svg";
import { NAV_LINKS, SOCIAL_LINKS } from "../data/constants";

/**
 * Header com navegação completa.
 * Desktop (≥ 1280 px): menu horizontal com dropdowns no hover.
 * Mobile  (< 1280 px): hamburger + painel lateral com accordions.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm font-[Poppins,sans-serif]">
      <div className="h-1.5 bg-[#3AAF7D]" />

      <nav className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Logo da Igreja Presbiteriana da Penha"
            className="h-11 lg:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden xl:flex items-center gap-0.5" role="menubar">
          {NAV_LINKS.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            to="/contribua"
            className="bg-[#0F715C] text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-[#0a5e4c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
          >
            Contribua
          </Link>

          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
            aria-label="YouTube da IPPENHA (abre em nova aba)"
          >
            <YoutubeLogoIcon size={20} weight="fill" aria-hidden="true" />
          </a>

          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
            aria-label="Instagram da IPPENHA (abre em nova aba)"
          >
            <InstagramLogoIcon size={20} aria-hidden="true" />
          </a>

          {/* Hamburger */}
          <button
            type="button"
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C] focus:ring-offset-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={mobileOpen}
          >
            <ListIcon size={26} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP – item de navegação com dropdown no hover
   ═══════════════════════════════════════════════════════════════════ */

function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);
  const hasChildren = item.children?.length > 0;

  const enter = () => {
    clearTimeout(timeout.current);
    if (hasChildren) setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  const baseClass =
    "flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap";
  const activeClass = open ? "text-[#0F715C] bg-[#0F715C]/5" : "text-gray-700 hover:text-[#0F715C]";

  if (!hasChildren) {
    return (
      <li role="none">
        <SmartLink
          to={item.href}
          className={`${baseClass} text-gray-700 hover:text-[#0F715C]`}
          role="menuitem"
        >
          {item.label}
        </SmartLink>
      </li>
    );
  }

  const isWide = item.children.length > 8;

  return (
    <li
      role="none"
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <SmartLink
        to={item.href}
        className={`${baseClass} ${activeClass}`}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <CaretDownIcon
          size={13}
          weight="bold"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </SmartLink>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div
            className={`bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-dropdown ${
              isWide ? "min-w-105" : "min-w-55"
            }`}
            role="menu"
          >
            <div className={isWide ? "grid grid-cols-2 gap-x-2" : ""}>
              {item.children.map((child) => (
                <DropdownItem key={child.label} item={child} />
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function DropdownItem({ item }) {
  const hasNested = item.children?.length > 0;

  if (!hasNested) {
    return (
      <SmartLink
        to={item.href}
        className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#0F715C]/5 hover:text-[#0F715C] transition-colors"
        role="menuitem"
      >
        {item.label}
      </SmartLink>
    );
  }

  return (
    <div className="mt-1" role="group" aria-label={item.label}>
      <div className="px-4 pt-2 pb-1 border-t border-gray-100 first:border-t-0 first:pt-0">
        <span className="text-xs font-semibold text-[#0F715C] uppercase tracking-wide">
          {item.label}
        </span>
      </div>
      {item.children.map((child) => (
        <SmartLink
          key={child.label}
          to={child.href}
          className="block pl-6 pr-4 py-1.5 text-sm text-gray-600 hover:bg-[#0F715C]/5 hover:text-[#0F715C] transition-colors"
          role="menuitem"
        >
          {child.label}
        </SmartLink>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE – painel lateral com accordions
   ═══════════════════════════════════════════════════════════════════ */

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState({});

  // Bloqueia scroll do body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fecha com Escape
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const toggle = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 xl:hidden transition-visibility duration-300 ${
        open ? "visible" : "invisible pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Menu de navegação"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-40" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel */}
      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" onClick={onClose}>
            <img src={logo} alt="IPPENHA" className="h-10" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F715C]"
            aria-label="Fechar menu"
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Itens de navegação */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Navegação principal">
          <ul className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                expanded={expanded}
                toggle={toggle}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>

        {/* Ações */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-3">
          <Link
            to="/contribua"
            className="w-full bg-[#0F715C] text-white text-center py-3 rounded-full font-medium hover:bg-[#0a5e4c] transition-colors"
          >
            Contribua
          </Link>

          <div className="flex justify-center gap-3">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="YouTube"
            >
              <YoutubeLogoIcon size={20} weight="fill" aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogoIcon size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item, expanded, toggle, onClose, depth = 0 }) {
  const hasChildren = item.children?.length > 0;
  const isOpen = expanded[item.label] ?? false;
  const pl = depth === 0 ? "pl-5" : depth === 1 ? "pl-9" : "pl-13";

  if (!hasChildren) {
    return (
      <li>
        <SmartLink
          to={item.href}
          onClick={onClose}
          className={`flex items-center ${pl} pr-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#0F715C]/5 hover:text-[#0F715C] transition-colors`}
        >
          {item.label}
        </SmartLink>
      </li>
    );
  }

  return (
    <li>
      {/* Botão accordion */}
      <button
        type="button"
        onClick={() => toggle(item.label)}
        className={`flex items-center justify-between w-full ${pl} pr-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#0F715C]/5 hover:text-[#0F715C] transition-colors`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {item.label}
        </span>
        <CaretDownIcon
          size={16}
          weight="bold"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Sub-itens */}
      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.children.map((child) => (
          <MobileNavItem
            key={child.label}
            item={child}
            expanded={expanded}
            toggle={toggle}
            onClose={onClose}
            depth={depth + 1}
          />
        ))}
      </ul>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   UTILITÁRIO – Link inteligente (react-router ou <a>)
   ═══════════════════════════════════════════════════════════════════ */

function SmartLink({ to, children, ...props }) {
  if (to && to !== "#" && to.startsWith("/")) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to || "#"} {...props}>
      {children}
    </a>
  );
}
