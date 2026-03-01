# Config Consolidation Plan

## Context

Configuration files across the monorepo have accumulated duplication and inconsistencies:
- 4 identical `tsconfig.json` files (no shared base)
- 4 near-identical `tsup.config.js` files
- CI workflows missing checks that run locally (tsc, knip)
- `release.yml` uses different pnpm setup method than build workflow
- `turbo.json` defines biome tasks that are never used per-workspace
- `biome.json` mixes includes/excludes and has stale schema version

Goal: eliminate duplication, make CI match local checks, keep configs simple.

---

## Phase 1: tsconfig.json consolidation

4 identical files -> 1 base + 4 one-liners.

**Create** `tsconfig.base.json` (root):
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "outDir": "./dist",
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true
  }
}
```

**Replace** `api/tsconfig.json`, `dayjs/tsconfig.json`, `errors/tsconfig.json`, `logging/tsconfig.json` with:
```json
{
  "extends": "../tsconfig.base.json"
}
```

`outDir: "./dist"` resolves relative to each workspace's directory. With `noEmit: true`, it only affects resolution anyway.

## Phase 2: tsup.config.js consolidation

4 near-identical files (only `api` uses `src/index.ts`, others use `index.ts`).

**Create** `tsup.config.base.js` (root):
```js
import { defineConfig } from "tsup";

export function createConfig(entry = "index.ts") {
  return defineConfig({
    entry: [entry],
    format: ["cjs", "esm"],
    treeshake: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    bundle: true,
    dts: true,
  });
}
```

**Replace** `dayjs/tsup.config.js`, `errors/tsup.config.js`, `logging/tsup.config.js`:
```js
import { createConfig } from "../tsup.config.base.js";
export default createConfig();
```

**Replace** `api/tsup.config.js`:
```js
import { createConfig } from "../tsup.config.base.js";
export default createConfig("src/index.ts");
```

## Phase 3: turbo.json + package.json scripts cleanup

**turbo.json** - Remove unused biome task definitions (biome runs at root, not per-workspace):
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true
    },
    "//#knip": {}
  }
}
```

**package.json scripts** - Simplify biome globs (`./**/**` -> `.`):
```json
"biome:check": "biome check .",
"biome:format": "biome format --write .",
"biome:lint": "biome lint --apply .",
"biome:unsafe-fix": "biome check --fix --unsafe"
```

## Phase 4: biome.json cleanup

- Update `$schema` from `2.3.8` to `2.3.12`
- Separate `includes` / `excludes` (currently mixed with `!` prefixes in includes)
- Remove empty `"overrides": []`

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.12/schema.json",
  "files": {
    "ignoreUnknown": false,
    "includes": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json", "**/*.jsonc"],
    "excludes": [
      "**/node_modules/**/*", "**/dist/**/*", "**/build/**/*", "**/tools/**/*",
      "**/*.config.js", "**/.turbo/**/*", "**/.git/**/*", "**/.vscode/**/*",
      "**/.pnpm-store/**/*", "**/*.css", "**/tsconfig.json", "**/coverage/**/*"
    ]
  }
}
```

(linter/formatter/javascript/assist sections unchanged)

## Phase 5: CI workflow alignment

### setup-pnpm-workflow.yml - Add missing tsc and knip steps

```yaml
steps:
  - uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8 # v5
  - uses: aquaproj/aqua-installer@ea518c135a02fc11ff8024364510c181a5c6b342 # v4.0.3
    with:
      aqua_version: v2.53.6
  - name: Download deps
    run: pnpm i --frozen-lockfile
  - name: Package build
    run: pnpm build
  - name: Type check
    run: pnpm tsc
  - name: Run biome check
    run: pnpm biome:check
  - name: Run knip
    run: pnpm knip
```

### release.yml - Switch to aqua (consistent with build workflow)

```yaml
steps:
  - uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8 # v5
    with:
      fetch-depth: 0
      persist-credentials: false
  - uses: aquaproj/aqua-installer@ea518c135a02fc11ff8024364510c181a5c6b342 # v4.0.3
    with:
      aqua_version: v2.53.6
  - name: Download deps
    run: pnpm i --frozen-lockfile
  - name: Package build
    run: pnpm build
  - name: Semantic Release
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    run: pnpm semantic-release
```

Changes: pinned checkout hash, replaced `pnpm/action-setup` with aqua, added `--frozen-lockfile`.

---

## No changes needed

| Config | Reason |
|--------|--------|
| `knip.json` | Already correct. `ignoreDependencies` entries are necessary. |
| `lefthook.yml` | Already simple and correct. |
| `.textlintrc.json` | Already simple. |
| `renovate.json` | Already extends shared config. |
| `.releaserc.json` | Already correct. |
| `aqua.yaml` | Only managing pnpm is correct. Biome is an npm package, not a standalone CLI. |

---

## File change summary

| Action | File |
|--------|------|
| CREATE | `tsconfig.base.json` |
| CREATE | `tsup.config.base.js` |
| MODIFY | `api/tsconfig.json` |
| MODIFY | `dayjs/tsconfig.json` |
| MODIFY | `errors/tsconfig.json` |
| MODIFY | `logging/tsconfig.json` |
| MODIFY | `api/tsup.config.js` |
| MODIFY | `dayjs/tsup.config.js` |
| MODIFY | `errors/tsup.config.js` |
| MODIFY | `logging/tsup.config.js` |
| MODIFY | `turbo.json` |
| MODIFY | `package.json` |
| MODIFY | `biome.json` |
| MODIFY | `.github/workflows/setup-pnpm-workflow.yml` |
| MODIFY | `.github/workflows/release.yml` |

## Verification

```bash
pnpm build           # Build all packages
pnpm tsc             # Type check
pnpm biome:check     # Lint/format check
pnpm knip            # Unused code detection
./scripts/post-edit-check.sh  # Full quality gate
```
