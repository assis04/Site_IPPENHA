import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SITE_URL = process.env.SITE_URL || "https://ippenha.org.br";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/agenda", priority: "0.8", changefreq: "weekly" },
  { path: "/quem-somos", priority: "0.8", changefreq: "monthly" },
  { path: "/confissoes-de-fe", priority: "0.7", changefreq: "yearly" },
  { path: "/contribua", priority: "0.6", changefreq: "monthly" },
  { path: "/baixe-app", priority: "0.5", changefreq: "monthly" },
  { path: "/politica-de-privacidade", priority: "0.3", changefreq: "yearly" },
];

function buildSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const entries = ROUTES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const sitemap = buildSitemap();
const outputPath = resolve(ROOT, "public/sitemap.xml");
writeFileSync(outputPath, sitemap, "utf-8");

console.log(`Sitemap gerado com ${ROUTES.length} URLs → public/sitemap.xml`);
