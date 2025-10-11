#!/bin/bash

# === CONFIGURATION ===
REMOTE_USER="bsik"                        # Or another SSH user
REMOTE_HOST="bsik.net"    # Replace with your Droplet's IP
SITE_DIR="/var/www/goodfoodloob.com/next"  # Absolute path to your website directory on the server
# SSH_KEY_PATH="~/.ssh/id_rsa"             # Path to your SSH private key (if not using agent)


# === COLORS FOR LOGGING ===
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# === LOGGING FUNCTIONS ===
log_info()    { echo -e "${YELLOW}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }

# === EXIT ON ANY ERROR ===
set -e

log_info "Starting deployment to $REMOTE_HOST..."

# === COMMANDS TO EXECUTE REMOTELY ===
REMOTE_COMMANDS=$(cat <<EOF
  echo "[1/4] Navigating to project directory: $SITE_DIR"
  cd "$SITE_DIR" || { echo "Directory not found"; exit 1; }

  echo "[2/4] Pulling latest changes from Git"
  git pull || { echo "Git pull failed"; exit 1; }

  echo "[3/4] Installing dependencies via pnpm"
  pnpm install || { echo "pnpm install failed"; exit 1; }

  echo "[4/4] Building project with pnpm"
  pnpm run build || { echo "Build failed"; exit 1; }

  echo "✅ Deployment complete on server"
EOF
)

log_info "Connecting to $REMOTE_USER@$REMOTE_HOST..."
ssh -i "$REMOTE_USER@$REMOTE_HOST" "$REMOTE_COMMANDS"

log_success "Deployment completed successfully!"
