#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

npm install

# Install claude-forge if not already present in this session
FORGE_DIR="/tmp/claude-forge"
if [ ! -d "$FORGE_DIR" ]; then
  echo "Installing claude-forge..."
  git clone --depth=1 https://github.com/sangrokjung/claude-forge.git "$FORGE_DIR" 2>/dev/null
  cd "$FORGE_DIR"
  git submodule update --init --recursive 2>/dev/null
  bash install.sh --upgrade 2>/dev/null || true
  cd "$CLAUDE_PROJECT_DIR"
  echo "claude-forge installed."
else
  echo "claude-forge already present."
fi
