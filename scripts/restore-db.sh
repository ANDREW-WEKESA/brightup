#!/bin/bash

# BrightUp Database Restore Script
# This script restores a MongoDB backup

# Configuration
BACKUP_DIR="./backups"
MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/brightup}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BrightUp Database Restore ===${NC}"

# Check if mongorestore is installed
if ! command -v mongorestore &> /dev/null; then
    echo -e "${RED}Error: mongorestore is not installed${NC}"
    echo "Install MongoDB Database Tools: https://www.mongodb.com/docs/database-tools/"
    exit 1
fi

# List available backups
echo -e "${YELLOW}Available backups:${NC}"
backups=($(find "$BACKUP_DIR" -name "brightup_backup_*.tar.gz" -type f | sort -r))

if [ ${#backups[@]} -eq 0 ]; then
    echo -e "${RED}No backups found in $BACKUP_DIR${NC}"
    exit 1
fi

# Display backups with numbers
for i in "${!backups[@]}"; do
    backup_name=$(basename "${backups[$i]}")
    backup_date=$(echo "$backup_name" | sed 's/brightup_backup_\([0-9]\{8\}\)_\([0-9]\{6\}\).*/\1 \2/' | sed 's/\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\) \([0-9]\{2\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/\1-\2-\3 \4:\5:\6/')
    backup_size=$(du -h "${backups[$i]}" | cut -f1)
    echo "$((i+1)). $backup_name ($backup_size) - $backup_date"
done

# Prompt user to select backup
echo ""
read -p "Select backup number to restore (1-${#backups[@]}): " selection

# Validate selection
if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#backups[@]} ]; then
    echo -e "${RED}Invalid selection${NC}"
    exit 1
fi

SELECTED_BACKUP="${backups[$((selection-1))]}"
echo -e "${YELLOW}Selected: $(basename $SELECTED_BACKUP)${NC}"

# Confirm restore
echo ""
echo -e "${RED}WARNING: This will overwrite the current database!${NC}"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled"
    exit 0
fi

# Extract backup
TEMP_DIR=$(mktemp -d)
echo -e "${YELLOW}Extracting backup...${NC}"
tar -xzf "$SELECTED_BACKUP" -C "$TEMP_DIR"

# Find the backup directory
BACKUP_PATH=$(find "$TEMP_DIR" -name "brightup_backup_*" -type d | head -n 1)

if [ -z "$BACKUP_PATH" ]; then
    echo -e "${RED}Error: Could not find backup data${NC}"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Restore database
echo -e "${YELLOW}Restoring database...${NC}"
mongorestore --uri="$MONGODB_URI" --drop --gzip "$BACKUP_PATH"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database restored successfully${NC}"
    rm -rf "$TEMP_DIR"
    echo -e "${GREEN}=== Restore Complete ===${NC}"
    exit 0
else
    echo -e "${RED}✗ Restore failed${NC}"
    rm -rf "$TEMP_DIR"
    exit 1
fi
