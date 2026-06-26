"use client";
import Link from "next/link";

const pages = [
  { label: "Model",       href: "/model"       },
  { label: "Photography", href: "/photography" },
  { label: "About",       href: "/about"       },
  { label: "Contact",     href: "/contact"     },
];

export default function DropdownMenu({ currentPage = "home", theme = "light", onClose }) {
  const dark = theme === "dark";
  const fg = dark ? "#ffffff" : "#111111";
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(17,17,17,0.12)";

  return (
    <div style={{ borderTop: `1px solid ${border}` }}>
      {pages.map(({ label, href }, i) => {
        const active = currentPage === href.slice(1);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-baseline gap-4 px-[30px] xs:px-[18px] py-[20px] xs:py-[15px] [text-decoration:none] hover:opacity-60 transition-opacity duration-150"
            style={{ color: fg, borderBottom: `1px solid ${border}` }}
          >
            <span className="font-mono text-[11px] tracking-[0.1em] opacity-35 shrink-0 leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-archivo-exp font-extrabold text-[34px] sm:text-[28px] xs:text-[24px] leading-none tracking-[-0.025em]">
              {label.toUpperCase()}
              {active && <span className="ml-2 text-[16px] align-middle">■</span>}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
