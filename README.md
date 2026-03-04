# Akshay Kumar Kotarya - Portfolio & Interactive Atmosphere

## 🚀 Project Overview
A high-performance, atmospheric portfolio platform built with **Next.js 15**. The project features a dynamic global weather-sync system, real-time geolocation, and a specialized **Google-themed Search UI** (`/google`) designed for creative recruitment and cold mailing.

## 🛠️ Tech Stack
-   **Framework**: Next.js 15 (App Router architecture)
-   **Language**: TypeScript (Type-safe component logic)
-   **Styling**: Tailwind CSS (Leveraging custom design tokens for glassmorphism and dynamic gradients)
-   **Icons**: Lucide React
-   **Interactivity**: React Hooks (`useState`, `useCallback`, `useEffect`) for state management and DOM effects.

## 🌐 API Integrations (Technical Specifications)

| API Name | Purpose | Cost / Tier |
| :--- | :--- | :--- |
| **Open-Meteo Weather** | Fetches temperature, weather codes (rain, snow, clouds), and wind speed. | **Free** (Open-source, no key required) |
| **Open-Meteo Geocoding** | Converts city strings into Lat/Lon coordinates for the city search feature. | **Free** |
| **EmailJS** | Handles contact form submissions directly from the browser to SMTP. | **Free Tier** |
| **Browser Geolocation** | Native API used to detect user coordinates for automatic "Atmosphere Sync". | **Native** (No cost) |

## 🎯 Interview Talking Points (Q&A)

### 1. "How does the dynamic background work?"
The site uses a custom `useWeather` hook that fetches data from Open-Meteo. This state is passed to a `WeatherBackground` component which maps weather codes (e.g., Code 61 for "Rain") to specific CSS gradients and particle overlays. This demonstrates **conditional rendering** and **state-driven UI**.

### 2. "Why use Next.js for a portfolio?"
Next.js provides **Server-Side Rendering (SSR)** for better SEO (critical for a portfolio) and **Image Optimization**. The App Router's file-based routing also allowed for a clean separation between the main portfolio and the `/google` sub-experience.

### 3. "How is the performance optimized?"
-   **Debounced Search**: Geocoding requests are only triggered when the user pauses typing.
-   **Lightweight Assets**: Using Lucide SVGs instead of heavy image icon libraries.
-   **Efficient State**: Used `useCallback` to memoize API fetch functions, preventing unnecessary re-renders during weather updates.

### 4. "Tell me about the Google UI implementation."
The `/google` page is a high-fidelity replica built with pure Tailwind. It uses **state-based filtering** to toggle between "Journey", "Projects", and "CP" views without page reloads, showcasing an understanding of UX and efficient React state management.

## 📁 Key Directory Structure
-   `/app/google`: The specialized Search UI experience.
-   `/app/hooks`: Core logic for weather, geolocation, and time calculations.
-   `/app/components`: Reusable UI elements (Weather particles, navigation, etc.).
-   `/public`: Static assets including the profile image and custom fonts.

---
**Author**: Akshay Kumar Kotarya  
**Live Site**: [portfolio-2026.vercel.app](https://portfolio-2026.vercel.app)