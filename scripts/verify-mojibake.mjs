import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
const mojibakePatterns = [
  new RegExp("\\u00e2", "u"),
  new RegExp("\\u00c2", "u"),
  new RegExp("\\u00c3", "u"),
  new RegExp("\\u00f0\\u0178", "u"),
  new RegExp("\\u00ef\\u00b8", "u"),
  new RegExp("\\ufffd", "u"),
];
const placeholderSensitiveFiles = new Set([
  "app/lib/seoPages.ts",
  "app/lib/tierSeoContent.ts",
]);
const suspiciousTextPatterns = [
  { label: "placeholder question-mark separator", pattern: / \? /u },
  { label: "placeholder question-mark icon", pattern: /icon: "\?+"/u },
];

function collectSourceFiles(relativeDir) {
  const fullDir = path.join(root, relativeDir);
  if (!fs.existsSync(fullDir)) return [];

  return fs.readdirSync(fullDir, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".next", ".git"].includes(entry.name)) return [];
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path.relative(root, fullPath));
    if (sourceExtensions.has(path.extname(entry.name))) return [fullPath];
    return [];
  });
}

for (const file of [...collectSourceFiles("app"), ...collectSourceFiles("scripts")]) {
  const text = fs.readFileSync(file, "utf8");
  const relativePath = path.relative(root, file).replaceAll("\\", "/");
  for (const pattern of mojibakePatterns) {
    if (pattern.test(text)) throw new Error(`Source contains mojibake (${pattern}) in ${relativePath}`);
  }
  if (placeholderSensitiveFiles.has(relativePath)) {
    for (const { label, pattern } of suspiciousTextPatterns) {
      if (pattern.test(text)) throw new Error(`Source contains ${label} (${pattern}) in ${relativePath}`);
    }
  }
}

console.log("[verify-mojibake] OK: no mojibake or placeholder SEO text found in app/scripts source.");
