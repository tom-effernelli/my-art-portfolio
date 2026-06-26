"use client";
import Link from "next/link";

const pages = [
  { label: "HOME",        href: "/" },
  { label: "MODEL",       href: "/model" },
  { label: "PHOTOGRAPHY", href: "/photography" },
  { label: "ABOUT",       href: "/about" },
  { label: "CONTACT",     href: "/contact" },
];

export default function DropdownMenu({ currentPage = "home", onClose, className = "" }) {
  return (
    <div
      className={`w-full bg-[#b2dafa] border-[#000] border-solid border-b-[2px] box-border max-w-full flex flex-col items-start pt-4 xs:pt-3 pl-[45px] xs:pl-[23px] pr-[45px] xs:pr-[23px] pb-8 xs:pb-6 gap-1.5 xs:gap-1 sm:gap-1.5 md:gap-2 text-left md:text-[26px] sm:text-[22px] xs:text-[20px] text-[#000] ${className}`}
    >
      <div className="self-stretch flex items-center justify-end pb-1">
        <button className="[border:none] bg-transparent p-0 cursor-pointer" onClick={onClose} aria-label="Fermer le menu">
          <svg className="w-[28px] md:w-[28px] sm:w-[22px] xs:w-[18px] h-[28px] md:h-[28px] sm:h-[22px] xs:h-[18px]" viewBox="0 0 34 34" fill="none">
            <line x1="2" y1="2" x2="32" y2="32" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <line x1="32" y1="2" x2="2" y2="32" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {pages.map(({ label, href }) => {
        const key = href === "/" ? "home" : href.slice(1);
        const active = currentPage === key;
        return (
          <Link
            key={label}
            href={href}
            className="cursor-pointer [text-decoration:none] self-stretch border-[#000] border-solid border-b-[2px] overflow-hidden flex items-end pt-0 px-0 pb-[5px] text-[inherit]"
          >
            <b className="self-stretch relative leading-[121.1%] flex items-end gap-1">
              {active && <span className="text-[14px] lg:text-[12px] sm:text-[11px] xs:text-[11px] inline-block -translate-y-0.5">■</span>}
              {label}
            </b>
          </Link>
        );
      })}
    </div>
  );
}
