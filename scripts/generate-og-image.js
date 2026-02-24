import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const CONTENT_W = 602;
const CONTENT_H = 357;

const scale = Math.min(OG_WIDTH / CONTENT_W, OG_HEIGHT / CONTENT_H) * 0.75;
const tx = (OG_WIDTH - CONTENT_W * scale) / 2;
const ty = (OG_HEIGHT - CONTENT_H * scale) / 2;

const originalSvg = readFileSync(
  resolve(ROOT, "src/assets/ChurchIconFull.svg"),
  "utf-8"
);

const innerContent = originalSvg
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "");

const wrappedSvg = `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="white"/>
  <g transform="translate(${tx}, ${ty}) scale(${scale})">
    ${innerContent}
  </g>
</svg>`;

await sharp(Buffer.from(wrappedSvg))
  .png()
  .toFile(resolve(ROOT, "public/og-image.png"));

console.log(`og-image.png gerado (${OG_WIDTH}x${OG_HEIGHT}) → public/og-image.png`);
