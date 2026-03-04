'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the shape of our data
export type WeatherType = 'clear' | 'rain' | 'cloudy' | 'snow' | 'windy' | 'spring';

export interface CityData {
    name: string;
    lat: number;
    lon: number;
}

export const CITIES: CityData[] = [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832 },
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
    { name: 'Noida', lat: 28.5355, lon: 77.3910 },
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Zurich', lat: 47.3769, lon: 8.5417 },
    { name: 'Amsterdam', lat: 52.3676, lon: 4.9041 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
];

interface WeatherState {
    type: WeatherType;
    temp: number;
    isDay: boolean;
    loading: boolean;
    error: string | null;
    cityName: string;
    localTime: string;
    utcOffset: number;
    windSpeed: number;
    precipProb: number;
}

export function useWeather() {
    const [activeCity, setActiveCity] = useState<CityData>(CITIES[0]); // Default to Mumbai
    const [timeOverride, setTimeOverride] = useState<number | null>(null); // Hour override (0-23)
    const [geoError, setGeoError] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [hasInitialPreference, setHasInitialPreference] = useState(true); // Default to true to hide modal during SSR
    const [weather, setWeather] = useState<WeatherState>({
        type: 'clear',
        temp: 0,
        isDay: true,
        loading: true,
        error: null,
        cityName: CITIES[0].name,
        localTime: '--:--',
        utcOffset: 0,
        windSpeed: 0,
        precipProb: 0,
    });

    const calculateLocalTime = useCallback((offsetSeconds: number) => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utc + (offsetSeconds * 1000));

        let hours = cityTime.getHours();
        const minutes = cityTime.getMinutes();

        // Apply override if exists
        if (timeOverride !== null) {
            hours = timeOverride;
        }

        return {
            timeStr: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
            isDay: hours >= 6 && hours < 18,
            currentHour: hours
        };
    }, [timeOverride]);

    const fetchWeather = useCallback(async (lat: number, lon: number, name: string) => {
        setWeather(prev => ({ ...prev, loading: true, error: null, cityName: name }));
        try {
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code,wind_speed_10m,precipitation&timezone=auto`
            );
            if (!res.ok) throw new Error("API Failed");
            const data = await res.json();

            const code = data.current.weather_code;
            const wind = data.current.wind_speed_10m;
            const precip = data.current.precipitation;
            let type: WeatherType = 'clear';

            if (code >= 51 && code <= 67) type = 'rain';
            else if (code >= 71 && code <= 77) type = 'snow';
            else if (code >= 95) type = 'rain';
            else if (code >= 1 && code <= 3) type = 'cloudy';

            // Windy condition
            if (wind > 20) type = 'windy';

            // Custom Spring logic (March-May)
            const month = new Date().getMonth();
            if (type === 'clear' && month >= 2 && month <= 4) type = 'spring';

            const { timeStr, isDay } = calculateLocalTime(data.utc_offset_seconds);

            setWeather({
                type,
                temp: Math.round(data.current.temperature_2m),
                isDay: isDay,
                loading: false,
                error: null,
                cityName: name,
                localTime: timeStr,
                utcOffset: data.utc_offset_seconds,
                windSpeed: wind,
                precipProb: precip
            });
        } catch (err) {
            setWeather(prev => ({ ...prev, loading: false, error: "API Failed", cityName: name }));
        }
    }, [calculateLocalTime]);

    useEffect(() => {
        fetchWeather(activeCity.lat, activeCity.lon, activeCity.name);
    }, [activeCity, fetchWeather]);

    // Live clock update
    useEffect(() => {
        const interval = setInterval(() => {
            if (!weather.loading) {
                const { timeStr, isDay } = calculateLocalTime(weather.utcOffset);
                setWeather(prev => ({ ...prev, localTime: timeStr, isDay }));
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [weather.utcOffset, weather.loading, calculateLocalTime]);

    const setCityByName = (name: string) => {
        const city = CITIES.find(c => c.name === name);
        if (city) {
            setActiveCity(city);
        }
    };

    const searchCities = async (query: string): Promise<CityData[]> => {
        if (query.length < 2) return [];
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=8&language=en&format=json`);
            const data = await res.json();
            if (!data.results) return [];

            return data.results.map((r: any) => {
                const parts = [r.name];
                if (r.admin1 && r.admin1 !== r.name) parts.push(r.admin1);
                parts.push(r.country_code.toUpperCase());

                return {
                    name: parts.join(', '),
                    lat: r.latitude,
                    lon: r.longitude
                };
            });
        } catch (err) {
            console.error("Geocoding API failed", err);
            return [];
        }
    };

    const setManualCity = (city: CityData) => {
        setActiveCity(city);
        localStorage.setItem('preferredCity', JSON.stringify(city));
        setHasInitialPreference(true);
    };

    const requestUserLocation = useCallback(() => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setGeoError("Geolocation is not supported by this browser.");
            return;
        }

        setIsDetecting(true);
        setGeoError(null);

        // Prioritize speed: low accuracy is near-instant and sufficient for weather sync.
        const options = {
            enableHighAccuracy: false,
            timeout: 20000, // Increased from 10s to 20s to prevent timeout errors
            maximumAge: 3600000 // 1 hour cached position is fine
        };

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const city: CityData = { name: 'Current Location', lat: latitude, lon: longitude };
            setActiveCity(city);
            localStorage.setItem('preferredCity', JSON.stringify(city));
            setHasInitialPreference(true);
            setGeoError(null);
            setIsDetecting(false);
        }, (err) => {
            console.error(`Geolocation Error [${err.code}]: ${err.message}`);

            let userHint = "";
            if (err.code === 1) {
                userHint = "Location permission denied.";
            } else if (err.code === 2) {
                userHint = "Position unavailable. Check system settings.";
            } else if (err.code === 3) {
                userHint = "Request timed out. Try manual search.";
            }

            setGeoError(userHint || "Failed to detect location.");
            setIsDetecting(false);
        }, options);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('preferredCity');
            if (saved) {
                setActiveCity(JSON.parse(saved));
                setHasInitialPreference(true);
            } else {
                setHasInitialPreference(false);
            }
        }
    }, []);

    return {
        ...weather,
        setCityByName,
        activeCityName: activeCity.name,
        setTimeOverride,
        timeOverride,
        searchCities,
        setManualCity,
        requestUserLocation,
        geoError,
        isDetecting,
        hasInitialPreference
    };
}
