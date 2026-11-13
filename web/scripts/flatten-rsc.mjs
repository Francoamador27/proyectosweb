// Post-build: Next 16 con `output: "export"` escribe los payloads de prefetch
// en subcarpetas (`servicios/__next.servicios/__PAGE__.txt`), pero el router
// del cliente los pide con nombre plano (`servicios/__next.servicios.__PAGE__.txt`).
// En un hosting estático eso da 404 y la navegación cae a recarga completa.
// Este script crea la copia con nombre plano junto a cada archivo anidado.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] || "out");
let copied = 0;

function flatten(dir, prefix, target) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const src = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(src, name, target);
    else {
      fs.copyFileSync(src, path.join(target, name));
      copied++;
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(full, entry.name, dir);
    else if (entry.name !== "_next") walk(full);
  }
}

if (!fs.existsSync(OUT)) {
  console.error(`[flatten-rsc] No existe ${OUT}`);
  process.exit(1);
}
walk(OUT);
console.log(`[flatten-rsc] ${copied} payloads RSC copiados con nombre plano`);
