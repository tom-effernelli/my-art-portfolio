"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import JSZip from "jszip";

const ContactSheet = ({ mediaItems = [], isLight = true, zipName = "shooting" }) => {
  const images = mediaItems.filter((m) => m.type === "image");

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zipping, setZipping] = useState(false);

  const openLightbox = (i) => {
    setLightboxIndex(i);
    window.dispatchEvent(new CustomEvent("lightbox-open"));
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    window.dispatchEvent(new CustomEvent("lightbox-close"));
  };

  const goPrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : i === 0 ? images.length - 1 : i - 1
      ),
    [images.length]
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : i === images.length - 1 ? 0 : i + 1
      ),
    [images.length]
  );

  // Keyboard nav for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, goPrev, goNext]);

  const handleDownload = async (src, alt) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = alt?.replace(/\s+/g, "-") || "photo";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  };

  const handleDownloadAll = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        images.map(async (item, i) => {
          const response = await fetch(item.src);
          const blob = await response.blob();
          const ext = item.src.split(".").pop().split("?")[0] || "jpg";
          zip.file(`${zipName}-${String(i + 1).padStart(2, "0")}.${ext}`, blob);
        })
      );
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${zipName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Erreur lors du téléchargement.");
    } finally {
      setZipping(false);
    }
  };

  const current = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      {/* Lightbox */}
      {current && (
        <div
          className="sel-light fixed inset-0 z-[300000] bg-black/90 flex items-center justify-center p-10 xs:p-4"
          onClick={closeLightbox}
        >
          {/* Top-right controls */}
          <div className="absolute top-5 right-5 flex items-center gap-4 z-10">
            <span className="text-white/60 text-sm font-mono mr-1">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              className="text-white hover:opacity-60 transition-opacity"
              onClick={(e) => { e.stopPropagation(); handleDownload(current.src, current.alt); }}
              aria-label="Télécharger"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/>
              </svg>
            </button>
            <button
              className="text-white text-[40px] leading-none hover:opacity-60 transition-opacity"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          {/* Prev */}
          <button
            className="absolute left-5 xs:left-2 text-white w-12 h-12 flex items-center justify-center hover:opacity-60 transition-opacity z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Précédent"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-5 xs:right-2 text-white w-12 h-12 flex items-center justify-center hover:opacity-60 transition-opacity z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Suivant"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </button>
        </div>
      )}

      {/* Contact-sheet grid */}
      <div className="relative z-[100000] w-full grid grid-cols-5 gap-2.5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xs:gap-1.5">
        {images.map((item, i) => (
          <button
            key={item.src}
            onClick={() => openLightbox(i)}
            className="group relative aspect-[4/5] overflow-hidden bg-[#a7cff4] border border-black/25 cursor-pointer [padding:0]"
            aria-label={`Ouvrir ${item.alt || "photo"}`}
          >
            <Image
              src={item.src}
              alt={item.alt || `${zipName} ${i + 1}`}
              fill
              sizes="(max-width: 565px) 50vw, (max-width: 1034px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />

            {/* Frame number */}
            <span className="absolute top-1.5 left-2 text-[10px] font-mono tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white text-[11px] font-medium tracking-[0.14em]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                VIEW
              </span>
            </div>

            {/* Download (hover, corner) */}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); handleDownload(item.src, item.alt); }}
              className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/55 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center"
              aria-label="Télécharger"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/></svg>
            </span>
          </button>
        ))}
      </div>

      {/* Download all */}
      {images.length > 0 && (
        <div className="w-full flex justify-end mt-4">
          <button
            className={`flex items-center gap-2 text-sm border px-4 py-2 transition-opacity duration-200 ${zipping ? "opacity-40 cursor-not-allowed" : "hover:opacity-60"} ${isLight ? "border-[#000] text-[#000]" : "border-white text-white"}`}
            onClick={handleDownloadAll}
            disabled={zipping}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/>
            </svg>
            {zipping ? "Compression..." : "Download all"}
          </button>
        </div>
      )}
    </>
  );
};

export default ContactSheet;
