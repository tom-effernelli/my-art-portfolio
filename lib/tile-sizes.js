// Derive a correct `sizes` value from a tile's area string so Next.js serves
// the right resolution. Area format: "rowStart / colStart / rowEnd / colEnd".
//
// With object-cover, whichever dimension constrains the scale determines the
// effective pixel width needed. For portrait photos (assumed 2:3 ratio), a tall
// narrow tile is height-constrained: the image must fill the height, so the
// required width = height × (2/3) — often larger than the container's own width.
//
// desktopRowPx / mobileRowPx must match the auto-rows values used in the grid.
export function tileSizes(area, { desktopRowPx = 170, mobileRowPx = 120 } = {}) {
  const [r0, c0, r1, c1] = area.split("/").map((s) => parseInt(s.trim(), 10));
  const rowSpan = r1 - r0;
  const colFraction = (c1 - c0) / 3;
  const imgRatio = 2 / 3; // assumed portrait aspect ratio (w:h)

  function neededVw(viewportPx, rowPx) {
    const w = colFraction * viewportPx;
    const h = rowSpan * rowPx;
    const effective = w / h < imgRatio ? h * imgRatio : w;
    return Math.ceil((effective / viewportPx) * 100);
  }

  // Desktop: reference viewport 1440px (capped at 100vw)
  const desktopVw = Math.max(1, Math.min(100, neededVw(1440, desktopRowPx)));

  // Mobile: reference viewport 390px (modern phone).
  // Can exceed 100vw — the browser uses it as a hint to select a larger srcset
  // entry, which is the intended effect for very tall narrow tiles.
  const mobileVw = Math.max(1, Math.min(200, neededVw(390, mobileRowPx)));

  return `(max-width: 565px) ${mobileVw}vw, ${desktopVw}vw`;
}
