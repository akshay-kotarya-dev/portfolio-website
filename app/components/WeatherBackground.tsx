'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
    type: 'clear' | 'rain' | 'cloudy' | 'snow' | 'windy' | 'spring';
    isDay: boolean;
    windSpeed?: number;
    precipProb?: number;
}

export default function WeatherBackground({ type, isDay, windSpeed = 0, precipProb = 0 }: Props) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Calculate Sun/Moon position on an arc
    // Morning (6 AM): Top Right (x: 80%, y: 20%)
    // Noon (12 PM): Top Center (x: 50%, y: 5%)
    // Evening (6 PM): Top Left (x: 20%, y: 20%)
    const getCelestialPosition = () => {
        const hours = currentTime.getHours() + currentTime.getMinutes() / 60;
        // Map 6-18 to -1 to 1 for a semi-circle
        const t = ((hours - 6) / 12) * 2 - 1;
        const x = 50 + t * 40; // 10% to 90%
        const y = 5 + (t * t) * 20; // 5% at noon, 25% at sunrise/sunset
        return { x: `${x}%`, y: `${y}%` };
    };

    const celestialPos = getCelestialPosition();

    const getGradient = () => {
        if (!isDay) return 'bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#020202]';
        if (type === 'rain') return 'bg-gradient-to-b from-[#334155] to-[#0f172a]';
        if (type === 'cloudy') return 'bg-gradient-to-b from-[#94a3b8] to-[#475569]';
        if (type === 'snow') return 'bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]';
        if (type === 'windy') return 'bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#64748b]';
        if (type === 'spring') return 'bg-gradient-to-b from-[#ecfdf5] via-[#d1fae5] to-[#fecaca]';
        return 'bg-gradient-to-b from-[#60a5fa] via-[#93c5fd] to-[#ffedd5]';
    };

    return (
        <div className={`fixed inset-0 -z-10 transition-colors duration-[2000ms] ${getGradient()}`}>

            {/* Celestial Body (Sun/Moon) following an arc */}
            <motion.div
                animate={{ left: celestialPos.x, top: celestialPos.y }}
                transition={{ duration: 2, ease: "linear" }}
                className={`absolute rounded-full blur-[80px] pointer-events-none 
          ${isDay
                        ? 'w-[300px] h-[300px] bg-yellow-400/20 shadow-[0_0_150px_rgba(250,204,21,0.2)]'
                        : 'w-48 h-48 bg-slate-100/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]'
                    }
        `}
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Cloud Layers (Depth) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                    className="absolute top-[10%] left-[-10%] w-[120%] h-64 bg-white/5 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{ x: [100, -100] }}
                    transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
                    className="absolute top-[30%] right-[-10%] w-[100%] h-48 bg-white/5 blur-[100px] rounded-full"
                />
            </div>

            {/* Intensity-Driven Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* RAIN (Intensity driven by precipProb/windSpeed) */}
                {type === 'rain' && [...Array(Math.min(50, 10 + Math.floor(precipProb * 5)))].map((_, i) => (
                    <motion.div
                        key={`rain-${i}`}
                        initial={{ y: -20, x: Math.random() * 2000 }}
                        animate={{ y: 1200, x: (Math.random() * 2000) + (windSpeed * 2) }}
                        transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.4, ease: "linear" }}
                        className="absolute w-[1px] h-12 bg-blue-300/30"
                    />
                ))}

                {/* SNOW (Intensity driven by wind) */}
                {type === 'snow' && [...Array(40)].map((_, i) => (
                    <motion.div
                        key={`snow-${i}`}
                        initial={{ y: -20, x: Math.random() * 2000, opacity: Math.random() }}
                        animate={{
                            y: 1200,
                            x: (Math.random() * 2000) + (Math.sin(i) * 50) + (windSpeed * 5)
                        }}
                        transition={{ repeat: Infinity, duration: 4 + Math.random() * 6, ease: "linear" }}
                        className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
                    />
                ))}

                {/* WINDY / SPRING */}
                {(type === 'windy' || type === 'spring') && [...Array(Math.floor(20 + windSpeed / 2))].map((_, i) => (
                    <motion.div
                        key={`wind-${i}`}
                        initial={{ y: Math.random() * 1000, x: -100, rotate: 0 }}
                        animate={{ x: 2500, y: Math.random() * 1000 + (windSpeed * 2), rotate: 1080 }}
                        transition={{ repeat: Infinity, duration: 1.5 + Math.random() * 3, ease: "easeInOut" }}
                        className={`absolute w-4 h-1 rounded-full ${type === 'spring' ? 'bg-pink-300/40' : 'bg-white/10'}`}
                    />
                ))}
            </div>

            {/* Nocturnal Stars */}
            {!isDay && type === 'clear' && (
                <div className="absolute inset-0">
                    {[...Array(80)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="absolute bg-white rounded-full w-[1.5px] h-[1.5px] animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random(),
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Atmospheric Depth Overlay */}
            <div className={`absolute inset-0 backdrop-blur-[3px] transition-colors duration-1000 ${isDay ? 'bg-white/[0.02]' : 'bg-black/[0.05]'}`}></div>
        </div>
    );
}