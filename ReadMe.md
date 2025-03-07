# TripGenius


## 🌍 Smart Trip Planning at Your Fingertips

TripGenius is a modern web application that leverages AI to generate personalized travel itineraries based on user preferences. The application combines React, Google's Gemini AI, Fireproof for data persistence, along with RadixUI and TailwindCSS for a sleek, responsive UI.

## ✨ Features

- **AI-Powered Trip Generation**: Create detailed travel plans using Google's Gemini AI
- **Personalized Itineraries**: Customize trips based on destination, duration, budget, and travel party
- **Hotel Recommendations**: Get curated hotel options with pricing, ratings, and descriptions
- **Day-by-Day Planning**: View detailed daily itineraries with places to visit, ticket prices, and travel times
- **Trip Management**: Save, view, and delete trip plans
- **Responsive Design**: Optimized for all devices with a modern UI

## 🛠️ Technologies

- **Frontend**: React.js with Next.js
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **Database**: Fireproof (client-side database)
- **UI Components**: RadixUI components and TailwindCSS
- **Location Services**: Google Places Autocomplete API
- **Notifications**: React-Toastify

## 📋 Project Structure

```
tripgenius/
├── components/
│   ├── saved-plans.tsx     # Displays saved trip plans
│   ├── services.tsx        # AI service integration
│   ├── tripgenius.tsx      # Main application component
│   └── types.ts            # TypeScript interfaces and types
├── public/
│   └── ...                 # Static assets
└── ...                     # Other configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- NPM or Yarn
- Google API Keys (Gemini AI and Maps)

### Environment Setup

Create a `.env.local` file in the project root with the following variables:

```
NEXT_PUBLIC_GOOGLE_GEMINI_API=your_gemini_api_key
NEXT_PUBLIC_GOOGLE_MAP_API=your_google_maps_api_key
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KodeSage/tripgenius/.git
   cd tripgenius
   ```

2. Install dependencies:
   ```bash
   npm install --force
   # or
   yarn install --force
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🧠 How It Works

### Trip Generation Process

1. User enters trip details (destination, number of days, budget, and travel mode)
2. The application sends a prompt to Google's Gemini AI
3. Gemini AI generates a comprehensive trip plan in JSON format
4. The application parses the response and saves it to the Fireproof database
5. Users can view their generated trips in the "Saved Plans" tab

### Data Model

The application uses the following data model:

- **TripDocument**: The main document stored in Fireproof, containing trip details and the generated plan
- **TripPlan**: The AI-generated travel plan with hotels and itinerary
- **Hotel**: Information about recommended accommodations
- **Itinerary**: Day-by-day plan with places to visit

## 📱 User Interface

### Create New Plan Tab

- Destination input with Google Places Autocomplete
- Number of days selector (1-5 days)
- Budget options (Low, Medium, High)
- Travel mode selection (Solo, Family, Couples, Friends)
- Generate button to create the trip plan

### Saved Plans Tab

- List of all generated trip plans
- Expandable cards showing trip details
- Hotel recommendations with images and ratings
- Day-by-day itinerary with places to visit
- Option to delete unwanted trips

## 🔧 Customization

### AI Prompt Customization

The AI prompt can be customized in the `services.tsx` file:

```typescript
export const AI_Prompt =
  "Generate Travel Plan for Location : {location}, for {totaldays} days for {couples} with a {cheap} budget...";
```

### UI Customization

The UI is built with RadixUI components and TailwindCSS, making it easy to customize:

- Edit TailwindCSS classes in component files
- Modify RadixUI component styling in your global CSS



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Fireproof](https://github.com/fireproof-storage/fireproof) for client-side database functionality
- [Google Gemini AI](https://aistudio.google.com/prompts/new_chat) for powering the trip generation
- [RadixUI](https://www.radix-ui.com/) for accessible UI components
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [React Google Places Autocomplete](https://github.com/googlemap/react-google-places-autocomplete) for location search

---

Created with ❤️ by [James Harrison](https://github.com/KodeSage)