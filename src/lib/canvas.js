// DPR-aware canvas resize and initialization helper
// Clamps DPR at 2 to preserve GPU performance on high-density retina displays

export function setupCanvas(canvas, width, height) {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);

  return { ctx, dpr };
}
