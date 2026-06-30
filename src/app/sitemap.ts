import type { MetadataRoute } from "next";

const BASE_URL = "https://sculptor-of-your-body.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/ru`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/uk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...["ru", "uk", "en"].flatMap((loc) => [
      { url: `${BASE_URL}/${loc}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${BASE_URL}/${loc}/terms-of-use`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${BASE_URL}/${loc}/payment-terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    ]),
  ];
}
