const API_KEY = "AIzaSyC7tisfRjDJMcb1eCKsJgel_WWJz5rnRAs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return Response.json({ image: null, error: "Missing lat/lng" }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=20&size=600x400&maptype=satellite&key=${API_KEY}`;
  console.log("[satellite-image] Fetching:", url);

  try {
    const res = await fetch(url);
    console.log("[satellite-image] Response status:", res.status, res.statusText);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[satellite-image] Error body:", text);
      return Response.json(
        { image: null, error: `Google API returned ${res.status}: ${res.statusText}` },
        { status: 502 }
      );
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${contentType};base64,${base64}`;

    console.log("[satellite-image] Success. Base64 length:", base64.length);

    return Response.json({ image: dataUri });
  } catch (err) {
    console.error("[satellite-image] Fetch error:", err);
    return Response.json(
      { image: null, error: "Network error fetching satellite image" },
      { status: 500 }
    );
  }
}
