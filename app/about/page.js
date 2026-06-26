"use client";
import Image from "next/image";
import TopBar from "../../components/top-bar";

const CLOUD = "https://res.cloudinary.com/dixdfunwk/image/upload";
const BLUE = "#3B54C9";

const measurements = [
  { label: "HEIGHT",     value: "188,5 CM" },
  { label: "SUIT",       value: "52" },
  { label: "CHEST",      value: "105 CM" },
  { label: "WAIST",      value: "83 CM" },
  { label: "HIPS",       value: "95,5 CM" },
  { label: "INSEAM",     value: "80 CM" },
  { label: "NECK",       value: "36,5 CM" },
  { label: "SHOE SIZE",  value: "46" },
  { label: "HAIR",       value: "DARK BLONDE / CURLY" },
  { label: "EYES",       value: "BROWN" },
];

const digitals = [
  { label: "FRONT",   src: `${CLOUD}/01_EFFERNELLI_Tom_FACE_NEUTRE_fzhcvq.jpg` },
  { label: "PROFILE", src: `${CLOUD}/03_EFFERNELLI_Tom_PROFIL_DROIT_yxmnwg.jpg` },
  { label: "BACK",    src: `${CLOUD}/05_EFFERNELLI_Tom_3-4_pax3ao.jpg` },
  { label: "FULL",    src: `${CLOUD}/06_EFFERNELLI_Tom_PLAN_AMERICAIN_sm13lu.png` },
];

export default function AboutPage() {
  return (
    <>
      <TopBar currentPage="about" theme="light" />

      <div className="w-full min-h-screen bg-white text-[#111] flex flex-col items-start px-[30px] xs:px-[18px] pb-[80px] gap-[44px] xs:gap-[34px]">

        {/* Heading */}
        <div className="self-stretch flex items-end justify-between gap-4 pt-[30px]">
          <div className="font-archivo-exp font-extrabold text-[96px] lg:text-[88px] md:text-[68px] sm:text-[52px] xs:text-[38px] leading-[0.84] tracking-[-0.035em]">
            ABOUT<span style={{ color: BLUE }}>.</span>
          </div>
          <span className="font-mono text-[12px] opacity-60 mb-2 sm:hidden xs:hidden">(IDENTITY — PARIS / FR)</span>
        </div>

        {/* AS A MODEL */}
        <div className="self-stretch flex flex-col gap-5">
          <div className="font-mono text-[12px] tracking-[0.14em]" style={{ color: BLUE }}>/ AS A MODEL</div>

          <div className="self-stretch flex gap-[40px] sm:flex-col xs:flex-col items-start">

            {/* Digitals */}
            <div className="w-[42%] max-w-[520px] sm:w-full sm:max-w-none xs:w-full xs:max-w-none flex flex-col gap-3">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em] pb-1.5 border-b border-[#111]/30">
                <span>DIGITALS</span>
                <span className="opacity-55">NO RETOUCH · 2025</span>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {digitals.map((d) => (
                  <div key={d.label} className="relative aspect-[3/4] overflow-hidden bg-[#111]">
                    <Image src={d.src} alt={`Digital — ${d.label}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] text-white mix-blend-difference">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Identity + measurements */}
            <div className="flex-1 w-full flex flex-col gap-1.5">
              <div className="font-archivo font-extrabold text-[20px]">TOM EFFERNELLI</div>
              <p className="m-0 font-archivo font-normal text-[15px] leading-[1.4] opacity-80 mb-2.5">
                Editorial &amp; fashion model based in Paris. Available worldwide.
              </p>
              <div className="font-mono text-[11px] tracking-[0.14em] pb-2 border-b-[1.5px] border-[#111]" style={{ color: BLUE }}>
                MODEL MEASUREMENTS
              </div>
              <div className="flex flex-col">
                {measurements.map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between border-b border-[#111]/15 py-2 font-mono text-[12px]">
                    <span className="opacity-55">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://res.cloudinary.com/dixdfunwk/image/upload/v1781818091/book-tom-effernelli_h668nc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.1em] w-fit pb-[3px] mt-3 [text-decoration:none] hover:opacity-60 transition-opacity"
                style={{ color: BLUE, borderBottom: `1.5px solid ${BLUE}` }}
              >
                VIEW / DOWNLOAD BOOK ↓
              </a>
            </div>

          </div>
        </div>

        {/* AS A PHOTOGRAPHER */}
        <div className="self-stretch flex flex-col gap-4 pt-2">
          <div className="font-mono text-[12px] tracking-[0.14em]" style={{ color: BLUE }}>/ AS A PHOTOGRAPHER</div>
          <p className="m-0 font-archivo font-normal text-[18px] xs:text-[15px] leading-[1.5] max-w-[480px]">
            Editorial and fashion photographer based in Paris. Available worldwide.
          </p>
        </div>

      </div>

    </>
  );
}
