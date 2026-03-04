'use client';

import { useWeather, CITIES } from './hooks/useWeather';
import WeatherBackground from './components/WeatherBackground';
import {
  MapPin, Code, Briefcase, ChevronDown, ExternalLink,
  Github, Linkedin, MessageSquare, Command as CmdIcon,
  GraduationCap,
  Layers, Package, Globe, Database, Award, CheckCircle2,
  Server, Rocket, Binary, Sparkles,
  Heart, Send, Search
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import emailjs from 'emailjs-com';

// --- Components ---
const ScrollHighlight = ({ children, color, type = 'text' }: { children: React.ReactNode, color?: string, type?: 'text' | 'header' }) => {
  const { isDay, localTime } = useWeather();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate dynamic color based on user's theme request
  const getDynamicColor = () => {
    if (color) return color;
    if (type === 'header') return 'rgba(59, 130, 246, 0.4)'; // Blue sky for headers

    const hour = parseInt(localTime.split(':')[0]);
    if (!isDay) return 'linear-gradient(90deg, rgba(168, 85, 247, 0.4), rgba(251, 146, 60, 0.4))'; // Night: Light Purple -> Orange
    if (hour < 10 || hour > 17) return 'rgba(251, 146, 60, 0.5)'; // Morning/Evening: Orange
    return 'rgba(251, 191, 36, 0.5)'; // Day: Brown-yellow (Amber)
  };

  const activeColor = getDynamicColor();
  const backgroundSize = useTransform(scrollYProgress, [0.4, 0.6], ["0% 100%", "100% 100%"]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block px-1 rounded-sm bg-no-repeat bg-transparent ${type === 'header' ? 'font-extrabold' : 'font-medium'}`}
      style={{
        backgroundImage: activeColor.includes('gradient') ? activeColor : `linear-gradient(${activeColor}, ${activeColor})`,
        backgroundPosition: 'left bottom',
        backgroundSize
      }}
    >
      {children}
    </motion.span>
  );
};

// --- Data ---
const SKILL_CATEGORIES = {
  Languages: [
    { name: 'C/C++', icon: Binary, color: 'text-blue-400' },
    { name: 'Python', icon: Binary, color: 'text-yellow-400' },
    { name: 'SQL', icon: Database, color: 'text-blue-500' },
    { name: 'JavaScript', icon: Binary, color: 'text-yellow-500' },
  ],
  Backend: [
    { name: 'FastAPI', icon: Rocket, color: 'text-emerald-400' },
    { name: 'Node.js', icon: Server, color: 'text-green-500' },
    { name: 'Express.js', icon: Rocket, color: 'text-gray-400' },
  ],
  Frontend: [
    { name: 'React.js', icon: Package, color: 'text-blue-400' },
    { name: 'Next.js', icon: Globe, color: 'text-white' },
    { name: 'TypeScript', icon: Code, color: 'text-blue-500' },
  ],
  'ML & AI': [
    { name: 'LangChain', icon: Sparkles, color: 'text-emerald-500' },
    { name: 'LlamaIndex', icon: Sparkles, color: 'text-purple-500' },
    { name: 'Scikit-learn', icon: Sparkles, color: 'text-orange-400' },
    { name: 'pandas', icon: Binary, color: 'text-blue-300' },
    { name: 'Pinecone', icon: Database, color: 'text-forest-500' },
  ],
  'Cloud & DevOps': [
    { name: 'GCP', icon: Globe, color: 'text-blue-500' },
    { name: 'Docker', icon: Layers, color: 'text-sky-500' },
    { name: 'Kubernetes', icon: Layers, color: 'text-blue-600' },
    { name: 'CI/CD', icon: Rocket, color: 'text-emerald-500' },
    { name: 'Linux', icon: Server, color: 'text-orange-500' },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
    { name: 'MongoDB', icon: Database, color: 'text-green-400' },
    { name: 'Redis', icon: Database, color: 'text-red-500' },
  ],
};

const JOURNEY = [
  {
    title: 'Associate Software Engineer @ Amalgamist',
    date: 'Jun 2025 – Present',
    description: (
      <>
        At Amalgamist I went from writing APIs to owning an entire ML-powered trading intelligence system. I built 50+ production REST APIs, engineered a 12-module diagnostic system to evaluate model health across a 700+ stock universe, and ran deep data analysis (<ScrollHighlight>improved time by 98%</ScrollHighlight> in analysis module) that directly <ScrollHighlight>improved trade success by 40%</ScrollHighlight>. Every piece connected from the backend to ML evaluation to frontends to the execution platform. It taught me what it really means to ship end to end.
      </>
    ),
    location: 'Noida, India',
    icon: Briefcase
  },
  {
    title: 'Bachelor of Technology @ IIT (BHU), Varanasi',
    date: '2021 – 2025',
    description: 'Mechanical Engineering. CGPA: 7.43/10. Beyond academics I stayed active in the college community, managing events and leading teams.',
    location: 'Varanasi, India',
    icon: GraduationCap
  },
  {
    title: 'Schooling @ Jawahar Navodaya Vidyalaya',
    date: '2014 – 2021',
    description: 'Secured in top 40 position in district within 10000 students for JNVST exam.',
    location: 'India',
    icon: GraduationCap
  }
];

const PROJECTS = [
  {
    title: 'Mechanical Assistant',
    subtitle: 'Domain-Specific RAG System',
    tags: ['Python', 'LLAMA', 'Pinecone', 'Streamlit'],
    description: 'Production-grade RAG system for intelligent mechanical engineering QA using LlamaIndex and vector embeddings.',
    icon: Binary
  },
  {
    title: 'SpeechSync AI',
    subtitle: 'Voice-Powered Conversational Agent',
    tags: ['Next.js', 'Whisper', 'GPT-3.5', 'Cloudflare'],
    description: 'Real-time S2S platform achieving <50ms latency for voice interactions with serverless backend.',
    icon: Sparkles
  },
  {
    title: 'SkillNode',
    subtitle: 'Intelligent Job Matching',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    description: 'Full-stack portal using Dijkstra and Floyd-Warshall for optimal skill career trajectories.',
    icon: MapPin
  }
];


const ACHIEVEMENTS = [
  {
    title: 'CP',
    subtitle: 'LeetCode Knight (Rating 1900)',
    description: 'Top 5% globally with 900+ problems solved.',
    icon: Award,
    id: 'coding'
  },
  {
    title: 'Leadership & Mentorship',
    subtitle: 'Team Management',
    description: 'Marketing Manager at Spardha (managed team of 20, secured sponsorships) and Induction Mentor (guided 15+ freshmen).',
    icon: Sparkles
  }
];

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[1000] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
      style={{ scaleX }}
    />
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.pageYOffset > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-[100] w-12 h-12 glass-card rounded-full flex items-center justify-center text-blue-400 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all shadow-2xl glass-card-hover border-blue-500/20"
        >
          <ChevronDown className="rotate-180" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};


const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
  >
    <span className="text-[8px] font-black tracking-[0.5em] uppercase text-adaptive-muted opacity-50">Scroll Down</span>
    <div className="w-5 h-8 border-2 border-adaptive/20 rounded-full flex justify-center p-1">
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-1 h-2 bg-blue-400 rounded-full"
      />
    </div>
  </motion.div>
);

export default function Home() {
  const {
    type, temp, isDay, loading, setCityByName, activeCityName, cityName,
    localTime, setTimeOverride, timeOverride, windSpeed, precipProb,
    searchCities, setManualCity, requestUserLocation, hasInitialPreference,
    geoError, isDetecting
  } = useWeather();
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const cityPickerRef = useRef<HTMLDivElement>(null);

  const [showPreferenceModal, setShowPreferenceModal] = useState(false); // Always start false for SSR
  const [locationError, setLocationError] = useState<string | null>(null);

  // Sync preference modal state after mount to avoid hydration mismatch
  useEffect(() => {
    if (!hasInitialPreference) {
      setShowPreferenceModal(true);
    } else {
      setShowPreferenceModal(false);
    }
  }, [hasInitialPreference]);

  // Sync hook error with component state
  useEffect(() => {
    if (geoError) setLocationError(geoError);
  }, [geoError]);

  const handleDetectLocation = async () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    requestUserLocation();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const results = await searchCities(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchCities]);
  // Handle click outside to close city picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityPickerRef.current && !cityPickerRef.current.contains(event.target as Node)) {
        setShowCityPicker(false);
      }
    };
    if (showCityPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCityPicker]);

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [formMessage, setFormMessage] = useState('');

  // Scrollspy logic
  const [activeTab, setActiveTab] = useState('about');
  useEffect(() => {
    const sections = ['about', 'journey', 'projects', 'coding', 'skills', 'contact'];

    const handleScroll = () => {
      const vh = window.innerHeight;
      const centerY = vh / 2;

      let currentSection = sections[0];

      // Check for each section
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= centerY && rect.bottom >= centerY) {
            currentSection = id;
            break;
          }
        }
      }

      // Handle bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        currentSection = sections[sections.length - 1];
      }

      setActiveTab(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adaptive styles logic
  const isLightMode = isDay && type !== 'rain';
  const colors = {
    primary: isLightMode ? '#0f172a' : '#ffffff',
    secondary: isLightMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.5)',
    muted: isLightMode ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.4)',
    bgCard: isDay ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.03)',
    border: isDay ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.08)'
  };

  if (loading && !activeCityName) return (
    <div className="h-screen w-full flex items-center justify-center bg-transparent" style={{ color: colors.primary }}>
      <div className="flex flex-col items-center gap-6">
        <div className={`w-12 h-12 border-2 ${isLightMode ? 'border-slate-200' : 'border-white/5'} border-t-blue-400 rounded-full animate-spin`}></div>
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Atmosphere Syncing</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-transparent selection:bg-blue-500/40 relative overflow-x-hidden font-inter" style={{ color: colors.primary }}>
      <ScrollProgressBar />
      <BackToTop />

      {/* Initial Preference Modal */}
      <AnimatePresence>
        {showPreferenceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card max-w-lg w-full p-12 rounded-[4rem] text-center shadow-2xl border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-y-[-50%]"></div>

              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-inner">
                <Globe className="text-blue-400" size={36} />
              </div>

              <h2 className="text-3xl font-black font-outfit text-adaptive mb-6 tracking-tight leading-none">Sync Your Atmosphere.</h2>
              <p className="text-adaptive-muted text-lg font-bold leading-relaxed mb-6 px-4">
                Allow location access to match the portfolio's sky, weather, and time with your current environment for a truly immersive experience.
              </p>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-10">
                Tip: You can also manually adjust the time using the "Time Sync" slider at any point.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDetectLocation}
                  disabled={isDetecting}
                  className={`w-full ${isDetecting ? 'bg-blue-500/50' : 'bg-blue-500 hover:bg-blue-600'} text-white py-6 rounded-full font-black tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group`}
                >
                  {isDetecting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <MapPin size={18} className="group-hover:animate-bounce" />
                  )}
                  {isDetecting ? 'Detecting...' : 'Detect Location'}
                </button>

                {locationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-black text-red-500 uppercase tracking-widest"
                  >
                    {locationError}
                  </motion.p>
                )}

                <div className="flex items-center gap-4 py-4">
                  <div className="h-px flex-1 bg-adaptive-muted/10"></div>
                  <span className="text-[10px] font-black text-adaptive-muted uppercase tracking-[0.3em]">Or search city</span>
                  <div className="h-px flex-1 bg-adaptive-muted/10"></div>
                </div>

                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search size={16} className="text-adaptive-muted opacity-40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search your city..."
                    value={searchQuery}
                    onChange={async (e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      if (val.length >= 2) {
                        setIsSearching(true);
                        const results = await searchCities(val);
                        setSearchResults(results);
                        setIsSearching(false);
                      } else {
                        setSearchResults([]);
                      }
                    }}
                    className="w-full glass-card pl-14 pr-8 py-5 rounded-full text-sm font-bold placeholder:text-adaptive-muted/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-6 overflow-hidden rounded-[2.5rem] border-white/20 shadow-2xl max-h-60 overflow-y-auto custom-scrollbar"
                  >
                    {searchResults.map((city) => (
                      <button
                        key={`${city.lat}-${city.lon}`}
                        onClick={() => {
                          setManualCity(city);
                          setSearchResults([]);
                          setSearchQuery('');
                        }}
                        className="w-full px-8 py-4 text-left text-xs font-bold border-b border-white/5 last:border-none hover:bg-white/10 transition-colors flex items-center gap-3 text-adaptive"
                      >
                        <Globe size={14} className="text-blue-400" />
                        {city.name}
                      </button>
                    ))}
                  </motion.div>
                )}

                <button
                  onClick={() => setShowPreferenceModal(false)}
                  className="text-[10px] font-black text-adaptive-muted uppercase tracking-widest hover:text-blue-500 transition-colors py-2"
                >
                  Skip for now
                </button>
              </div>

              <p className="mt-8 text-[8px] font-black text-adaptive-muted uppercase tracking-widest opacity-40">
                You can change this anytime from the navigation bar.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;800;900&family=Inter:wght@300;400;600&display=swap');
        html { scroll-behavior: smooth; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .glass-card { 
          background: ${colors.bgCard}; 
          backdrop-filter: ${isDay ? 'blur(24px) saturate(180%)' : 'blur(20px)'}; 
          border: 1px solid ${colors.border};
          box-shadow: ${isDay ? '0 8px 32px 0 rgba(31, 38, 135, 0.07)' : 'none'};
        }
        .glass-card-hover:hover { 
          background: ${isDay ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.06)'}; 
          border-color: ${isDay ? 'rgba(15, 23, 42, 0.25)' : 'rgba(255, 255, 255, 0.15)'}; 
        }
        .text-adaptive { color: ${colors.primary}; transition: color 1s ease; }
        .text-adaptive-muted { color: ${colors.muted}; transition: color 1s ease; }
        .icon-adaptive { color: ${colors.muted}; transition: color 1s ease; }
      `}</style>

      <WeatherBackground type={type} isDay={isDay} windSpeed={windSpeed} precipProb={precipProb} />

      {/* Navigation & Atmosphere Controls */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-4 lg:p-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-4 pointer-events-auto order-2 md:order-1">
            {/* Time Control Slider (Now on the left) */}
            <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-4 min-w-[200px] shadow-xl">
              <div className="flex flex-col gap-0.5 min-w-[60px]">
                <span className="text-[8px] font-black tracking-widest text-adaptive-muted uppercase leading-none">Time Sync</span>
                <span className="text-[10px] font-black text-blue-500 leading-none">{timeOverride !== null ? `${timeOverride}:00` : 'LIVE'}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="range" min="0" max="23"
                  value={timeOverride ?? new Date().getHours()}
                  onChange={(e) => setTimeOverride(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-white/10 appearance-none rounded-full cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[6px] font-black text-adaptive-muted uppercase">Manual Sync available</span>
                  {timeOverride !== null && (
                    <button
                      onClick={() => setTimeOverride(null)}
                      className="text-[7px] font-black tracking-widest text-blue-400 uppercase hover:text-blue-500 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* City & Time Display (Reordered: City first, then Time/Temp) */}
            <div className="relative group" ref={cityPickerRef}>
              <button
                onClick={() => setShowCityPicker(!showCityPicker)}
                className="glass-card pl-6 pr-4 py-2 rounded-full flex items-center gap-4 shadow-2xl transition-all active:scale-95 glass-card-hover group"
              >
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] font-black font-outfit text-adaptive block mb-0.5 tracking-tight">{activeCityName}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black text-blue-400 tracking-wider uppercase">{type}</span>
                    <span className="w-1 h-1 rounded-full bg-adaptive/20"></span>
                    <span className="text-[8px] font-black text-adaptive">{temp}°C</span>
                  </div>
                </div>

                <div className="w-px h-6 bg-black/5 dark:bg-white/10 ml-2"></div>

                <div className="flex flex-col text-right leading-none min-w-[70px]">
                  <span className="text-xl font-black font-outfit text-adaptive block tracking-tighter">{localTime}</span>
                </div>

                <ChevronDown size={10} className={`icon-adaptive transition-transform duration-500 group-hover:text-blue-400 ${showCityPicker ? 'rotate-180' : ''}`} />
              </button>

              {/* City Picker Overlay */}
              <AnimatePresence>
                {showCityPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 left-0 w-80 bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] shadow-2xl p-3 z-[110] overflow-hidden pointer-events-auto"
                  >
                    <div className="px-5 py-3 border-b border-black/5 dark:border-white/5 mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-adaptive-muted uppercase">Atmosphere Nodes</span>
                      {isSearching && <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>}
                    </div>

                    <div className="px-3 mb-3">
                      <div className="relative">
                        <CmdIcon size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-adaptive-muted" />
                        <input
                          type="text"
                          placeholder="Search global cities..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-[10px] font-bold text-adaptive focus:outline-none focus:border-blue-500/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto custom-scrollbar px-1">
                      {searchResults.length > 0 ? (
                        searchResults.map((city) => (
                          <button
                            key={`${city.lat}-${city.lon}`}
                            onClick={() => { setManualCity(city); setShowCityPicker(false); setSearchQuery(''); }}
                            className="w-full px-5 py-4 text-left text-xs rounded-2xl transition-all flex items-center justify-between group mb-1 text-adaptive-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-adaptive"
                          >
                            <div className="flex items-center gap-3">
                              <Globe size={14} className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                              {city.name}
                            </div>
                          </button>
                        ))
                      ) : (
                        <>
                          <div className="px-5 py-2 text-[8px] font-black text-adaptive-muted uppercase tracking-widest opacity-50">Local Nodes</div>
                          {CITIES.map((city) => (
                            <button
                              key={city.name}
                              onClick={() => { setCityByName(city.name); setShowCityPicker(false); }}
                              className={`w-full px-5 py-4 text-left text-xs rounded-2xl transition-all flex items-center justify-between group mb-1 ${activeCityName === city.name ? 'bg-black/5 dark:bg-white/10 text-adaptive shadow-xl' : 'text-adaptive-muted hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                {city.name}
                              </div>
                              <CheckCircle2 size={14} className={`${activeCityName === city.name ? 'opacity-100' : 'opacity-0'}`} />
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="px-5 py-3 border-t border-black/5 dark:border-white/5 mt-2">
                      <p className="text-[8px] font-black text-center text-adaptive-muted uppercase tracking-widest">
                        Note: You can also change time from the "Time Sync" slider.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 pointer-events-auto order-1 md:order-2">
            <div className="flex gap-4 md:gap-10 text-[9px] font-black tracking-[0.3em] uppercase text-adaptive-muted px-6 md:px-10 py-3 md:py-4 glass-card rounded-full shadow-lg">
              {['about', 'journey', 'projects', 'coding', 'skills'].map((tab) => (
                <a
                  key={tab}
                  href={`#${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`relative hover:text-blue-500 transition-all transform hover:scale-110 ${activeTab === tab ? 'text-adaptive font-black scale-110' : ''}`}
                >
                  {tab === 'coding' ? 'CP' : tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/60 blur-[1px] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setActiveTab('contact')}
                className={`relative hover:text-blue-500 transition-all transform hover:scale-110 ${activeTab === 'contact' ? 'text-adaptive font-black scale-110' : ''}`}
              >
                Connect
                {activeTab === 'contact' && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/60 blur-[1px] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
              <a
                href="https://drive.google.com/file/d/1p4s00DNZJeGCGaexycixrlX5l3SxkTtg/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors font-black flex items-center gap-2"
              >
                Resume <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 md:pt-0">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
          >
            {/* Left Side: Name and Expertise */}
            <div className="flex-1 text-center md:text-left md:mt-24">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <span className="w-12 h-px bg-white/20"></span>
                <p className="text-xs md:text-sm text-adaptive-muted uppercase tracking-[0.8em] font-medium leading-none">Hi There, i am</p>
              </div>

              <h1 className="text-5xl md:text-[8rem] font-extrabold font-outfit leading-[0.85] tracking-tighter mb-12 uppercase relative">
                <span className="block text-adaptive mb-2">AKSHAY KUMAR</span>
                <span className={`italic block tracking-[-0.04em] drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] bg-gradient-to-br ${isDay && type !== 'rain' ? 'from-slate-900 via-slate-800 to-blue-600' : 'from-white via-white to-blue-200/50'} bg-clip-text text-transparent`}>
                  Kotarya.
                </span>
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
              </h1>

              {/* Expertise focus (Relocated here) */}
              <div className="inline-flex flex-col items-center md:items-start glass-card p-8 rounded-3xl group transition-all glass-card-hover border-white/20 mb-8 max-w-md">
                <span className="text-[10px] font-bold tracking-widest text-adaptive-muted uppercase block mb-2">Expertise focus</span>
                <p className="text-lg md:text-xl font-bold text-adaptive uppercase tracking-widest group-hover:text-blue-400 transition-colors leading-tight">
                  Backend engineer who builds, integrates, and ships ML systems end to end from API to frontend to deployment
                </p>
              </div>
            </div>

            {/* Right Side: Profile Image and Socials */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative group">
                {/* Decorative Ring */}
                <div className="absolute -inset-4 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-blue-500/40 transition-colors"></div>
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

                {/* Profile Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
                  <img
                    src="/images/profile.png"
                    alt="Akshay Kumar Kotarya"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akshay';
                    }}
                  />
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-emerald-500 border-4 border-[#0f172a] rounded-full shadow-lg"></div>
              </div>

              {/* Social Handles & Message Icon Below Image */}
              <div className="flex items-center gap-6 mt-12">
                <a href="https://github.com/akshay-kotarya-dev" target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-2xl flex items-center justify-center hover:bg-blue-500/10 transition-all hover:scale-110 text-adaptive shadow-lg group">
                  <Github size={20} className="group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/akshay-kumar-6a4816223/" target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-2xl flex items-center justify-center hover:bg-blue-500/10 transition-all hover:scale-110 text-adaptive shadow-lg group">
                  <Linkedin size={20} className="group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="https://www.skills.google/public_profiles/af90f505-533b-4644-81ef-9c504fc2db04" target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-2xl flex items-center justify-center hover:bg-blue-500/10 transition-all hover:scale-110 text-adaptive shadow-lg group">
                  <Award size={20} className="group-hover:text-amber-400 transition-colors" />
                </a>

                <div className="w-px h-8 bg-white/10 mx-2"></div>

                {/* Message Icon (Mail Draft) */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=akshaykotaryaofficial@gmail.com&su=Let's%20Build%20Something%20Amazing!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass-card rounded-2xl hover:bg-blue-500/10 transition-all hover:scale-105 text-adaptive shadow-lg group border border-blue-500/20"
                >
                  <MessageSquare size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Message</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Biography Section */}
      <section id="about" className="py-40 px-6 lg:px-12 bg-white/[0.08] backdrop-blur-2xl border-y border-black/10 dark:border-white/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-40">
              <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-8 leading-none drop-shadow-md">About Me</h2>
              <p className="text-5xl md:text-7xl font-extrabold font-outfit text-adaptive tracking-tighter leading-none mb-8">The Story <br />Behind Logic.</p>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <p className="text-2xl md:text-3xl text-adaptive-muted font-bold leading-relaxed">
                I build <ScrollHighlight>backend systems</ScrollHighlight> and ML-powered products, and when I'm not coding I'm probably making something with my hands since I've been an <ScrollHighlight>artist</ScrollHighlight> since I was a kid.
              </p>
              <div className="h-px w-full bg-gradient-to-r from-blue-500/30 via-white/20 to-transparent"></div>
              <p className="text-xl text-adaptive-muted font-bold leading-relaxed max-w-2xl">
                My work lives at the intersection of backend engineering and ML where I build the APIs, pipelines and frontends that make intelligent products run reliably in the real world.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="glass-card p-10 rounded-[3rem] border-white/30 bg-white/5 shadow-2xl">
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block mb-4 px-1">Recent Updates</span>
                  <p className="text-lg text-adaptive-muted font-bold leading-relaxed">"Recently completed the Google Cloud Arcade Program, deepened hands-on skills in DevOps, cloud infrastructure, and GCP services."</p>
                </div>
                <div className="glass-card p-10 rounded-[3rem] border-white/30 bg-white/5 shadow-2xl">
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block mb-4 px-1">Current Interest</span>
                  <p className="text-lg text-adaptive-muted font-bold leading-relaxed">"Exploring Generative AI, RAG pipelines, LLM agents, and vector architectures. Building as I learn."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="journey" className="py-40 px-6 lg:px-12 bg-white/[0.04] backdrop-blur-2xl border-y border-black/10 dark:border-white/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-6 leading-none drop-shadow-md">Professional timeline</h2>
              <h3 className="text-4xl md:text-7xl font-extrabold font-outfit text-adaptive tracking-tighter leading-none drop-shadow-sm">Crafting Experience.</h3>
            </div>
          </div>
          <div className="space-y-16">
            {JOURNEY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -left-12 top-10 w-4 h-4 rounded-full border border-blue-400 group-hover:bg-blue-400 transition-all hidden lg:block"></div>
                <div className="glass-card hover:bg-white/[0.12] border border-white/30 p-12 rounded-[3.5rem] transition-all duration-700 glass-card-hover group-hover:px-14 bg-white/5 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform bg-white/5 shadow-lg">
                        <item.icon size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black font-outfit text-adaptive mb-2 tracking-tight">{item.title}</h3>
                        <span className="text-[11px] font-black tracking-[0.2em] text-adaptive-muted uppercase">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-adaptive-muted text-xl font-bold leading-relaxed max-w-3xl mb-8">{item.description}</p>
                  <div className="flex items-center gap-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                    <div className="px-5 py-2 glass-card rounded-full flex items-center gap-3 bg-white/5 border-white/20">
                      <MapPin size={14} className="text-blue-500" /> {item.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 px-6 lg:px-12 bg-white/[0.05] backdrop-blur-2xl border-y border-black/10 dark:border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-6 leading-none drop-shadow-md">Projects</h2>
            <h3 className="text-5xl md:text-[8rem] font-extrabold font-outfit text-adaptive tracking-tighter leading-none drop-shadow-sm">Crafted Logic.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 rounded-[3rem] glass-card-hover flex flex-col items-start gap-8 bg-white/5 border-white/20 shadow-2xl transition-all"
              >
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-blue-400 bg-white/5 shadow-lg">
                  <project.icon size={28} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-adaptive-muted uppercase tracking-[0.2em] mb-4 border-l-2 border-blue-500/50 pl-4">{project.subtitle}</h4>
                  <h3 className="text-3xl font-black font-outfit text-adaptive mb-6 tracking-tight">{project.title}</h3>
                  <p className="text-adaptive-muted text-lg font-bold leading-relaxed mb-8">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black tracking-widest text-blue-500 uppercase bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CP & Leadership Section */}
      <section id="coding" className="py-40 px-6 lg:px-12 bg-white/[0.04] backdrop-blur-2xl border-y border-black/10 dark:border-white/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-6 leading-none drop-shadow-md">Competitive Programming & Position of Responsibility</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {ACHIEVEMENTS.map((achip, i) => (
              <div key={i} className="flex gap-8 items-start p-10 glass-card rounded-[3rem] glass-card-hover transition-all bg-white/5 border-white/20 shadow-2xl">
                <div className="w-20 h-20 shrink-0 glass-card rounded-3xl flex items-center justify-center text-yellow-400 bg-white/5 shadow-lg">
                  <achip.icon size={36} />
                </div>
                <div className="space-y-4">
                  <span className={`text-[11px] font-black tracking-widest uppercase border-l-2 border-blue-500/50 pl-4 ${achip.subtitle.includes('Knight') || achip.subtitle.includes('Team Management') ? 'text-white drop-shadow-md opacity-100' : 'text-adaptive-muted'}`}>{achip.subtitle}</span>
                  <h3 className="text-2xl font-black font-outfit text-adaptive leading-tight tracking-tight">{achip.title}</h3>
                  <p className="text-adaptive-muted text-lg font-bold leading-relaxed">{achip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section id="skills" className="py-20 px-6 lg:px-12 bg-white/[0.08] backdrop-blur-2xl border-y border-black/10 dark:border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-6 leading-none drop-shadow-md">Skills</h2>
            <h3 className="text-5xl md:text-[8rem] font-black font-outfit text-adaptive tracking-tighter leading-none drop-shadow-md">What I Work With.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(SKILL_CATEGORIES).map(([cat, skills]) => (
              <div key={cat} className="space-y-6">
                <h4 className="text-[11px] font-black tracking-[0.4em] uppercase text-blue-500 px-6 border-l-2 border-blue-500/30 ml-2">{cat}</h4>
                <div className="space-y-3">
                  {skills.map((s) => (
                    <div key={s.name} className="flex items-center gap-5 p-6 glass-card rounded-[2.5rem] hover:scale-105 transition-all glass-card-hover cursor-default border-white/30 bg-white/5 shadow-lg">
                      <s.icon size={20} className={`${s.color} opacity-100 shadow-sm`} />
                      <span className="text-xs font-black text-adaptive tracking-widest uppercase">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Ideas Section (Relocated here after Skills) */}
      <section id="contact" className="py-40 px-6 lg:px-12 bg-white/[0.08] backdrop-blur-2xl border-t border-white/10 dark:border-white/20">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 md:p-20 rounded-[4rem] relative overflow-hidden bg-white/5 border-white/30 shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none scale-50 transition-all duration-1000">
              <MessageSquare size={160} className="text-blue-500/60" />
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-black tracking-[0.6em] uppercase text-blue-500 mb-6 leading-none drop-shadow-md">Let's Connect</h2>
                  <h3 className="text-4xl md:text-7xl font-black font-outfit text-adaptive tracking-tighter leading-none drop-shadow-sm">Got Something to Build?</h3>
                </div>
                <p className="text-xl text-adaptive-muted font-bold leading-relaxed">
                  Whether you're hiring, collaborating on something interesting or just want to talk backend and ML, my inbox is always open.
                </p>

              </div>

              <div className="space-y-6">
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell me about your thoughts..."
                  className="w-full h-48 bg-black/5 dark:bg-white/5 border border-white/10 rounded-[2rem] p-8 text-adaptive focus:outline-none focus:border-blue-500/50 transition-all resize-none font-bold"
                />
                <button
                  disabled={!formMessage || isSent}
                  onClick={async () => {
                    setIsSending(true);
                    try {
                      await emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                        { message: formMessage },
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                      );
                      setIsSent(true);
                      setFormMessage('');
                    } catch (error) {
                      console.error('Failed to send message:', error);
                      alert('Failed to send message. Please try again later.');
                    } finally {
                      setIsSending(false);
                    }
                  }}
                  className="w-full bg-blue-500 text-white py-6 rounded-full font-black tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl"
                >
                  {isSent ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Ideas Received</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>{isSending ? 'Transmitting...' : 'Send Message'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          {/* Career & Crafted Versions Section */}
          <div className="py-12 border-t border-white/5 space-y-12">
            {/* Section 1: Currently Open To */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">Currently Open To</h2>
              <p className="text-xs font-black tracking-widest uppercase text-adaptive-muted">
                Backend Engineer • Full Stack Engineer • ML Engineer
              </p>
            </div>

            <div className="h-px w-full bg-white/5"></div>

            {/* Section 2: Crafted For */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">Crafted For</h2>
                <p className="text-[10px] font-black tracking-widest uppercase text-adaptive-muted opacity-60">
                  Company-specific portfolio experiences
                </p>
              </div>
              <div className="flex flex-col items-end gap-4 text-right">
                <div className="flex items-center gap-6">
                  <a href="/google" className="text-xs font-black tracking-widest uppercase text-adaptive-muted hover:text-blue-400 transition-colors">
                    [Google]
                  </a>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase text-adaptive-muted opacity-40 italic">
                  More coming soon...
                </span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[10px] font-black text-adaptive-muted tracking-[0.4em] uppercase">© 2026 AKSHAY KUMAR KOTARYA • STABLE v3.5.0</span>
            <div className="flex items-center gap-6">
              <p className="text-xs font-black text-adaptive tracking-widest uppercase italic flex items-center gap-2">
                Made with <Heart size={14} className="inline fill-red-500 text-red-500" /> by AKSHAY
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}