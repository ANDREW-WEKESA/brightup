#!/bin/bash

# BrightUp Database Backup Script
# This script creates a MongoDB backup and uploads it to cloud storage

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="brightup_backup_${TIMESTAMP}"
MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/brightup}"
RETENTION_DAYS=30

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BrightUp Database Backup ===${NC}"
echo "Starting backup at $(date)"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if mongodump is installed
if ! command -v mongodump &> /dev/null; then
    echo -e "${RED}Error: mongodump is not installed${NC}"
    echo "Install MongoDB Database Tools: https://www.mongodb.com/docs/database-tools/"
    exit 1
fi

# Perform backup
echo -e "${YELLOW}Creating backup...${NC}"
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/$BACKUP_NAME" --gzip

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    
    # Create tarball
    echo -e "${YELLOW}Compressing backup...${NC}"
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"
    
    # Remove uncompressed backup
    rm -rf "$BACKUP_DIR/$BACKUP_NAME"
    
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" | cut -f1)
    echo -e "${GREEN}✓ Backup compressed: ${BACKUP_SIZE}${NC}"
    echo "Location: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
    
    # Optional: Upload to cloud storage (uncomment and configure)
    # echo -e "${YELLOW}Uploading to cloud storage...${NC}"
    # aws s3 cp "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" "s3://brightup-backups/"
    # gsutil cp "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" "gs://brightup-backups/"
    
    # Clean up old backups
    echo -e "${YELLOW}Cleaning up old backups (older than ${RETENTION_DAYS} days)...${NC}"
    find "$BACKUP_DIR" -name "brightup_backup_*.tar.gz" -mtime +${RETENTION_DAYS} -delete
    
    REMAINING=$(find "$BACKUP_DIR" -name "brightup_backup_*.tar.gz" | wc -l)
    echo -e "${GREEN}✓ Cleanup complete. ${REMAINING} backups retained${NC}"
    
    echo -e "${GREEN}=== Backup Complete ===${NC}"
    exit 0
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi
