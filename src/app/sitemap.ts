import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hzp-web.vercel.app";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/produkty", priority: 0.8 },
    { path: "/o-nas", priority: 0.7 },
    { path: "/kontakty", priority: 0.8 },
    { path: "/kariera", priority: 0.6 },
  ];

  const enRoutes = [
    { path: "", priority: 1.0 },
    { path: "/products", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/career", priority: 0.6 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}/cs${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...enRoutes.map((route) => ({
      url: `${baseUrl}/en${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority * 0.9,
    })),
  ];
}
