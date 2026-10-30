import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputDirectory = "public/data"] = process.argv;

if (!inputPath) {
  throw new Error("Usage: node scripts/convert-poe2-passive-tree.mjs <data.json> [output-dir]");
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} (version metadata is not defaulted)`);
  return value;
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const rawNodes = Object.entries(source.nodes)
  .map(([hash, node]) => ({ hash, ...node }))
  .filter((node) => typeof node.id === "string" && node.id.length > 0);

const ascendancyNames = new Map();
for (const poeClass of source.classes ?? []) {
  for (const ascendancy of poeClass.ascendancies ?? []) {
    if (ascendancy.id && ascendancy.name) ascendancyNames.set(ascendancy.id, ascendancy.name);
  }
}

// These transforms align GGG's current tree-space coordinates with the
// 2750x2864 background used by poe2.dev. They are a least-squares fit against
// 468 stable named nodes shared by the old and current datasets.
const mapBasePosition = (node) => ({
  x: 0.49717608274392655 + 0.00003908309067530181 * node.x,
  y: 0.5098567378568787 + 0.000036505979539063865 * node.y,
});

const baseNodes = rawNodes.filter((node) => !node.ascendancyId);
const ascendancyNodes = rawNodes.filter(
  (node) => node.ascendancyId && ascendancyNames.has(node.ascendancyId)
);

const ascendancyBounds = new Map();
for (const node of ascendancyNodes) {
  const bounds = ascendancyBounds.get(node.ascendancyId) ?? {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  };
  bounds.minX = Math.min(bounds.minX, node.x);
  bounds.maxX = Math.max(bounds.maxX, node.x);
  bounds.minY = Math.min(bounds.minY, node.y);
  bounds.maxY = Math.max(bounds.maxY, node.y);
  ascendancyBounds.set(node.ascendancyId, bounds);
}

function mapAscendancyPosition(node) {
  const bounds = ascendancyBounds.get(node.ascendancyId);
  const width = Math.max(1, bounds.maxX - bounds.minX);
  const height = Math.max(1, bounds.maxY - bounds.minY);
  return {
    x: 0.42 + ((node.x - bounds.minX) / width) * 0.16,
    y: 0.42 + ((node.y - bounds.minY) / height) * 0.16,
  };
}

const hashToId = new Map(rawNodes.map((node) => [String(node.hash), node.id]));
const includedIds = new Set([...baseNodes, ...ascendancyNodes].map((node) => node.id));

const nodes = {
  keystones: [],
  notables: [],
  smalls: [],
  ascendancies: [],
  connections: [],
};
const descriptions = {};

for (const node of [...baseNodes, ...ascendancyNodes]) {
  const ascendancyName = node.ascendancyId ? ascendancyNames.get(node.ascendancyId) : undefined;
  const position = ascendancyName ? mapAscendancyPosition(node) : mapBasePosition(node);
  const kind = node.isKeystone ? "keystone" : node.isNotable ? "notable" : "small";
  const output = {
    id: node.id,
    x: Math.max(0.01, Math.min(0.99, position.x)),
    y: Math.max(0.01, Math.min(0.99, position.y)),
    kind,
    ...(ascendancyName ? { class: ascendancyName } : {}),
  };

  if (ascendancyName) nodes.ascendancies.push(output);
  else if (kind === "keystone") nodes.keystones.push(output);
  else if (kind === "notable") nodes.notables.push(output);
  else nodes.smalls.push(output);

  descriptions[node.id] = {
    name: node.name || node.id,
    stats: Array.isArray(node.stats) ? node.stats : [],
  };
}

const connectionKeys = new Set();
for (const edge of source.edges ?? []) {
  const from = hashToId.get(String(edge.from));
  const to = hashToId.get(String(edge.to));
  if (!from || !to || !includedIds.has(from) || !includedIds.has(to)) continue;
  const key = from < to ? `${from}\u0000${to}` : `${to}\u0000${from}`;
  if (connectionKeys.has(key)) continue;
  connectionKeys.add(key);
  nodes.connections.push([from, to]);
}

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "nodes.json"), `${JSON.stringify(nodes, null, 2)}\n`);
fs.writeFileSync(
  path.join(outputDirectory, "nodes_desc.json"),
  `${JSON.stringify(descriptions, null, 2)}\n`
);
fs.writeFileSync(
  path.join(outputDirectory, "passive-tree-version.json"),
  `${JSON.stringify(
    {
      gameVersion: requiredEnv("TREE_VERSION"),
      compatibleThrough: requiredEnv("TREE_COMPATIBLE_THROUGH"),
      source: requiredEnv("TREE_SOURCE"),
      nodeCount: includedIds.size,
      connectionCount: nodes.connections.length,
      generatedAt: requiredEnv("TREE_GENERATED_AT"),
    },
    null,
    2
  )}\n`
);

console.log(
  `Generated ${includedIds.size} nodes and ${nodes.connections.length} connections in ${outputDirectory}`
);
