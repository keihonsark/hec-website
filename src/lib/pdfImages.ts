/**
 * Load a local image and convert to base64 via canvas.
 */
export async function localImageToBase64(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Fetch satellite image via our server-side proxy to avoid CORS.
 */
async function fetchSatelliteImage(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const res = await fetch(
      `/api/satellite-image?lat=${lat}&lng=${lng}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.image || null;
  } catch {
    return null;
  }
}

export interface PdfImages {
  owensCorning: string | null;
  bbb: string | null;
  anlin: string | null;
  satellite: string | null;
}

/**
 * Pre-load all images needed for the PDF report.
 */
export async function loadPdfImages(
  lat: number,
  lng: number
): Promise<PdfImages> {
  const [owensCorning, bbb, anlin, satellite] = await Promise.all([
    localImageToBase64("/images/logos/owens-preferred-logo.png"),
    localImageToBase64("/images/logos/bbb-logo.png"),
    localImageToBase64("/images/logos/anlin-logo.png"),
    fetchSatelliteImage(lat, lng),
  ]);

  return { owensCorning, bbb, anlin, satellite };
}
