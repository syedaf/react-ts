// setup-antfu-linting.mjs
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function ensurePackageJson() {
  if (!existsSync("package.json")) {
    console.error("ERROR: package.json not found in this folder.");
    process.exit(1);
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, obj) {
  writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`, "utf8");
}

ensurePackageJson();

// 1) Install devDependencies (local, project-scoped)
const devDeps = [
  "eslint",
  "@antfu/eslint-config",
  "eslint-plugin-format",
  "@eslint-react/eslint-plugin",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "typescript",
  "husky",
  "lint-staged",
];

console.log("\n=== Installing devDependencies (if missing) ===\n");
run(`pnpm add -D ${devDeps.join(" ")}`);

// 2) Update package.json (scripts + lint-staged)
console.log("\n=== Updating package.json (scripts + lint-staged) ===\n");
const pkg = readJson("package.json");

// Ensure scripts object
pkg.scripts ||= {};

pkg.scripts.dev ||= "vite";
pkg.scripts.build ||= "tsc -b && vite build";
pkg.scripts.preview ||= "vite preview";

// Our opinionated lint scripts
pkg.scripts.lint = "eslint src --ext .ts,.tsx,.js,.jsx";
pkg.scripts["lint:fix"] = "eslint src --ext .ts,.tsx,.js,.jsx --fix";
pkg.scripts.prepare = "husky install";

// lint-staged config
pkg["lint-staged"] ||= {};
pkg["lint-staged"]["src/**/*.{ts,tsx,js,jsx}"] = ["eslint --fix"];

writeJson("package.json", pkg);

// 3) Create eslint.config.mjs (overwrite)
console.log("\n=== Writing eslint.config.mjs ===\n");
const eslintConfig = `import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'app',
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    react: true,
    formatters: {
      css: true,
      html: true,
      json: true,
      markdown: 'prettier',
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      // Add project-specific overrides here, for example:
      // 'no-console': 'warn',
    },
  },
)
`;
writeFileSync("eslint.config.mjs", eslintConfig, "utf8");

// 4) Create .eslintignore if missing
// if (!existsSync(".eslintignore")) {
//   console.log("\n=== Creating .eslintignore ===\n");
//   const ignore = `node_modules
// dist
// build
// coverage
// pnpm-lock.yaml
// `;
//   writeFileSync(".eslintignore", ignore, "utf8");
// }
// else {
//   console.log("\n.skipping .eslintignore (already exists)\n");
// }
