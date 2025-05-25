#!/bin/bash
# Start script for DFEAT website
echo "Starting DFEAT website server..."

# Check if forever is installed
if ! command -v forever &> /dev/null; then
    echo "Installing forever globally..."
    npm install -g forever
fi

# List any running processes
forever list

# Stop any existing instance
forever stopall

# Start the server
forever start index.js

# Show running processes
forever list

# Follow logs
forever logs 0 -f
