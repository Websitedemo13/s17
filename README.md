# S17 Social Trading Platform

![S17 Trading Logo](https://img.shields.io/badge/S17-Trading-10B981?style=for-the-badge&logo=trending-up)

**Empower Traders, Amplify Wealth** - The world's most advanced social trading platform where traders connect, share strategies, and grow together.

## 🚀 Features

### 🎯 Core Trading Features
- **Copy Trading**: Follow and automatically copy trades from successful traders
- **Live Signal Rooms**: Real-time trading signals with community interaction
- **Portfolio Management**: Advanced portfolio tracking and analytics
- **Risk Management**: Comprehensive risk assessment and management tools

### 🤖 AI-Powered Features
- **AI Trading Assistant**: Intelligent chatbot for trading guidance
- **AI News Feed**: Curated market news with sentiment analysis
- **Smart Recommendations**: AI-powered trader and strategy suggestions
- **Market Analysis**: Real-time AI-driven market insights

### 🌐 Social & Community
- **Social Feed**: Share insights and connect with traders
- **Community Forum**: Discuss strategies and market trends
- **Achievement System**: Gamified trading experience with rewards
- **Live Chat**: Real-time communication in signal rooms

### 📊 Advanced Analytics
- **Performance Tracking**: Detailed ROI and performance metrics
- **Strategy Marketplace**: Buy and sell proven trading strategies
- **Real-time Notifications**: Instant alerts for trades and market events
- **Multi-role Dashboard**: Customized interfaces for Investors, Traders, and Admins

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### State Management
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing

### UI Components
- **shadcn/ui** - Modern component library
- **Custom Components** - Tailored trading interface components

## 📦 Installation

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/s17-social-trading.git
cd s17-social-trading
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
# Using npm
npm install

# Or using yarn
yarn install
\`\`\`

### Step 3: Environment Setup
Create a \`.env.local\` file in the root directory:
\`\`\`env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="S17 Trading"

# API Configuration (when backend is ready)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
API_SECRET_KEY=your-secret-key

# Database (when implemented)
DATABASE_URL=postgresql://username:password@localhost:5432/s17trading

# Authentication (when implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Third-party Services (optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
\`\`\`

### Step 4: Run Development Server
\`\`\`bash
# Using npm
npm run dev

# Or using yarn
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Demo Accounts

The platform includes demo accounts for testing different user roles:

### Investor Account
- **Email**: \`investor@s17.com\`
- **Password**: \`any password\`
- **Features**: Copy trading, portfolio management, social features

### Trader Account
- **Email**: \`trader@s17.com\`
- **Password**: \`any password\`
- **Features**: Signal broadcasting, follower management, monetization

### Admin Account
- **Email**: \`admin@s17.com\`
- **Password**: \`any password\`
- **Features**: Full platform management, user moderation, analytics

## 📱 User Roles & Permissions

### 👥 Investor
- Browse and follow top traders
- Copy trades automatically
- Manage investment portfolio
- Access social features and community
- View performance analytics
- Participate in forums and discussions

### 📈 Trader
- Broadcast trading signals
- Manage followers and subscribers
- Monetize trading strategies
- Access advanced analytics
- Create educational content
- Build personal brand

### 🛡 Admin
- Manage all users and traders
- Moderate content and discussions
- Access system analytics
- Handle support requests
- Configure platform settings
- Monitor compliance and security

## 🏗 Project Structure

\`\`\`
s17-social-trading/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application
├── components/                   # React components
│   ├── ai/                      # AI-related components
│   │   └── ai-assistant.tsx     # AI chatbot
│   ├── auth/                    # Authentication
│   │   ├── login-page.tsx       # Login interface
│   │   ├── register-page.tsx    # Registration
│   │   └── welcome-animation.tsx # Login animations
│   ├── community/               # Social features
│   │   ├── forum.tsx            # Community forum
│   │   └── live-signal-room.tsx # Live trading signals
│   ├── gamification/            # Achievement system
│   │   └── achievement-system.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Navigation header
│   │   ├── sidebar.tsx          # Navigation sidebar
│   │   ├── footer.tsx           # Footer with links
│   │   └── layout.tsx           # Main layout wrapper
│   ├── news/                    # News and analysis
│   │   └── ai-news-feed.tsx     # AI-curated news
│   ├── notifications/           # Notification system
│   │   └── notification-center.tsx
│   ├── pages/                   # Page components
│   │   ├── dashboard-page.tsx   # User dashboard
│   │   ├── profile-page.tsx     # User profile
│   │   ├── help-center-page.tsx # Help and support
│   │   ├── terms-page.tsx       # Terms of service
│   │   ├── privacy-page.tsx     # Privacy policy
│   │   └── ...                  # Other pages
│   ├── trader/                  # Trader-specific components
│   │   └── trader-card.tsx      # Trader profile cards
│   └── ui/                      # UI components
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── loading.tsx          # Loading states
│       └── ...                  # Other UI components
├── lib/                         # Utilities and stores
│   ├── auth-store.ts            # Authentication state
│   ├── trading-store.ts         # Trading state
│   ├── mock-data.ts             # Demo data
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── styles/                      # Additional styles
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── next.config.js               # Next.js config
└── README.md                    # This file
\`\`\`

## 🎨 Key Pages & Features

### 📊 Dashboard
- **Investor Dashboard**: Portfolio overview, active positions, performance metrics
- **Trader Dashboard**: Follower analytics, revenue tracking, signal management
- **Admin Panel**: User management, system monitoring, content moderation

### 👥 Social Features
- **Top Traders**: Browse and filter successful traders
- **Social Feed**: Share insights and market commentary
- **Community Forum**: Structured discussions by category
- **Live Signal Rooms**: Real-time trading with chat

### 🤖 AI Integration
- **AI Assistant**: Context-aware trading guidance
- **News Feed**: Sentiment analysis and market impact scoring
- **Smart Notifications**: Personalized alerts and recommendations

### 🏆 Gamification
- **Achievement System**: Unlock badges and titles
- **XP and Levels**: Progress tracking and rewards
- **Daily Quests**: Engagement incentives
- **Leaderboards**: Community competition

## 🚀 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Testing (when implemented)
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode

# Deployment
npm run deploy       # Deploy to production
\`\`\`

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- **Custom Colors**: S17 brand colors (\`#10B981\` primary)
- **Dark Theme**: Optimized for trading interfaces
- **Custom Components**: Pre-built trading UI patterns
- **Responsive Design**: Mobile-first approach

### TypeScript
- **Strict Mode**: Enabled for better code quality
- **Path Mapping**: \`@/*\` for clean imports
- **Type Safety**: Full type coverage for better DX

## 🌐 Deployment

### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Docker
\`\`\`dockerfile
# Dockerfile included for containerized deployment
docker build -t s17-trading .
docker run -p 3000:3000 s17-trading
\`\`\`

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] Real-time WebSocket connections
- [ ] User authentication and authorization
- [ ] Database integration (PostgreSQL)
- [ ] RESTful API development
- [ ] Payment processing integration

### Phase 2: Advanced Features
- [ ] Mobile app (React Native)
- [ ] Advanced charting and technical analysis
- [ ] Automated trading bots
- [ ] Multi-language support
- [ ] Advanced risk management tools

### Phase 3: Enterprise Features
- [ ] White-label solutions
- [ ] Institutional trader tools
- [ ] Advanced compliance features
- [ ] Custom integrations and APIs
- [ ] Advanced analytics and reporting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/user-guide.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [Discord Server](https://discord.gg/s17trading)
- [Telegram Group](https://t.me/s17trading)
- [GitHub Discussions](https://github.com/s17trading/discussions)

### Contact
- **Email**: support@s17trading.com
- **Phone**: +1 (555) 123-4567
- **Website**: [s17trading.com](https://s17trading.com)

## ⚠️ Risk Disclaimer

**Trading involves substantial risk and may result in the loss of your invested capital. Past performance does not guarantee future results. Please ensure you fully understand the risks involved and seek independent financial advice if necessary.**

---

<div align="center">
  <p>Made with ❤️ by the S17 Trading Team</p>
  <p>© 2024 S17 Trading Inc. All rights reserved.</p>
</div>
\`\`\`
\`\`\`

Cập nhật package.json với tất cả dependencies cần thiết:
