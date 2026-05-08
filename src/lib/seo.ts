export const SITE_URL = "https://www.homeenergyconstruction.com";

const SERVICE_CITIES = [
  "Fresno",
  "Clovis",
  "Madera",
  "Visalia",
  "Hanford",
  "Tulare",
  "Selma",
  "Sanger",
  "Reedley",
  "Merced",
  "Modesto",
  "Stockton",
  "Roseville",
  "Sacramento",
];

const cityList = SERVICE_CITIES.map((name) => ({
  "@type": "City",
  name,
  addressRegion: "CA",
}));

const provider = {
  "@type": "HomeAndConstructionBusiness",
  name: "Home Energy Construction",
  url: SITE_URL,
  telephone: "+15595765067",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Home Energy Construction",
  description:
    "Trusted Central Valley home upgrade contractor specializing in windows, roofing, HVAC, insulation, exterior paint, and outdoor living. Serving Porterville to Sacramento.",
  image: `${SITE_URL}/images/hero/hero-home.png`,
  url: SITE_URL,
  telephone: "+15595765067",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7194 N Abby St",
    addressLocality: "Fresno",
    addressRegion: "CA",
    postalCode: "93720",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.8585,
    longitude: -119.7843,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.7,
    reviewCount: 228,
    bestRating: 5,
  },
  areaServed: cityList,
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Improvement Services",
    itemListElement: [
      "Windows & Doors Replacement",
      "Roofing Replacement",
      "HVAC Installation",
      "Insulation",
      "Outdoor Living",
      "Exterior Paint",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s,
      },
    })),
  },
  knowsAbout: [
    "Window Replacement",
    "Roofing",
    "HVAC Installation",
    "Home Insulation",
    "Exterior Paint",
    "Patio Installation",
    "Energy Efficiency",
  ],
};

interface ServiceSchemaInput {
  serviceType: string;
  name: string;
  description: string;
  path: string;
}

export function buildServiceSchema({
  serviceType,
  name,
  description,
  path,
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    provider,
    areaServed: cityList,
    url: `${SITE_URL}${path}`,
  };
}

/**
 * Serialize a JSON-LD object for safe injection into a <script> tag.
 * Escapes `<` so a string like `</script>` inside the data can't break out.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
