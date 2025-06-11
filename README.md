# VitaFlex-AI 🏋️‍♀️🤖

An AI-powered wellness platform that delivers personalized fitness and nutrition guidance for a smarter, healthier lifestyle. VitaFlex-AI combines FastAPI backend with OpenAI GPT-4o integration and a modern React frontend to create a comprehensive wellness companion.

## ✨ Features

- 🤖 **AI Coach** - Personalized fitness coaching powered by GPT-4o
- 📱 **Food Scanner** - AI-powered food recognition and nutritional analysis
- 🍽️ **Meal Planner** - Smart meal planning with dietary preferences
- 💪 **Workout Planner** - Custom workout routines tailored to your fitness level
- 📱 **Responsive Design** - Seamless experience across all devices
- 🐳 **Docker Support** - Easy deployment with Docker and docker-compose

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI GPT-4o** - Advanced language model for AI recommendations
- **Tavily API** - Search and data retrieval service
- **Uvicorn** - ASGI server
- **Python 3.8+** - Backend runtime
- **Docker** - Containerization support
- **Nginx** - Web server and reverse proxy

### Frontend
- **React 18** - UI library with TypeScript
- **Vite** - Build tool and development server
- **TailwindCSS** - CSS framework
- **ShadCN UI** - Component library
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **npm** or **yarn** or **pnpm**
- **OpenAI API Key**
- **Tavily API Key**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/syeda434am/VitaFlex-AI.git
cd VitaFlex-AI
```

2. **Backend Setup:**
```bash
# Navigate to backend directory (if separate) or root
# Install Python dependencies
pip install -r requirements.txt

```

3. **Frontend Setup:**
```bash
# Navigate to frontend directory or install frontend dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Running the Application

**Important:** Start the backend first, then the frontend.

#### Option 1: Using Docker (Recommended)
```bash
# Start all services with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option 2: Manual Setup

1. **Start the FastAPI Backend:**
```bash
uvicorn com.mhire.app.main:app --reload
```
The backend will be available at `http://localhost:8000`

2. **Start the React Frontend:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
The frontend will be available at `http://localhost:5173`

## 📁 Project Structure
- Set the project within below structure by copying the files and folders inside com/mhire/ui/ and paste them outside of the com folder. The structure will then look like below:

```
VitaFlex-AI/
├── com/
│   └── mhire/
│       └── app/
│           ├── main.py              # FastAPI main application
│           ├── config/              # Configuration files
│           └── services/            # AI-powered microservices
│               ├── ai_coach/        # AI fitness coaching service
│               ├── food_scanner/    # Food recognition and analysis
│               ├── meal_planner/    # AI meal planning service
│               └── workout_planner/ # Workout generation service
├── nginx/                           # Nginx configuration
├── public/                          # Static assets
├── src/                             # React frontend source
│   ├── components/                  # React components
│   │   ├── ui/                      # ShadCN UI components
│   │   ├── fitness/                 # Fitness-related components
│   │   ├── nutrition/               # Nutrition components
│   │   └── dashboard/               # Dashboard components
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Frontend utilities
│   ├── pages/                       # React pages/routes
│   ├── services/                    # API client services
│   ├── App.tsx                      # Main React component
│   └── main.tsx                     # React entry point
├── .dockerignore                    # Docker ignore file
├── .gitignore                       # Git ignore file
├── Dockerfile                       # Docker configuration
├── LICENSE                          # Project license
├── README.md                        # Project documentation
├── components.json                  # ShadCN components config
├── docker-compose.yml               # Docker compose configuration
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package-lock.json                # NPM lock file
├── package.json                     # Node.js dependencies
├── postcss.config.js                # PostCSS configuration
├── requirements.txt                 # Python dependencies
├── tailwind.config.ts               # TailwindCSS configuration
├── tsconfig.app.json                # TypeScript app configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.node.json               # TypeScript Node configuration
└── vite.config.ts                   # Vite configuration
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
MODEL=model_name

# Tavily API Configuration
TAVILY_API_KEY=your_tavily_api_key_here

```

## 🔌 API Endpoints

The FastAPI backend provides the following key endpoints through specialized services:

### AI Coach Service
- `POST /api/v1/coach` - Get personalized coaching advice

### Food Scanner Service  
- `POST /api/v1/food-scanner` - Analyze food images for nutritional content

### Meal Planner Service
- `POST /api/v1/meal-planner` - Generate personalized meal plans

### Workout Planner Service
- `POST /api/v1/workout-planner` - Create custom workout routines

API documentation is available at `http://localhost:8000/docs` when the backend is running.

## 🤖 AI Integration

### Tavily AI API
- Enhanced search capabilities for fitness and nutrition information
- Real-time data retrieval for up-to-date health trends
- Fact-checking and information validation

### Service Architecture with OpenAI's GPT-4o GenAI Model
- **AI Coach Service**: Handles all AI-powered coaching interactions
- **Food Scanner Service**: Uses computer vision for food recognition and analysis
- **Meal Planner Service**: Manages meal planning algorithms and nutrition data
- **Workout Planner Service**: Generates and manages fitness routines

## 🏗️ Building for Production

### Backend
```bash
# For production deployment, consider using:
gunicorn -w 4 -k uvicorn.workers.UvicornWorker com.mhire.app.main:app
```

### Frontend
```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🚀 Deployment

### Backend Deployment Options
- **Heroku** - Easy Python app deployment
- **AWS EC2/Lambda** - Scalable cloud deployment
- **DigitalOcean** - Simple cloud hosting
- **Railway** - Modern deployment platform

### Frontend Deployment Options
- **Vercel** - Recommended for React applications
- **Netlify** - Great for static site hosting
- **AWS S3 + CloudFront** - Scalable static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License Version 2.0 - see the [LICENSE](LICENSE) file for details.

**VitaFlex-AI** - Empowering your wellness journey with AI 🌟