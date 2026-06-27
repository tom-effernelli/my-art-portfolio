"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import TopBar from "../components/top-bar";
import { tileSizes } from "../lib/tile-sizes";

function VideoAutoplay({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) tryPlay(); },
      { threshold: 0.1 }
    );
    observer.observe(v);
    v.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    return () => { observer.disconnect(); v.removeEventListener("canplay", tryPlay); };
  }, []);
  return <video ref={ref} src={src} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover" />;
}

const CLOUD = "https://res.cloudinary.com/dixdfunwk/image/upload";
const CLOUD_VID = "https://res.cloudinary.com/dixdfunwk/video/upload";
const BLUE = "#0015ff";

// Home showcase. Each tile occupies an explicit grid area (rowStart / colStart / rowEnd / colEnd)
// over a 3-column grid. To turn a placeholder into a real video, set `video` to an .mp4 URL.
const tiles = [
  { area: "1 / 1 / 10 / 2",  img: `${CLOUD}/v1782413583/A7400036_-_P_jy9kpi.jpg`, pos: "center",     label: "(01) SHOOTING 001 — MODEL" },
  { area: "1 / 2 / 4 / 3",   video: `${CLOUD_VID}/blur_text_qyh2da.mp4`,                               label: "" },
  { area: "4 / 2 / 10 / 3",  img: `${CLOUD}/A7400458_-_P_bu3j6l.jpg`,              pos: "center 25%", label: "(03) SHOOTING 002 — OUTDOOR" },
  { area: "1 / 3 / 5 / 4",   img: `${CLOUD}/A7400326_-_P_l66zkz.jpg`,              pos: "center 30%", label: "(04) SHOOTING 002 — URBAN" },
  { area: "5 / 3 / 7 / 4",   video: `${CLOUD_VID}/man_looking_pixel_vbanqt.mp4`,                      label: "" },
  { area: "7 / 3 / 16 / 4",  img: `${CLOUD}/A7400626_-_P_jjhdap.jpg`,              pos: "center",     label: "(06) SHOOTING 002 — OUTDOOR" },
  { area: "10 / 1 / 16 / 3", video: `${CLOUD_VID}/crt_mbofse.mp4`,                                    label: "" },
  { area: "16 / 1 / 23 / 2", img: `${CLOUD}/A7400837_-_P_kudkcj.jpg`,              pos: "center 22%", label: "(08) SHOOTING 002 — MODEL" },
  { area: "16 / 2 / 20 / 3", video: `${CLOUD_VID}/m2-res_640p_a9hqy4.mp4`,                            label: "" },
  { area: "16 / 3 / 22 / 4", img: `${CLOUD}/A7400519_-_P_pizn6n.jpg`,              pos: "center",     label: "(10) SHOOTING 002 — URBAN" },
  { area: "20 / 2 / 26 / 3", img: `${CLOUD}/A7400043_-_P_gvna5s.jpg`,              pos: "center",     label: "(11) SHOOTING 001 — CINEMA" },
  { area: "22 / 3 / 26 / 4", video: `${CLOUD_VID}/shoe_qbbc5x.mp4`,                                   label: "" },
  { area: "23 / 1 / 26 / 2", img: `${CLOUD}/A7400123_-_P_dzt4hl.jpg`,              pos: "center",     label: "(13) SHOOTING 001 — INDOOR" },
];

function Tile({ t }) {
  return (
    <div style={{ gridArea: t.area }} className="relative overflow-hidden">
      {t.img ? (
        <Image src={t.img} alt={t.label} fill sizes={tileSizes(t.area, { desktopRowPx: 70, mobileRowPx: 34 })} className="object-cover" style={{ objectPosition: t.pos || "center" }} />
      ) : t.video ? (
        <VideoAutoplay src={t.video} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#181818]" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.22)" }}>
          <span className="font-mono text-[12px] tracking-[0.16em]" style={{ color: BLUE }}>▶ VIDÉO</span>
        </div>
      )}
      <span className="absolute left-2.5 bottom-3 font-mono text-[10px] xs:hidden text-white mix-blend-difference">{t.label}</span>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <TopBar currentPage="home" theme="dark" />

      <div className="sel-light w-full min-h-screen bg-[#111] text-white flex flex-col items-start">

        {/* Showcase — asymmetric, borderless, photo + video */}
        <div className="self-stretch grid grid-cols-3 gap-0 auto-rows-[70px] md:auto-rows-[58px] sm:auto-rows-[42px] xs:auto-rows-[34px] leading-[0]">
          {tiles.map((t) => (<Tile key={`${t.area}-${t.label}`} t={t} />))}
        </div>

      </div>

    </>
  );
};

export default Home;
