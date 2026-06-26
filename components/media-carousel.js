"use client";
import Image from "next/image";
import { useState } from "react";
import JSZip from "jszip";

const MediaCarousel = ({ mediaItems, buttonBgColor = "#090909", zipName = "shooting" }) => {
  const isLight = buttonBgColor === "#b2dafa";
  const btnClass = isLight
    ? `bg-[#b2dafa] border-[#000] text-[#000] hover:bg-[#000] hover:text-[#b2dafa]`
    : buttonBgColor === "#090909"
    ? `bg-[#090909] border-white text-white hover:bg-white hover:text-[#090909]`
    : `bg-[#050505] border-white text-white hover:bg-white hover:text-[#050505]`;

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zipping, setZipping] = useState(false);

  const handleDownloadAll = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      const images = mediaItems.filter((m) => m.type === "image");
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

  const goToPrevious = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentMediaIndex((prev) =>
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="absolute top-5 right-5 flex items-center gap-4">
            <button
              className="text-white hover:opacity-60 transition-opacity"
              onClick={(e) => { e.stopPropagation(); handleDownload(currentMedia.src, currentMedia.alt); }}
              aria-label="Télécharger"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/>
              </svg>
            </button>
            <button
              className="text-white text-[40px] leading-none hover:opacity-60 transition-opacity"
              onClick={() => setLightboxOpen(false)}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentMedia.src}
            alt={currentMedia.alt}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="self-stretch w-full relative flex items-center justify-center my-8">
        <button
          className={`absolute left-0 z-10 w-12 h-12 lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-8 sm:h-8 xs:w-6 xs:h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ${btnClass}`}
          onClick={goToPrevious}
          aria-label="Média précédent"
        >
          <svg className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <div className="w-full max-w-[1000px] mx-auto px-20 lg:px-20 md:px-16 sm:px-12 xs:px-10">
          <div className="relative w-full overflow-hidden rounded-lg group">
            {currentMedia.type === "image" ? (
              <>
                <Image
                  className="w-full h-auto max-h-[550px] object-contain"
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  width={1000}
                  height={550}
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200"
                    onClick={() => handleDownload(currentMedia.src, currentMedia.alt)}
                    aria-label="Télécharger"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8v2h14v-2H5z"/>
                    </svg>
                  </button>
                  <button
                    className="bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Voir en plein écran"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={currentMedia.src}
                  title={currentMedia.title || currentMedia.alt}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        <button
          className={`absolute right-0 z-10 w-12 h-12 lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-8 sm:h-8 xs:w-6 xs:h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ${btnClass}`}
          onClick={goToNext}
          aria-label="Média suivant"
        >
          <svg className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
      {mediaItems.some((m) => m.type === "image") && (
        <div className="w-full flex justify-end mt-2 px-20 lg:px-20 md:px-16 sm:px-12 xs:px-10">
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

export default MediaCarousel;
