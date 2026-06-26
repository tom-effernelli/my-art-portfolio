"use client";
import MediaGrid from "../../components/media-grid";
import TopBar from "../../components/top-bar";

const CLOUD = "https://res.cloudinary.com/dixdfunwk/image/upload";

// Shooting 002 — Each tile occupies an explicit grid area (rowStart / colStart / rowEnd / colEnd)
// over a 3-column grid. Adjust area values to rearrange the layout freely.
const shooting2tiles = [
  { area: "1 / 1 / 9 / 2",  img: `${CLOUD}/A7400837_-_P_kudkcj.jpg`,  pos: "center 22%", label: "(01) SHOOTING 002 — 01" },
  { area: "1 / 2 / 5 / 3",  img: `${CLOUD}/A7400519_-_P_pizn6n.jpg`,  pos: "center",     label: "(02) SHOOTING 002 — 02" },
  { area: "1 / 3 / 7 / 4",  img: `${CLOUD}/A7400326_-_P_l66zkz.jpg`,  pos: "center 30%", label: "(03) SHOOTING 002 — 03" },
  { area: "5 / 2 / 11 / 3", img: `${CLOUD}/A7400458_-_P_bu3j6l.jpg`,  pos: "center 25%", label: "(04) SHOOTING 002 — 04" },
  { area: "7 / 3 / 13 / 4", img: `${CLOUD}/A7400522_-_P_bpbvbr.jpg`,  pos: "center",     label: "(05) SHOOTING 002 — 05" },
  { area: "9 / 1 / 17 / 2", img: `${CLOUD}/A7400628_-_P_hb6go8.jpg`,  pos: "center",     label: "(06) SHOOTING 002 — 06" },
  { area: "11 / 2 / 17 / 3",img: `${CLOUD}/A7400722_-_P_i1kr2u.jpg`,  pos: "center",     label: "(07) SHOOTING 002 — 07" },
  { area: "13 / 3 / 19 / 4",img: `${CLOUD}/A7400626_-_P_jjhdap.jpg`,  pos: "center",     label: "(08) SHOOTING 002 — 08" },
  { area: "17 / 1 / 21 / 3",img: `${CLOUD}/A7400515_-_P_enjn1p.jpg`,  pos: "center",     label: "(09) SHOOTING 002 — 09" },
  { area: "19 / 3 / 21 / 4",img: `${CLOUD}/A7400471_-_P_dwdcsh.jpg`,  pos: "center",     label: "(10) SHOOTING 002 — 10" },
];

// Shooting 001 — same principle, adjust area values freely.
const shooting1tiles = [
  { area: "1 / 1 / 8 / 2",  img: `${CLOUD}/v1782413583/A7400036_-_P_jy9kpi.jpg`, pos: "center",     label: "(01) SHOOTING 001 — 01" },
  { area: "1 / 2 / 5 / 3",  img: `${CLOUD}/A7400043_-_P_gvna5s.jpg`,              pos: "center",     label: "(02) SHOOTING 001 — 02" },
  { area: "1 / 3 / 6 / 4",  img: `${CLOUD}/A7400042_-_P_y2qkv5.jpg`,              pos: "center",     label: "(03) SHOOTING 001 — 03" },
  { area: "5 / 2 / 8 / 3",  img: `${CLOUD}/A7400123_-_P_dzt4hl.jpg`,              pos: "center",     label: "(04) SHOOTING 001 — 04" },
  { area: "6 / 3 / 9 / 4",  img: `${CLOUD}/A7400080_-_P_-_Cinema_ifanny.jpg`,     pos: "center",     label: "(05) SHOOTING 001 — 05" },
  { area: "8 / 1 / 13 / 3", img: `${CLOUD}/A7400095_-_P_-_Cinema_d6evbn.jpg`,     pos: "center",     label: "(06) SHOOTING 001 — 06" },
  { area: "9 / 3 / 13 / 4", img: `${CLOUD}/A7400072_-_P_-_Cinema_yj8wtk.jpg`,     pos: "center",     label: "(07) SHOOTING 001 — 07" },
];

const shootings = [
  { title: "SHOOTING 002", tiles: shooting2tiles, zipName: "shooting-02" },
  { title: "SHOOTING 001", tiles: shooting1tiles, zipName: "shooting-01" },
];

export default function PhotographyPage() {
  return (
    <>
      <TopBar currentPage="photography" theme="light" />

      <div className="w-full min-h-screen bg-white text-[#111] flex flex-col items-start pb-[80px] gap-[56px] xs:gap-[40px]">

        {/* Heading */}
        <div className="self-stretch flex flex-col items-start gap-5 px-[30px] xs:px-[18px] pt-[30px]">
          <div className="font-archivo-exp font-extrabold text-[96px] lg:text-[88px] md:text-[68px] sm:text-[52px] xs:text-[38px] leading-[0.84] tracking-[-0.035em]">
            PHOTOGRAPHY.
          </div>
          <p className="m-0 font-mono text-[12px] tracking-[0.06em] text-left opacity-60 sm:hidden xs:hidden">
            All the shootings I directed as a photographer.
          </p>
        </div>

        {shootings.map((s) => (
          <div key={s.title} className="self-stretch flex flex-col gap-4">
            <div className="self-stretch flex items-baseline justify-between gap-4 px-[30px] xs:px-[18px]">
              <span className="font-archivo font-bold text-[22px] xs:text-[18px]">{s.title}</span>
              <span className="font-mono text-[11px] tracking-[0.12em] opacity-55">
                {String(s.tiles.filter(t => t.img).length).padStart(2, "0")} FRAMES — DOWNLOAD ↓
              </span>
            </div>
            <MediaGrid tiles={s.tiles} zipName={s.zipName} />
          </div>
        ))}

      </div>

    </>
  );
}
