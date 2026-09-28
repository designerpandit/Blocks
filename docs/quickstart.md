# Quickstart

Boot a working Blocks instance with one command. A fresh install should complete in under 10 minutes.

## Prerequisites

- Docker, running
- `curl`

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/designerpandit/Blocks/next/install.sh | sh
```

This pulls the pinned image `ghcr.io/designerpandit/blocks:0.2.0`, starts it on port 3001, and waits until it reports healthy.

## Verify

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{ "status": "ok" }
```

## Stop and remove

```bash
docker rm -f blocks
```

## Pinned image

`ghcr.io/designerpandit/blocks:0.2.0` — the version is always pinned; there is no `latest` tag.
