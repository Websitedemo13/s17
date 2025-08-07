# S17 Trading Platform - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Or use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

### Option 2: Deploy to Render

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Choose "Web Service"

2. **Configuration:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node
   - Use the provided `render.yaml` configuration

### Option 3: Docker Deployment

1. **Build Docker Image:**
   ```bash
   docker build -t s17-trading-platform .
   ```

2. **Run Container:**
   ```bash
   docker run -p 3000:3000 s17-trading-platform
   ```

## 🛠️ Environment Variables

Create a `.env.local` file for local development:

```env
# App Configuration
NODE_ENV=production
PORT=3000

# API Keys (replace with your actual keys)
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEWS_API_KEY=your-news-api-key
COINGECKO_API_KEY=your-coingecko-api-key

# Database (if using)
DATABASE_URL=your-database-url

# Authentication (if using)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

## 📦 Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Development server
npm run dev
```

## 🔧 Troubleshooting

### Common Issues:

1. **Module not found errors:**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all import paths are correct

2. **Build failures:**
   - Ensure Node.js version is 18 or higher
   - Clear cache: `npm run build -- --clean`

3. **Runtime errors:**
   - Check environment variables are set correctly
   - Verify API endpoints are accessible

### Dev Server Not Loading:

1. **Check dependencies:**
   ```bash
   npm install
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

## 🌐 Platform URLs

After deployment, your platform will be available at:

- **Vercel:** `https://your-project.vercel.app`
- **Render:** `https://your-service.onrender.com`
- **Custom Domain:** Configure in your hosting platform settings

## 📱 Features Included

- ✅ Responsive design (mobile-friendly)
- ✅ Professional trading interface
- ✅ Real-time market data integration
- ✅ Social trading features
- ✅ News feed and analysis
- ✅ User authentication ready
- ✅ Performance optimized
- ✅ SEO optimized

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support

If you encounter any deployment issues:

1. Check the logs in your hosting platform
2. Verify all environment variables are set
3. Ensure your API keys are valid
4. Check network connectivity for external APIs

---

**Happy Trading! 📈**
