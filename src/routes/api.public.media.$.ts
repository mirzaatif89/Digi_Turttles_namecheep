import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { publicImage } = await import("@/lib/cms/media.server");
        return publicImage(params._splat ?? "");
      },
    },
  },
});
