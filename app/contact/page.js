"use client";
import TopBar from "../../components/top-bar";

const BLUE = "#ffffff";

const elsewhere = [
  { label: "INSTAGRAM", value: "@txmfrn_", href: "https://www.instagram.com/txmfrn_/", accent: true },
  { label: "EMAIL", value: "tom.effernelli@gmail.com", href: "mailto:tom.effernelli@gmail.com", accent: true },
  { label: "AGENCY", value: "FREELANCE / DIRECT", href: null, accent: false },
];

const availability = [
  { label: "BASED IN", value: "PARIS, FR" },
  { label: "STATUS", value: "OPEN — WORLDWIDE" },
  { label: "FOR", value: "EDITORIAL · FASHION" },
];

export default function ContactPage() {
  return (
    <>
      <TopBar currentPage="contact" theme="dark" />

      <div className="sel-light w-full min-h-screen bg-[#111] text-white flex flex-col items-start">

        {/* Heading */}
        <div className="self-stretch px-[30px] xs:px-[18px] pt-[40px] pb-[16px]">
          <span className="font-mono text-[12px] tracking-[0.14em]" style={{ color: "rgba(255,255,255,.55)" }}>LET&apos;S WORK TOGETHER</span>
          <div className="font-archivo-exp font-extrabold text-[104px] lg:text-[96px] md:text-[72px] sm:text-[52px] xs:text-[36px] leading-[0.84] tracking-[-0.035em] mt-2.5">
            CON<span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>TACT</span><span style={{ color: BLUE }}>.</span>
          </div>
        </div>

        {/* Big mailto */}
        <a
          href="mailto:tom.effernelli@gmail.com"
          className="sel-dark self-stretch flex items-center justify-between gap-5 [text-decoration:none] text-black px-[30px] xs:px-[18px] py-[30px] xs:py-[22px] mt-6 group"
          style={{ background: BLUE }}
        >
          <span className="font-archivo font-bold text-[42px] md:text-[34px] sm:text-[26px] xs:text-[20px] tracking-[-0.02em] [word-break:break-word] transition-opacity duration-200 group-hover:opacity-80">
            tom.effernelli@gmail.com
          </span>
          <span className="font-archivo-exp font-extrabold text-[42px] xs:text-[26px] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>

        {/* Detail */}
        <div className="self-stretch grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-[48px] sm:gap-[32px] xs:gap-[28px] px-[30px] xs:px-[18px] pt-[36px] pb-[60px]">

          <div className="flex flex-col">
            <div className="font-mono text-[12px] tracking-[0.14em] pb-2.5 mb-1 border-b-[1.5px]" style={{ color: BLUE, borderColor: "rgba(255,255,255,.3)" }}>/ ELSEWHERE</div>
            {elsewhere.map(({ label, value, href, accent }) => (
              <div key={label} className="flex items-baseline justify-between border-b py-3 font-mono text-[13px]" style={{ borderColor: "rgba(255,255,255,.14)" }}>
                <span className="opacity-55">{label}</span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="[text-decoration:none] text-white hover:opacity-70 transition-opacity"
                    style={{ borderBottom: `1px solid ${BLUE}` }}
                  >
                    {value}
                  </a>
                ) : (
                  <span className="opacity-50">{value}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="font-mono text-[12px] tracking-[0.14em] pb-2.5 mb-1 border-b-[1.5px]" style={{ color: BLUE, borderColor: "rgba(255,255,255,.3)" }}>/ AVAILABILITY</div>
            {availability.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between border-b py-3 font-mono text-[13px]" style={{ borderColor: "rgba(255,255,255,.14)" }}>
                <span className="opacity-55">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </>
  );
}
