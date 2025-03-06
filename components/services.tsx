/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

const apiKey: any = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Les Vegas, for 3 days for couples with a cheap budget , give me Hotels options list with HotelName, Hotel address, Price, hotel image url , geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON Format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "travelPlan": {\n      "location": "Las Vegas",\n      "duration": "3 days",\n      "budget": "Cheap",\n      "travelers": "Couples",\n      "hotels": [\n        {\n          "hotelName": "Circus Circus Hotel & Casino",\n          "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n          "price": "$40-$80/night",\n          "hotelImageUrl": "https://www.circuscircus.com/wp-content/uploads/2023/03/circus-circus-hotel-casino-las-vegas-strip.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1353,\n            "longitude": -115.1646\n          },\n          "rating": 3.5,\n          "description": "Family-friendly hotel with a circus theme, free circus acts, and affordable dining options."\n        },\n        {\n          "hotelName": "Excalibur Hotel & Casino",\n          "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n          "price": "$50-$90/night",\n          "hotelImageUrl": "https://www.excalibur.com/content/dam/MGM/Excalibur/property-details/hotel/excalibur-hotel-casino-exterior.tif",\n          "geoCoordinates": {\n            "latitude": 36.0985,\n            "longitude": -115.1745\n          },\n          "rating": 4.0,\n          "description": "Medieval-themed hotel with budget-friendly rooms, a lively casino, and Tournament of Kings show."\n        },\n        {\n          "hotelName": "Luxor Hotel & Casino",\n          "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",\n          "price": "$60-$100/night",\n          "hotelImageUrl": "https://www.luxor.com/content/dam/MGM/Luxor/property-details/hotel/luxor-hotel-casino-exterior.tif",\n          "geoCoordinates": {\n            "latitude": 36.0956,\n            "longitude": -115.1758\n          },\n          "rating": 4.0,\n          "description": "Pyramid-shaped hotel with affordable rooms, various attractions, and a distinctive atmosphere."\n        }\n      ],\n      "itinerary": {\n        "day1": {\n          "theme": "Exploring the Strip (South)",\n          "bestTimeToVisit": "Afternoon/Evening",\n          "places": [\n            {\n              "placeName": "Welcome to Las Vegas Sign",\n              "placeDetails": "Iconic photo opportunity at the famous sign.",\n              "placeImageUrl": "https://www.lasvegas.com/wp-content/uploads/2023/08/welcome-to-las-vegas-sign-1440x810.jpg",\n              "geoCoordinates": {\n                "latitude": 36.0826,\n                "longitude": -115.1725\n              },\n              "ticketPricing": "Free",\n              "travelTime": "N/A (Start Point)"\n            },\n            {\n              "placeName": "Bellagio Conservatory & Botanical Garden",\n              "placeDetails": "Stunning floral displays that change seasonally, free to visit.",\n              "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory/bellagio-conservatory-chinese-new-year-2023-gallery-2023_1920x1080.tif",\n              "geoCoordinates": {\n                "latitude": 36.1127,\n                "longitude": -115.1763\n              },\n              "ticketPricing": "Free",\n              "travelTime": "15-20 minutes (walking/bus)"\n            },\n            {\n              "placeName": "Bellagio Fountains",\n              "placeDetails": "Spectacular water show choreographed to music, free to watch.",\n              "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Fountains_of_Bellagio_07.jpg/1280px-Fountains_of_Bellagio_07.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1129,\n                "longitude": -115.1742\n              },\n              "ticketPricing": "Free",\n              "travelTime": "2 minutes (walking)"\n            },\n            {\n              "placeName": "High Roller Observation Wheel",\n              "placeDetails": "Giant observation wheel offering panoramic views of the city.",\n              "placeImageUrl": "https://www.caesars.com/content/dam/onrc/entertainment/high-roller/the-high-roller-observation-wheel-ext-day.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1171,\n                "longitude": -115.1695\n              },\n              "ticketPricing": "$25-$37",\n              "travelTime": "10-15 minutes (bus/rideshare)"\n            }\n          ]\n        },\n        "day2": {\n          "theme": "Downtown Las Vegas and Fremont Street Experience",\n          "bestTimeToVisit": "Evening/Night",\n          "places": [\n            {\n              "placeName": "Fremont Street Experience",\n              "placeDetails": "Light shows, street performers, and casinos under a giant video screen.",\n              "placeImageUrl": "https://fremontstreetexperience.com/wp-content/uploads/2023/06/FSE-Homepage-Carousel_viva-vision.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1703,\n                "longitude": -115.1421\n              },\n              "ticketPricing": "Free (some attractions cost extra)",\n              "travelTime": "30-40 minutes (bus/rideshare from the Strip)"\n            },\n            {\n              "placeName": "Mob Museum",\n              "placeDetails": "Museum dedicated to the history of organized crime.",\n              "placeImageUrl": "https://themobmuseum.org/wp-content/uploads/2023/09/Museum-Exterior-September-2023-scaled.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1712,\n                "longitude": -115.1408\n              },\n              "ticketPricing": "$30-$37",\n              "travelTime": "5 minutes (walking)"\n            },\n            {\n              "placeName": "Neon Museum",\n              "placeDetails": "Collection of vintage Las Vegas signs.",\n              "placeImageUrl": "https://www.neonmuseum.org/wp-content/uploads/2023/03/Neon-Museum-Main-Boneyard-Sign-scaled.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1761,\n                "longitude": -115.1402\n              },\n              "ticketPricing": "$28-$35",\n              "travelTime": "5-10 minutes (walking/rideshare)"\n            }\n          ]\n        },\n        "day3": {\n          "theme": "Relaxation and Budget-Friendly Activities",\n          "bestTimeToVisit": "Anytime",\n          "places": [\n            {\n              "placeName": "Pool Time",\n              "placeDetails": "Enjoy the hotel pool or find a day pass to a nicer pool (consider research for free pool access with drink purchase etc).",\n              "placeImageUrl": "https://caesars.com/content/dam/empire/things-to-do/pools/garden-of-the-gods/flipbooks/gog-pool-scene-fb.jpg.transform/fb-wide-xl/image.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1162,\n                "longitude": -115.1744\n              },\n              "ticketPricing": "Free (hotel pool) / Day pass costs vary",\n              "travelTime": "N/A (at Hotel or nearby)"\n            },\n            {\n              "placeName": "Visit the LINQ Promenade",\n              "placeDetails": "Outdoor shopping, dining, and entertainment district.",\n              "placeImageUrl": "https://www.caesars.com/linq/promenade/-/media/linq-promenade/images/home/venue/linq-promenade-night-venue.jpg",\n              "geoCoordinates": {\n                "latitude": 36.1178,\n                "longitude": -115.1692\n              },\n              "ticketPricing": "Free (activities/dining cost extra)",\n              "travelTime": "15-20 minutes (bus/rideshare)"\n            },\n            {\n              "placeName": "Ethel M Chocolate Factory and Cactus Garden",\n              "placeDetails": "Free chocolate factory tour and botanical cactus garden.",\n              "placeImageUrl": "https://ethelm.com/cdn/shop/files/EM_HolidayCactusGarden_Blog_Desktop.jpg?v=1701441343",\n              "geoCoordinates": {\n                "latitude": 36.0269,\n                "longitude": -115.0731\n              },\n              "ticketPricing": "Free",\n              "travelTime": "20-30 minutes (rideshare)"\n            }\n          ]\n        }\n      }\n    }\n  }\n]\n```',
        },
      ],
    },
  ],
});

export const AI_Prompt =
  "Generate Travel Plan for Location : {location}, for {totaldays} days for {couples} with a {cheap} budget , give me Hotels options list with HotelName, Hotel address, Price, hotel image url , geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totaldays} days with each day plan with best time to visit in JSON Format";

// const Base_URL = "https://places.googleapis.com/v1/places:searchNearby";

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API,
//     "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
//   },
// };

// export const GetPlaceDetails = (detail: any) =>
//   axios.post(Base_URL, detail, config);

// export const PHOTO_REF_URL =
//   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600key=" +
//   import.meta.env.VITE_GOOGLE_PHOTO_API;
