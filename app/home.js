"use client";
import Image from "next/image";
import Link from "next/link";
import TopBar from "../components/top-bar";

const CLOUD = "https://res.cloudinary.com/dixdfunwk/image/upload";
const BLUE = "#0015ff";

// Home showcase. Each tile occupies an explicit grid area (rowStart / colStart / rowEnd / colEnd)
// over a 3-column × 9-row grid. To turn a placeholder into a real video, set `video` to an .mp4 URL.
const tiles = [
  { area: "1 / 1 / 10 / 2",  img: `${CLOUD}/A7400837_-_P_kudkcj.jpg`, pos: "center 22%", label: "(01) SHOOTING 01 — MODEL" },
  { area: "1 / 2 / 4 / 3",  video: null, label: "(02) FILM — À AJOUTER" },
  { area: "4 / 2 / 10 / 3", img: `${CLOUD}/A7400458_-_P_bu3j6l.jpg`, pos: "center 25%", label: "(03) SHOOTING 02 — OUTDOOR" },
  { area: "1 / 3 / 5 / 4",  img: `${CLOUD}/A7400326_-_P_l66zkz.jpg`, pos: "center 30%", label: "(04) EDITORIAL — MODEL" },
  { area: "5 / 3 / 7 / 4",  video: null, label: "(05) FILM — À AJOUTER" },
  { area: "7 / 3 / 16 / 4", img: `${CLOUD}/A7400626_-_P_jjhdap.jpg`, pos: "center", label: "(06) SHOOTING 03 — MODEL" },
  { area: "10 / 1 / 16 / 3", video: null, label: "(07) FILM — À AJOUTER" },
];

function Tile({ t }) {
  return (
    <div style={{ gridArea: t.area }} className="relative overflow-hidden">
      {t.img ? (
        <Image src={t.img} alt={t.label} fill sizes="33vw" className="object-cover" style={{ objectPosition: t.pos || "center" }} />
      ) : t.video ? (
        <video src={t.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#181818]" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.22)" }}>
          <span className="font-mono text-[12px] tracking-[0.16em]" style={{ color: BLUE }}>▶ VIDÉO</span>
        </div>
      )}
      <span className="absolute left-2.5 bottom-3 font-mono text-[10px] text-white mix-blend-difference">{t.label}</span>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <TopBar currentPage="home" theme="dark" />

      <div className="w-full min-h-screen bg-[#111] text-white flex flex-col items-start">

        {/* Showcase — asymmetric, borderless, photo + video */}
        <div className="self-stretch grid grid-cols-3 gap-0 auto-rows-[70px] md:auto-rows-[58px] sm:auto-rows-[42px] xs:auto-rows-[34px] leading-[0]">
          {tiles.map((t) => (<Tile key={t.label} t={t} />))}
        </div>

      </div>

    </>
  );
};

export default Home;
