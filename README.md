# Akshay Kumar Kotarya - Portfolio & Interactive Atmosphere

##  Project Overview
A high-performance, atmospheric portfolio platform built with **Next.js 15**. The project features a dynamic global weather-sync system, real-time geolocation, and a specialized **Google-themed Search UI** (`/google`) designed for creative recruitment and cold mailing.

## 🛠️ Tech Stack
-   **Framework**: Next.js 15 (App Router architecture)
-   **Language**: TypeScript (Type-safe component logic)
-   **Styling**: Tailwind CSS (Leveraging custom design tokens for glassmorphism and dynamic gradients)
-   **Icons**: Lucide React
-   **Interactivity**: React Hooks (`useState`, `useCallback`, `useEffect`) for state management and DOM effects.

##  API Integrations (Technical Specifications)

| API Name | Purpose | Cost / Tier |
| :--- | :--- | :--- |
| **Open-Meteo Weather** | Fetches temperature, weather codes (rain, snow, clouds), and wind speed. | **Free** (Open-source, no key required) |
| **Open-Meteo Geocoding** | Converts city strings into Lat/Lon coordinates for the city search feature. | **Free** |
| **EmailJS** | Handles contact form submissions directly from the browser to SMTP. | **Free Tier** |
| **Browser Geolocation** | Native API used to detect user coordinates for automatic "Atmosphere Sync". | **Native** (No cost) |


## 📁 Key Directory Structure
-   `/app/google`: The specialized Search UI experience.
-   `/app/hooks`: Core logic for weather, geolocation, and time calculations.
-   `/app/components`: Reusable UI elements (Weather particles, navigation, etc.).
-   `/public`: Static assets including the profile image and custom fonts.

---
**Author**: Akshay Kumar Kotarya  
**Live Site**: [portfolio-2026.vercel.app](https://portfolio-2026.vercel.app)