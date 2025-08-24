#!/usr/bin/env bash
set -euo pipefail
# publish.sh - create a git tag (auto-increment if not passed), build docker image and push to Docker Hub
# Location: portfolio/publish.sh

IMAGE="dawitg/portfolio"
WORKDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage(){
  cat <<EOF
Usage: $(basename "$0") [TAG] [--no-latest] [--no-push-tag]

If TAG is omitted the script looks for the latest git tag matching v* and increments the patch number.
Options:
  --no-latest    do not also tag the image as :latest
  --no-push-tag  do not push the created git tag to origin

Examples:
  $(basename "$0")            # auto-increment tag, push tag, build and push image (also :latest)
  $(basename "$0") v0.2      # use provided tag v0.2
  $(basename "$0") v0.2 --no-latest  # push only v0.2 image
EOF
}

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  usage
  exit 0
fi

ARG_TAG=""
PUSH_LATEST=1
PUSH_TAG=1

# parse args
while [ "$#" -gt 0 ]; do
  case "$1" in
    --no-latest) PUSH_LATEST=0; shift ;;
    --no-push-tag) PUSH_TAG=0; shift ;;
    -* ) echo "Unknown option: $1"; usage; exit 1 ;;
    *) if [ -z "$ARG_TAG" ]; then ARG_TAG="$1"; shift; else echo "Too many args"; usage; exit 1; fi ;;
  esac
done

cd "$WORKDIR"

determine_repo_root(){
  # try current dir, then parent
  if git rev-parse --show-toplevel > /dev/null 2>&1; then
    git rev-parse --show-toplevel
  elif git -C .. rev-parse --show-toplevel > /dev/null 2>&1; then
    git -C .. rev-parse --show-toplevel
  else
    echo "" 
  fi
}

repo_root=$(determine_repo_root)

if [ -n "$ARG_TAG" ]; then
  TAG="$ARG_TAG"
else
  latest=""
  if [ -n "$repo_root" ]; then
    latest=$(git -C "$repo_root" tag --list 'v*' --sort=-v:refname | head -n1 || true)
  fi
  if [ -z "$latest" ]; then
    TAG="v0.1"
  else
    # strip leading v and split
    ver=${latest#v}
    IFS='.' read -r a b c <<<"$ver" || true
    a=${a:-0}; b=${b:-0}; c=${c:-0}
    if ! [[ $c =~ ^[0-9]+$ ]]; then
      # fallback
      TAG="v0.1"
    else
      c=$((c+1))
      TAG="v${a}.${b}.${c}"
    fi
  fi
fi

echo "Using tag: $TAG"

if [ -n "$repo_root" ]; then
  # create annotated git tag
  echo "Creating git tag $TAG"
  git -C "$repo_root" tag -a "$TAG" -m "release $TAG"
  if [ "$PUSH_TAG" -eq 1 ]; then
    echo "Pushing tag to origin: $TAG"
    git -C "$repo_root" push origin "$TAG"
  else
    echo "Skipping push of git tag (--no-push-tag)"
  fi
else
  echo "Warning: git repository not found; skipping tag creation"
fi

echo "Building Docker image..."
BUILD_CMD=(docker build -t "${IMAGE}:${TAG}")
if [ "$PUSH_LATEST" -eq 1 ]; then
  BUILD_CMD+=(-t "${IMAGE}:latest")
fi
BUILD_CMD+=(.)
"${BUILD_CMD[@]}"

echo "Pushing Docker image ${IMAGE}:${TAG}"
docker push "${IMAGE}:${TAG}"
if [ "$PUSH_LATEST" -eq 1 ]; then
  echo "Pushing Docker image ${IMAGE}:latest"
  docker push "${IMAGE}:latest"
fi

echo "Done. To update Kubernetes manually edit deployments/portfolio.yaml and set image to ${IMAGE}:${TAG}, then run:\n  kubectl apply -f /path/to/deployments/portfolio.yaml\n  kubectl rollout status deployment/portfolio"
