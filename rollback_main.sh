#!/bin/bash

# ==============================================================================
# 🔄 SAVERRA REALTY - ROLLBACK SCRIPT
# Reverts saverrarealty.com to the latest backup
# ==============================================================================

set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

USER_HOME="$HOME"
MAIN_DOMAIN_PATH="$USER_HOME/domains/saverrarealty.com/public_html"
BACKUP_DIR="$USER_HOME/backups/saverrarealty"

if [ ! -d "$USER_HOME/domains/saverrarealty.com" ]; then
    if [ -d "/var/www/saverrarealty.com" ]; then
        MAIN_DOMAIN_PATH="/var/www/saverrarealty.com"
        BACKUP_DIR="/var/backups/saverrarealty"
    else
        MAIN_DOMAIN_PATH="$(pwd)"
        BACKUP_DIR="$(pwd)/backups"
    fi
fi

echo -e "${YELLOW}${BOLD}"
echo "=================================================================="
echo "    🔄 SAVERRA REALTY: ROLLBACK TO PREVIOUS BACKUP                "
echo "=================================================================="
echo -e "${NC}"

if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${RED}❌ No backup directory found at $BACKUP_DIR!${NC}"
    exit 1
fi

LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/saverrarealty_old_backup_*.tar.gz 2>/dev/null | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
    echo -e "${RED}❌ No backup archive found in $BACKUP_DIR!${NC}"
    exit 1
fi

echo -e "Latest backup found: ${CYAN}$LATEST_BACKUP${NC}"
read -p "Are you sure you want to restore this backup to $MAIN_DOMAIN_PATH? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Restoring files..."
    rm -rf "$MAIN_DOMAIN_PATH"/*
    tar -xzf "$LATEST_BACKUP" -C "$MAIN_DOMAIN_PATH"
    echo -e "${GREEN}✅ Rollback completed successfully!${NC}"
else
    echo "Rollback cancelled."
fi
