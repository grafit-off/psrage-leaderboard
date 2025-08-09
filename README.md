# Faceit Leaderboard App

A modern React application that displays Faceit leaderboard data with a beautiful dark theme and multilingual support (English and Ukrainian).

## Features

- 🌙 **Dark Theme**: Modern dark UI with gradient accents and glassmorphism effects
- 🌍 **Multilingual**: Support for English and Ukrainian languages
- 📊 **Real-time Data**: Fetches live data from Faceit API
- 🏆 **Top Stats Cards**: Displays clutch master, utility damage king, and most matches
- 📋 **Sortable Table**: Interactive leaderboard with sortable columns
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Performance**: Optimized with React hooks and memoization

## Top Stats Cards

The application displays three special cards at the top:

1. **Clutch Master**: Player with the highest combined 1v1 and 1v2 win rate
2. **Utility Damage King**: Player with the highest total utility damage
3. **Most Matches**: Player with the most matches played

## Leaderboard Table

The main table displays players with more than 5 matches, sorted by Average K/D Ratio by default. Columns include:

- Nickname
- Average K/D Ratio
- Average Kills
- ADR (Average Damage per Round)
- Win Rate %
- Average Headshots %

All columns are sortable by clicking on the headers.

## Technology Stack

- **React 19** with TypeScript
- **Context API** for state management
- **CSS3** with modern features (Grid, Flexbox, Custom Properties)
- **Faceit API** for data fetching

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faceit-leaderboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Header.tsx      # Header with language switcher
│   ├── LeaderboardTable.tsx # Sortable leaderboard table
│   └── StatCard.tsx    # Reusable stat card component
├── context/            # React contexts
│   ├── LanguageContext.tsx # Language management
│   └── LeaderboardContext.tsx # Data management
├── services/           # API services
│   └── faceitApi.ts   # Faceit API integration
├── translations/       # Language files
│   ├── en.json        # English translations
│   └── uk.json        # Ukrainian translations
├── types/             # TypeScript type definitions
│   └── faceit.ts      # Faceit API types
├── utils/             # Utility functions
│   └── formatters.ts  # Data formatting utilities
└── App.tsx            # Main application component
```

## API Configuration

The application uses the Faceit API with the following configuration:

- **Endpoint**: `https://open.faceit.com/data/v4/hubs/3b814eda-51a7-497b-8efd-18d039e8db49/stats?limit=100`
- **API Key**: Configured in `src/services/faceitApi.ts`

## Styling

The application uses a modern dark theme with:

- **Primary Colors**: #ff6b6b (coral) and #4ecdc4 (teal)
- **Background**: Dark gradients (#0a0a0a to #1a1a1a)
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Faceit for providing the API
- React team for the amazing framework
- The gaming community for inspiration
