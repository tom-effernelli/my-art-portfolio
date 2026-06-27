"use client";
import { useState } from "react";
import Link from "next/link";
import DropdownMenu from "./dropdown-menu";

const links = [
  { label: "MODEL",       href: "/model" },
  { label: "PHOTOGRAPHY", href: "/photography" },
  { label: "ABOUT",       href: "/about" },
  { label: "CONTACT",     href: "/contact" },
];

export default function Nav({ currentPage = "home", className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <>
          <div className="fixed top-[80px] sm:top-[60px] xs:top-[50px] left-0 right-0 bottom-0 bg-black/20 z-[200000]" onClick={() => setOpen(false)} />
          <DropdownMenu currentPage={currentPage} onClose={() => setOpen(false)} className="fixed top-[80px] sm:top-[60px] xs:top-[50px] left-0 z-[200001]" />
        </>
      )}

      <nav className={`sel-dark w-full bg-[#b2dafa] border-[#000] border-solid border-b-[1px] box-border max-w-full h-[101px] lg:h-[90px] md:h-[80px] sm:h-[60px] xs:h-[50px] overflow-hidden flex items-center justify-between py-0 px-[45px] xs:px-[23px] text-left text-[29px] lg:text-[26px] md:text-[24px] sm:text-[18px] xs:text-[16px] text-[#000] font-space-grotesk font-medium ${className}`}>
        <Link
          href="/"
          className="w-[50px] lg:w-[45px] md:w-[40px] sm:w-[30px] xs:w-[25px] h-[50px] lg:h-[45px] md:h-[40px] sm:h-[30px] xs:h-[25px] bg-[#b2dafa] border-[#000] border-solid border-[5px] lg:border-[4px] md:border-[3px] sm:border-[2px] xs:border-[2px] box-border block shrink-0"
        />

        <div className="flex items-center gap-16 lg:gap-14 md:gap-0">
          {links.map(({ label, href }) => {
            const key = href.slice(1);
            const active = currentPage === key;
            return (
              <div key={label} className="flex items-center xs:hidden sm:hidden md:hidden">
                <Link href={href} className="[text-decoration:none] relative leading-[121.1%] font-medium text-[#000] flex items-center gap-1">
                  {active && <span className="text-[14px] inline-block -translate-y-0.5">■</span>}
                  {label}
                </Link>
              </div>
            );
          })}

          {/* Hamburger — md/sm/xs only */}
          <button
            className="hidden md:block sm:block xs:block [border:none] bg-transparent p-0 cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-[34px] md:w-[28px] sm:w-[22px] xs:w-[18px] h-[30px] md:h-[24px] sm:h-[18px] xs:h-[16px]" viewBox="0 0 34 30" fill="none">
              <line y1="2"  x2="34" y2="2"  stroke="black" strokeWidth="3" strokeLinecap="round"/>
              <line y1="15" x2="34" y2="15" stroke="black" strokeWidth="3" strokeLinecap="round"/>
              <line y1="28" x2="34" y2="28" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
