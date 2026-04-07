const GEOCODE_API_KEY = "AIzaSyC7tisfRjDJMcb1eCKsJgel_WWJz5rnRAs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return Response.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" || !data.results?.length) {
      return Response.json(
        { error: "NOT_FOUND", message: "Could not find that address." },
        { status: 404 }
      );
    }

    const result = data.results[0];
    return Response.json({
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    });
  } catch {
    return Response.json(
      { error: "NETWORK_ERROR", message: "Geocoding service unavailable." },
      { status: 500 }
    );
  }
}
