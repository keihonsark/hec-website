const API_KEY = "AIzaSyC7tisfRjDJMcb1eCKsJgel_WWJz5rnRAs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return Response.json({ error: "Missing lat/lng" }, { status: 400 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=20&size=600x400&maptype=satellite&key=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch satellite image" }, { status: 502 });
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return Response.json({
      image: `data:image/png;base64,${base64}`,
    });
  } catch {
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}
