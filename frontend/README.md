# MindMate Frontend

A modern, calming mental health companion app built with React and Vite.

## Features

- 🎯 Daily mood tracking with visual charts
- 💬 AI-powered chat support
- 🫁 Guided breathing exercises
- 📝 Activity suggestions
- 🎨 Calming, accessible design

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- Chart.js (mood tracking)
- CSS Modules
- Google Fonts (Inter)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Development

The app is structured as follows:

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── styles/        # Global styles
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
└── public/            # Static assets
```

## Backend Integration

The frontend expects a backend server running at `http://localhost:8000` with the following endpoints:

- `GET /prompts` - Get onboarding prompts
- `POST /chat` - Send chat messages
- `GET /mood` - Get mood history
- `POST /mood` - Save mood entry

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
