#!/bin/sh
set -eu

IMAGE="ghcr.io/designerpandit/blocks:0.2.0"
NAME="blocks"
PORT=3001

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required but was not found. Install it from https://docs.docker.com/get-docker/ and re-run." >&2
  exit 1
fi

docker rm -f "$NAME" >/dev/null 2>&1 || true
docker pull "$IMAGE"
docker run -d --name "$NAME" -p "$PORT:3001" "$IMAGE" >/dev/null

echo "Waiting for Blocks to become healthy..."
i=0
while [ "$i" -lt 60 ]; do
  if curl -fsS "http://localhost:$PORT/health" 2>/dev/null | grep -q '"status":"ok"'; then
    echo "Blocks is running at http://localhost:$PORT (health: http://localhost:$PORT/health)"
    exit 0
  fi
  i=$((i + 1))
  sleep 2
done

echo "Blocks did not become healthy within 2 minutes. Logs:" >&2
docker logs "$NAME" >&2
exit 1
