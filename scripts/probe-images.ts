import sharp from "sharp";
import path from "path";
import fs from "fs";

const ASSETS = path.join(
  process.cwd(),
  "..",
  ".cursor",
  "projects",
  "c-Users-yeshua-Desktop-venezuela",
  "assets"
);

// Fallback: images copied to scripts/source-images
const SOURCE = fs.existsSync(path.join(process.cwd(), "scripts", "source-images"))
  ? path.join(process.cwd(), "scripts", "source-images")
  : ASSETS;

async function main() {
  const files = fs.readdirSync(SOURCE).filter((f) => f.includes("WhatsApp"));
  for (const f of files) {
    const meta = await sharp(path.join(SOURCE, f)).metadata();
    console.log(f.slice(-40), meta.width, "x", meta.height);
  }
}

main();
