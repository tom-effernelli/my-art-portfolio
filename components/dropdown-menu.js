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
      {pages.map(({ label, href }) => {
        const active = currentPage === href.slice(1);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center px-[30px] xs:px-[18px] py-[16px] xs:py-[12px] [text-decoration:none] hover:opacity-60 transition-opacity duration-150"
            style={{ color: fg, borderBottom: `1px solid ${border}` }}
          >
            <span className="font-archivo-exp font-extrabold text-[20px] xs:text-[16px] leading-none tracking-[-0.02em]">
              {label.toUpperCase()}
              {active && <span className="ml-2 text-[12px] align-middle">■</span>}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
