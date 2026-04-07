/**
 * Load an image from a local path and convert to base64 via canvas.
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
 * Load an external image via fetch (avoids CORS canvas tainting).
 */
async function fetchImageToBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export interface PdfImages {
  logo: string | null;
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
  const satelliteUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=20&size=600x400&maptype=satellite&key=AIzaSyCE6KM3DxgCo3eEEQm7JPgBqa1bvdmjLq8`;

  const [logo, owensCorning, bbb, anlin, satellite] = await Promise.all([
    localImageToBase64("/images/logos/hec-logo.png"),
    localImageToBase64("/images/logos/owens-preferred-logo.png"),
    localImageToBase64("/images/logos/bbb-logo.png"),
    localImageToBase64("/images/logos/anlin-logo.png"),
    fetchImageToBase64(satelliteUrl),
  ]);

  return { logo, owensCorning, bbb, anlin, satellite };
}
