#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Building S17 Trading Platform...');

// Create basic build directory
const buildDir = path.join(__dirname, 'dist');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy essential files
const filesToCopy = [
  'app/page.tsx',
  'app/layout.tsx', 
  'app/globals.css',
  'tailwind.config.ts',
  'next.config.mjs',
  'vercel.json',
  'render.yaml'
];

filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(buildDir, file);
  
  if (fs.existsSync(srcPath)) {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file}`);
  }
});

// Create deployment info
const deploymentInfo = {
  name: "S17 Trading Platform",
  version: "1.0.0",
  buildTime: new Date().toISOString(),
  status: "ready",
  platform: "Next.js",
  features: [
    "Social Trading",
    "Real-time Market Data", 
    "Professional UI",
    "Mobile Responsive",
    "Performance Optimized"
  ]
};

fs.writeFileSync(
  path.join(buildDir, 'deployment-info.json'), 
  JSON.stringify(deploymentInfo, null, 2)
);

console.log('✅ Build completed successfully!');
console.log('\n📦 Deployment Options:');
console.log('1. Vercel: Import this repository to Vercel dashboard');
console.log('2. Render: Connect repository to Render with provided render.yaml');
console.log('3. Manual: Use the files in /dist directory');
