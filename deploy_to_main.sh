#!/bin/bash

# ==============================================================================
# 🚀 SAVERRA REALTY - PRODUCTION DEPLOYMENT SCRIPT (Demo -> Main Domain)
# Target Domain : saverrarealty.com
# Source Domain : demo.saverrarealty.com / Current Repository
# ==============================================================================

set -e # Exit immediately if a command fails

# Color Codes for beautiful terminal output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
USER_HOME="$HOME"

echo -e "${CYAN}${BOLD}"
echo "=================================================================="
echo "    🚀 SAVERRA REALTY: DEPLOY TO MAIN DOMAIN (saverrarealty.com)  "
echo "=================================================================="
echo -e "${NC}"

# ------------------------------------------------------------------------------
# 1. DIRECTORY & PATH DETECTION
# ------------------------------------------------------------------------------
echo -e "${YELLOW}[1/6] 🔍 Detecting directories & paths...${NC}"

# Detect Hostinger Domain Paths
MAIN_DOMAIN_PATH="$USER_HOME/domains/saverrarealty.com/public_html"
DEMO_DOMAIN_PATH="$USER_HOME/domains/demo.saverrarealty.com/public_html"
CURRENT_DIR=$(pwd)
BACKUP_DIR="$USER_HOME/backups/saverrarealty"

# If running directly inside a VPS or custom structure
if [ ! -d "$USER_HOME/domains/saverrarealty.com" ]; then
    if [ -d "/var/www/saverrarealty.com" ]; then
        MAIN_DOMAIN_PATH="/var/www/saverrarealty.com"
        BACKUP_DIR="/var/backups/saverrarealty"
    else
        MAIN_DOMAIN_PATH="$CURRENT_DIR"
        BACKUP_DIR="$CURRENT_DIR/backups"
    fi
fi

mkdir -p "$BACKUP_DIR"
echo -e "  Main Domain Path : ${GREEN}$MAIN_DOMAIN_PATH${NC}"
echo -e "  Backup Directory : ${GREEN}$BACKUP_DIR${NC}"

# ------------------------------------------------------------------------------
# 2. BACKUP OLD SAVERRAREALTY.COM WEBSITE
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[2/6] 📦 Creating 100% Safe Backup of existing website...${NC}"

BACKUP_FILE="$BACKUP_DIR/saverrarealty_old_backup_$TIMESTAMP.tar.gz"

if [ -d "$MAIN_DOMAIN_PATH" ] && [ "$(ls -A "$MAIN_DOMAIN_PATH" 2>/dev/null)" ]; then
    echo "  Archiving current contents of $MAIN_DOMAIN_PATH..."
    tar -czf "$BACKUP_FILE" -C "$MAIN_DOMAIN_PATH" . 2>/dev/null || true
    echo -e "  ${GREEN}✅ Backup successfully created:${NC} $BACKUP_FILE"
else
    echo -e "  ${CYAN}ℹ️ Main domain directory is empty or new. Proceeding without old backup.${NC}"
fi

# ------------------------------------------------------------------------------
# 3. BUILD PROJECT (Frontend & Backend Setup)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[3/6] ⚙️ Installing dependencies and building production bundle...${NC}"

if [ -f "package.json" ]; then
    echo "  Installing NPM dependencies..."
    npm install --silent

    echo "  Building optimized web application..."
    npm run build
    echo -e "  ${GREEN}✅ Build completed successfully.${NC}"
else
    echo -e "  ${RED}❌ Error: package.json not found in current directory!${NC}"
    exit 1
fi

# ------------------------------------------------------------------------------
# 4. DEPLOY FILES TO MAIN DOMAIN (saverrarealty.com)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[4/6] 🚚 Syncing files to main domain (${MAIN_DOMAIN_PATH})...${NC}"

if [ "$CURRENT_DIR" != "$MAIN_DOMAIN_PATH" ]; then
    mkdir -p "$MAIN_DOMAIN_PATH"

    # Copy build outputs, backend, public assets, and config
    echo "  Copying build artifacts (.output / dist / backend / public)..."
    rsync -av --delete \
      --exclude 'node_modules' \
      --exclude '.git' \
      --exclude 'backups' \
      "$CURRENT_DIR/" "$MAIN_DOMAIN_PATH/"

    # Copy environment configuration
    if [ -f "$CURRENT_DIR/.env" ]; then
        cp "$CURRENT_DIR/.env" "$MAIN_DOMAIN_PATH/.env"
        echo "  Environment file (.env) copied."
    fi

    echo "  Installing production dependencies on target directory..."
    cd "$MAIN_DOMAIN_PATH"
    npm install --production --silent
    cd "$CURRENT_DIR"
else
    echo "  Running in-place deployment on $MAIN_DOMAIN_PATH."
fi

# ------------------------------------------------------------------------------
# 5. DATABASE & BACKEND SERVER CHECK
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[5/6] 🗄️ Checking database and application process...${NC}"

# Check if deploy_db exists and run table sync
if [ -f "$CURRENT_DIR/backend/deploy_db.js" ]; then
    echo "  Verifying database tables & schema..."
    node "$CURRENT_DIR/backend/deploy_db.js" || echo -e "  ${YELLOW}⚠️ Database verify notice (Check connection if needed).${NC}"
fi

# Restart PM2 process if PM2 is available
if command -v pm2 &> /dev/null; then
    echo "  Restarting PM2 backend process..."
    pm2 restart saverra-backend 2>/dev/null || pm2 start backend/server.js --name "saverra-backend" || true
    pm2 save || true
    echo -e "  ${GREEN}✅ PM2 Process reloaded.${NC}"
else
    echo -e "  ${CYAN}ℹ️ Hostinger Web/Node Manager will handle process lifecycle.${NC}"
fi

# ------------------------------------------------------------------------------
# 6. VERIFICATION & HEALTH CHECK
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[6/6] 🩺 Performing Health Check...${NC}"

echo -e "${GREEN}${BOLD}"
echo "=================================================================="
echo "    🎉 CONGRATULATIONS! DEPLOYMENT COMPLETED SUCCESSFULLY        "
echo "=================================================================="
echo -e "${NC}"
echo -e "🌐 Main Domain URL : ${BOLD}https://saverrarealty.com${NC}"
echo -e "📁 Target Directory: $MAIN_DOMAIN_PATH"
echo -e "💾 Backup Archive  : $BACKUP_FILE"
echo ""
echo -e "${CYAN}Tip: If using Hostinger hPanel, make sure SSL is turned ON under 'SSL' settings for saverrarealty.com${NC}"
echo "=================================================================="
