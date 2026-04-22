#!/bin/bash

# Advanced Hot Reload Script for Ranuk.dev
# Uses livereload for automatic browser refresh

echo "🚀 Starting Advanced Hot Reload for Ranuk.dev..."
echo "📁 Watching: CSS, JS, HTML files"
echo "🌐 Open http://localhost:35729 in your browser with LiveReload extension"
echo "Press Ctrl+C to stop"
echo ""

# Install livereload if not already installed
if ! command -v livereload &> /dev/null; then
    echo "📦 Installing livereload..."
    pip3 install livereload
fi

# Start livereload server
livereload . -p 35729 &
LIVERELOAD_PID=$!

# Start HTTP server
if command -v python3 &> /dev/null; then
    echo "✅ Starting HTTP server on port 8000"
    python3 -m http.server 8000 &
elif command -v python &> /dev/null; then
    echo "✅ Starting HTTP server on port 8000"
    python -m SimpleHTTPServer 8000 &
else
    echo "❌ Python not found. Please install Python to use this script."
    exit 1
fi

HTTP_PID=$!

echo "✅ Hot reload active! Open http://localhost:8000"
echo "💡 Install LiveReload browser extension for automatic refresh"

# Wait for both processes
wait $LIVERELOAD_PID $HTTP_PID