"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import JSZip from "jszip";

// Asymmetric span pattern (4-col base). Cycles to give an uneven, borderless mosaic.
const SPAN = [
  { c: 2, r: 2 }, { c: 1, r: 2 }, { c: 1, r: 1 }, { c: 1, r: 1 },
  { c: 2, r: 1 }, { c: 1, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 },
];

// tiles mode: each tile has { area, img, pos, label }
// items mode (legacy): array of { type, src, alt }
import { tileSizes } from "../lib/tile-sizes";

export default function MediaGrid({ items = [], tiles = null, zipName = "shooting", dark = false }) {
  const images = tiles
    ? tiles.filter((t) => t.img).map((t) => ({ src: t.img, alt: t.label }))
    : items.filter((m) => m.type === "image");

  const [idx, setIdx] = useState(null);
  const [zipping, setZipping] = useState(false);

  const open = (i) => { setIdx(i); window.dispatchEvent(new CustomEvent("lightbox-open")); };
  const close = () => { setIdx(null); window.dispatchEvent(new CustomEvent("lightbox-close")); };
  const prev = useCallback(() => setIdx((i) => (i === null ? i : i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : i === images.length - 1 ? 0 : i + 1)), [images.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, prev, next]);

  const download = async (src, alt) => {
    try {
      const r = await fetch(src);
      const b = await r.blob();
      const u = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = u;
      a.download = (alt || "photo").replace(/\s+/g, "-");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(u);
    } catch {
      window.open(src, "_blank");
    }
  };

  const downloadAll = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        images.map(async (it, i) => {
          const r = await fetch(it.src);
          const b = await r.blob();
          const ext = it.src.split(".").pop().split("?")[0] || "jpg";
          zip.file(`${zipName}-${String(i + 1).padStart(2, "0")}.${ext}`, b);
        })
      );
      const content = await zip.generateAsync({ type: "blob" });
      const u = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = u;
      a.download = `${zipName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(u);
    } catch {
      alert("Erreur lors du téléchargement.");
    } finally {
      setZipping(false);
    }
  };

  const current = idx !== null ? images[idx] : null;

  const Lightbox = () => current && (
    <div className="fixed inset-0 z-[300000] bg-black/90 flex items-center justify-center p-10 xs:p-4" onClick={close}>
      <div className="absolute top-5 right-5 flex items-center gap-4 z-10">
        <span className="text-white/60 text-sm font-mono mr-1">
          {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button className="text-white hover:opacity-60 transition-opacity" onClick={(e) => { e.stopPropagation(); download(current.src, current.alt); }} aria-label="Télécharger">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/></svg>
        </button>
        <button className="text-white text-[40px] leading-none hover:opacity-60 transition-opacity" onClick={close} aria-label="Fermer">×</button>
      </div>
      <button className="absolute left-5 xs:left-2 text-white w-12 h-12 flex items-center justify-center hover:opacity-60 transition-opacity z-10" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Précédent">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={current.src} alt={current.alt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
      <button className="absolute right-5 xs:right-2 text-white w-12 h-12 flex items-center justify-center hover:opacity-60 transition-opacity z-10" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Suivant">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </button>
    </div>
  );

  const DownloadAll = () => images.length > 0 && (
    <div className="w-full flex justify-end mt-4 px-[30px] xs:px-[18px]">
      <button
        className={`font-mono flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase border px-4 py-2 transition-opacity duration-200 ${zipping ? "opacity-40 cursor-not-allowed" : "hover:opacity-60"} ${dark ? "border-white text-white" : "border-[#111] text-[#111]"}`}
        onClick={downloadAll}
        disabled={zipping}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/></svg>
        {zipping ? "Compression..." : "Download all"}
      </button>
    </div>
  );

  // ── Tiles mode: explicit grid areas, freely positioned ──────────────────────
  if (tiles) {
    return (
      <>
        <Lightbox />
        {/* Each tile occupies an explicit grid area (rowStart / colStart / rowEnd / colEnd)
            over a 3-column grid. Adjust area values in the page file to change the layout. */}
        <div className="relative z-[1] w-full grid grid-cols-3 gap-0 auto-rows-[170px] md:auto-rows-[150px] sm:auto-rows-[130px] xs:auto-rows-[120px] leading-[0]">
          {tiles.map((t, i) => {
            const imgIdx = tiles.slice(0, i + 1).filter((x) => x.img).length - 1;
            return (
              <div
                key={t.label || i}
                style={{ gridArea: t.area }}
                className={`relative overflow-hidden ${t.img ? "cursor-pointer group" : ""}`}
                onClick={() => t.img && open(imgIdx)}
              >
                {t.img ? (
                  <Image
                    src={t.img}
                    alt={t.label || `${zipName} ${i + 1}`}
                    fill
                    sizes={tileSizes(t.area, { desktopRowPx: 170, mobileRowPx: 120 })}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    style={{ objectPosition: t.pos || "center" }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#e8e8e8]" />
                )}
                {t.img && (
                  <>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white text-[11px] font-medium tracking-[0.14em]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                        VIEW
                      </span>
                    </div>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => { e.stopPropagation(); download(t.img, t.label); }}
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/55 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center"
                      aria-label="Télécharger"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/></svg>
                    </span>
                  </>
                )}
                <span className="absolute left-2.5 bottom-3 font-mono text-[10px] text-white mix-blend-difference">{t.label}</span>
              </div>
            );
          })}
        </div>
        <DownloadAll />
      </>
    );
  }

  // ── Items mode (legacy): automatic asymmetric mosaic ────────────────────────
  return (
    <>
      <Lightbox />
      <div className="relative z-[1] w-full grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-0 auto-rows-[170px] md:auto-rows-[150px] sm:auto-rows-[130px] xs:auto-rows-[120px] grid-flow-row-dense">
        {images.map((item, i) => {
          const s = SPAN[i % SPAN.length];
          return (
            <button
              key={item.src}
              onClick={() => open(i)}
              style={{ gridColumn: `span ${s.c}`, gridRow: `span ${s.r}` }}
              className="group relative overflow-hidden cursor-pointer [padding:0] bg-[#111]"
              aria-label={`Ouvrir ${item.alt || "photo"}`}
            >
              <Image
                src={item.src}
                alt={item.alt || `${zipName} ${i + 1}`}
                fill
                sizes="(max-width: 565px) 50vw, (max-width: 1034px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute top-2 left-2.5 font-mono text-[10px] tracking-wider text-white mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white text-[11px] font-medium tracking-[0.14em]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                  VIEW
                </span>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); download(item.src, item.alt); }}
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/55 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center"
                aria-label="Télécharger"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/></svg>
              </span>
            </button>
          );
        })}
      </div>
      <DownloadAll />
    </>
  );
}
