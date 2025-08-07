#!/bin/bash

echo "🚀 S17 Trading Platform Deployment Script"
echo "=========================================="

# Check if platform is specified
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh [vercel|render|docker]"
    echo "Available platforms:"
    echo "  vercel  - Deploy to Vercel"
    echo "  render  - Deploy to Render"
    echo "  docker  - Build Docker image"
    exit 1
fi

PLATFORM=$1

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building application..."
npm run build

case $PLATFORM in
    "vercel")
        echo "🔵 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    
    "render")
        echo "🟣 Deploying to Render..."
        echo "Please connect your repository to Render dashboard:"
        echo "1. Go to https://dashboard.render.com"
        echo "2. Connect your GitHub repository"
        echo "3. Use the render.yaml configuration provided"
        ;;
    
    "docker")
        echo "🐳 Building Docker image..."
        docker build -t s17-trading-platform .
        echo "Docker image built successfully!"
        echo "To run: docker run -p 3000:3000 s17-trading-platform"
        ;;
    
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Available platforms: vercel, render, docker"
        exit 1
        ;;
esac

echo "✅ Deployment completed!"
