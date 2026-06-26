"use client";
import { useState } from "react";
import Link from "next/link";
import DropdownMenu from "./dropdown-menu";

const pages = [
  { name: "Model",       href: "/model",       key: "model"       },
  { name: "Photography", href: "/photography", key: "photography" },
  { name: "About",       href: "/about",       key: "about"       },
  { name: "Contact",     href: "/contact",     key: "contact"     },
];

export default function TopBar({ currentPage = "home", theme = "light" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = theme === "dark";
  const fg = dark ? "#ffffff" : "#111111";

  return (
    <div
      className="sticky top-0 z-[200000] w-full flex flex-col"
      style={{ background: dark ? "#111111" : "#ffffff", color: fg }}
    >
      <div className="w-full flex items-center justify-between px-[30px] xs:px-[18px] py-[16px]">
        <Link href="/" className="flex items-center gap-3.5 [text-decoration:none]" style={{ color: fg }}>
          <span className="w-[22px] h-[22px] shrink-0" style={{ background: fg }} />
          <span className="font-archivo font-extrabold text-[15px] tracking-[0.02em] whitespace-nowrap">
            TOM EFFERNELLI<sup className="text-[9px]">®</sup>
          </span>
        </Link>

        {/* Nav links — md et plus */}
        <nav className="flex gap-[22px] md:gap-[16px] sm:hidden xs:hidden font-archivo font-semibold text-[13px]">
          {pages.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              className="[text-decoration:none] hover:opacity-70 transition-opacity"
              style={{ color: fg }}
            >
              {p.name}
              <span style={{ color: fg }}>.</span>
            </Link>
          ))}
        </nav>

        {/* Bouton hamburger — sm et xs uniquement */}
        <button
          className="hidden sm:flex xs:flex items-center justify-center p-1 cursor-pointer [border:none] bg-transparent"
          style={{ color: fg }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="3" x2="21" y2="21"/>
              <line x1="21" y1="3" x2="3" y2="21"/>
            </svg>
          ) : (
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <DropdownMenu
          currentPage={currentPage}
          theme={theme}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
