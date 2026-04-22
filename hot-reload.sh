#!/bin/bash

# Hot Reload Script for Ranuk.dev
# This script watches for file changes and automatically reloads the browser

echo "🚀 Starting Hot Reload for Ranuk.dev..."
echo "📁 Watching: CSS, JS, HTML files"
echo "🌐 Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Using Python"
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python to use this script."
    exit 1
fi