"use client";
import Link from "next/link";

const pages = [
  { name: "Model",       href: "/model",       key: "model"       },
  { name: "Photography", href: "/photography", key: "photography" },
  { name: "About",       href: "/about",       key: "about"       },
  { name: "Contact",     href: "/contact",     key: "contact"     },
];

export default function TopBar({ currentPage = "home", theme = "light" }) {
  const dark = theme === "dark";
  const fg = dark ? "#ffffff" : "#111111";
  const borderCol = dark ? "rgba(255,255,255,.4)" : "#111111";

  return (
    <div
      className="sticky top-0 z-[200000] w-full flex items-center justify-between px-[30px] xs:px-[18px] py-[16px]"
      style={{ background: dark ? "#111111" : "#ffffff", color: fg }}
    >
      <Link href="/" className="flex items-center gap-3.5 [text-decoration:none]" style={{ color: fg }}>
        <span className="w-[22px] h-[22px] shrink-0" style={{ background: fg }} />
        <span className="font-archivo font-extrabold text-[15px] tracking-[0.02em] whitespace-nowrap">
          TOM EFFERNELLI<sup className="text-[9px]">®</sup>
        </span>
      </Link>

      <nav className="flex gap-[22px] md:gap-[16px] sm:gap-[12px] xs:gap-[10px] font-archivo font-semibold text-[13px] xs:text-[11px]">
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
    </div>
  );
}
