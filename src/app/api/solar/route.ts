const SOLAR_API_KEY = "AIzaSyC7tisfRjDJMcb1eCKsJgel_WWJz5rnRAs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return Response.json(
      { error: "Missing lat/lng parameters" },
      { status: 400 }
    );
  }

  try {
    const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&key=${SOLAR_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const code = errBody?.error?.status || res.status;

      if (code === "NOT_FOUND" || res.status === 404) {
        return Response.json(
          {
            error: "NOT_FOUND",
            message:
              "We couldn't find roof data for this address. This may be a new construction or an area not yet covered by satellite imagery.",
          },
          { status: 404 }
        );
      }

      return Response.json(
        {
          error: "API_ERROR",
          message:
            "Something went wrong while analyzing your roof. Please try again.",
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Extract only what we need
    const result = {
      center: data.center,
      boundingBox: data.boundingBox,
      imageryDate: data.imageryDate,
      imageryQuality: data.imageryQuality,
      wholeRoofStats: data.solarPotential?.wholeRoofStats
        ? {
            areaMeters2: data.solarPotential.wholeRoofStats.areaMeters2,
            groundAreaMeters2:
              data.solarPotential.wholeRoofStats.groundAreaMeters2,
          }
        : null,
      roofSegmentStats: (data.solarPotential?.roofSegmentStats || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (seg: any) => ({
          pitchDegrees: seg.pitchDegrees,
          azimuthDegrees: seg.azimuthDegrees,
          areaMeters2: seg.stats?.areaMeters2 ?? 0,
          groundAreaMeters2: seg.stats?.groundAreaMeters2 ?? 0,
          center: seg.center ?? null,
          boundingBox: seg.boundingBox ?? null,
        })
      ),
    };

    return Response.json(result);
  } catch {
    return Response.json(
      {
        error: "NETWORK_ERROR",
        message: "Could not connect to the analysis service. Please try again.",
      },
      { status: 500 }
    );
  }
}
