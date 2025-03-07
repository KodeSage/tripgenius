import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ## 📈 Future Enhancements

// - **Offline Support**: Enhanced offline functionality with Fireproof
// - **Trip Sharing**: Share generated trips with friends via links or social media
// - **Trip Editing**: Allow users to customize AI-generated trips
// - **Travel Booking Integration**: Connect with booking APIs for hotels and attractions
// - **Weather Integration**: Include weather forecasts in trip planning
// - **PDF Export**: Export trip plans as PDF documents