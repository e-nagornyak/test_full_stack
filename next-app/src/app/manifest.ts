import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sh.",
    short_name: "Sh",
    description: "Sh",
    start_url: "/",
    display: "standalone",
    theme_color: "#313A48",
    background_color: "#313A48",
    icons: [
      {
        src: "/icons/logo/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/logo/web-app-manifest-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/logo/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/logo/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
