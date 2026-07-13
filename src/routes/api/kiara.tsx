import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/kiara")({
  server: {
    handlers: {
      GET: () => {
        const url = process.env.KIARA_IFRAME_URL;
        if (!url) {
          return new Response(
            `<!doctype html><meta charset="utf-8"><title>Kiara</title><body style="font:14px system-ui;padding:16px;color:#334;background:#fafafa">Kiara não configurada.</body>`,
            { headers: { "content-type": "text/html; charset=utf-8" } },
          );
        }
        const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Kiara</title>
<style>html,body{margin:0;padding:0;height:100%;background:#fff}iframe{border:0;width:100%;height:100%;display:block}</style>
</head><body>
<iframe src="${url}" allow="microphone; clipboard-write" referrerpolicy="no-referrer"></iframe>
</body></html>`;
        return new Response(html, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
