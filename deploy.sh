#!/bin/bash

# Get latest changes
git pull

# Build a new Docker image
docker compose build

# Stop and remove the existing container
docker compose down

# Start a new container using the updated image
docker compose up -d