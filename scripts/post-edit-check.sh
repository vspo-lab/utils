#!/bin/bash
# Post-edit hook: Run build, lint, type checks after file edits

set -e

pnpm build
pnpm biome:check
pnpm knip
pnpm tsc
