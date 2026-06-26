import Link from "next/link";

const pages = [
  { name: "HOME",        href: "/",            key: "home"        },
  { name: "MODEL",       href: "/model",       key: "model"       },
  { name: "PHOTOGRAPHY", href: "/photography", key: "photography" },
  { name: "ABOUT",       href: "/about",       key: "about"       },
  { name: "CONTACT",     href: "/contact",     key: "contact"     },
];

const rowContent = [
  {
    mid:   { l1: "Editorial & Fashion",          l2: "Model & Photographer." },
    right: { l1: "Bookings & inquiries welcome.", l2: "Open to opportunities." },
  },
  {
    mid:   null,
    right: { l1: "Tom Effernelli © 2025.", l2: "" },
  },
  { mid: null, right: null },
  { mid: null, right: null },
  { mid: null, right: null },
];

const PageHeader = ({ currentPage = "home" }) => {
  return (
    <div className="self-stretch flex flex-col items-start gap-[33px] sm:gap-[20px]" id="header">

      {/* TOM EFFERNELLI */}
      <div className="self-stretch border-[#000] border-solid border-b-[2px] flex flex-col items-start justify-end">
        <b className="self-stretch relative leading-[121.1%] lg:text-[40px] md:text-[35px] sm:text-[25px] xs:text-[25px] text-[#000]">
          TOM EFFERNELLI
        </b>
      </div>

      {/* Nav rows — height proportional to 4/5 of the dev portfolio's 295px */}
      <div className="self-stretch h-[295px] sm:h-[230px] xs:h-[230px] flex flex-col items-start gap-2.5 sm:gap-1 xs:gap-1 text-[29px]">
        {pages.map((page, i) => {
          const isActive = page.key === currentPage;
          const content  = rowContent[i];
          const hasMid   = !!content?.mid;
          const hasRight = !!content?.right;

          return (
            <div key={page.key} className="self-stretch flex-1 overflow-hidden flex items-end justify-center text-xl">

              {/* Nav link / active label */}
              {isActive ? (
                <div className="self-stretch flex-1 border-[#000] border-solid border-b-[2px] overflow-hidden flex flex-col items-start justify-end pt-0 px-0 pb-[5px] text-[29px]">
                  <b className="self-stretch relative leading-[121.1%] lg:text-[26px] sm:text-[22px] xs:text-[22px] text-[#000]">
                    <span className="text-[16px] lg:text-[14px] sm:text-[12px] xs:text-[12px] inline-block -translate-y-1">■</span>{" "}{page.name}
                  </b>
                </div>
              ) : (
                <Link
                  href={page.href}
                  className="cursor-pointer [text-decoration:none] self-stretch flex-1 border-[#000] border-solid border-b-[2px] overflow-hidden flex flex-col items-start justify-end pt-0 px-0 pb-[5px] text-[29px] text-[inherit]"
                >
                  <b className="self-stretch relative leading-[121.1%] lg:text-[26px] sm:text-[22px] xs:text-[22px] text-[#000]">
                    {page.name}
                  </b>
                </Link>
              )}

              {/* Spacer */}
              <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start max-w-[70px] xs:hidden sm:hidden md:hidden" />

              {/* Middle column — border only if content */}
              <div className={`self-stretch flex-1 ${hasMid ? "border-[#000] border-solid border-b-[2px]" : ""} overflow-hidden flex flex-col items-start justify-end pt-0 px-0 pb-[5px] xs:hidden sm:hidden md:hidden`}>
                {hasMid && (
                  <div className="relative leading-[121.1%] font-light lg:text-[15px] text-[#000]">
                    <p className="m-0">{content.mid.l1}</p>
                    {content.mid.l2 && <p className="m-0">{content.mid.l2}</p>}
                  </div>
                )}
              </div>

              {/* Spacer */}
              <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between max-w-[70px] xs:hidden sm:hidden md:hidden" />

              {/* Right column — border only if content */}
              <div className={`self-stretch flex-1 ${hasRight ? "border-[#000] border-solid border-b-[2px]" : ""} overflow-hidden flex flex-col items-start justify-end pt-0 px-0 pb-[5px] xs:hidden sm:hidden md:hidden`}>
                {hasRight && (
                  <div className="relative leading-[121.1%] font-light lg:text-[15px] text-[#000]">
                    <p className="m-0">{content.right.l1}</p>
                    {content.right.l2 && <p className="m-0">{content.right.l2}</p>}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageHeader;
