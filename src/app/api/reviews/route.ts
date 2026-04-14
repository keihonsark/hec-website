const API_KEY = "AIzaSyC7tisfRjDJMcb1eCKsJgel_WWJz5rnRAs";

// Cache reviews in memory for 1 hour to avoid hammering the Places API.
type CacheEntry = {
  data: {
    reviews: GoogleReview[];
    rating: number | null;
    totalRatings: number | null;
  };
  fetchedAt: number;
};
let cache: CacheEntry | null = null;
const TTL_MS = 60 * 60 * 1000; // 1 hour

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
  time: number;
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
      return Response.json(cache.data);
    }

    // Step 1: find place_id
    const searchUrl =
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" +
      `input=${encodeURIComponent("Home Energy Construction Fresno")}` +
      "&inputtype=textquery&fields=place_id" +
      `&key=${API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const placeId: string | undefined =
      searchData.candidates?.[0]?.place_id;

    if (!placeId) {
      return Response.json({ reviews: [], rating: null, totalRatings: null });
    }

    // Step 2: fetch details with reviews
    const detailsUrl =
      "https://maps.googleapis.com/maps/api/place/details/json?" +
      `place_id=${placeId}` +
      "&fields=reviews,rating,user_ratings_total" +
      "&reviews_sort=newest" +
      `&key=${API_KEY}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const data = {
      reviews: (detailsData.result?.reviews ?? []) as GoogleReview[],
      rating: detailsData.result?.rating ?? null,
      totalRatings: detailsData.result?.user_ratings_total ?? null,
    };

    cache = { data, fetchedAt: Date.now() };
    return Response.json(data);
  } catch {
    return Response.json(
      { reviews: [], rating: null, totalRatings: null, error: "fetch_failed" },
      { status: 500 }
    );
  }
}
