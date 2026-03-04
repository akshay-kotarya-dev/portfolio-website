'use client';

import { Search, Grid, Mic, MoreVertical, Share2, Globe, Award, Briefcase, GraduationCap, Code2, Cloud, MessageSquare, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function GooglePage() {
    const [searchQuery] = useState("Akshay Kumar Kotarya");
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        { name: 'All', icon: <Search size={16} /> },
        { name: 'Journey', icon: <Briefcase size={16} /> },
        { name: 'Projects', icon: <Code2 size={16} /> },
        { name: 'Skills', icon: <Globe size={16} /> },
        { name: 'CP and POR', icon: <Award size={16} /> }
    ];

    return (
        <div className="min-h-screen bg-white text-[#202124] flex flex-col font-sans">
            {/* 1. Header/Navigation */}
            <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
                <div className="flex items-center justify-between p-4 md:px-8">
                    <div className="flex items-center gap-4 md:gap-8 flex-1">
                        <Link href="/">
                            <div className="text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer flex-shrink-0">
                                <span className="text-[#4285F4]">G</span>
                                <span className="text-[#EA4335]">o</span>
                                <span className="text-[#FBBC05]">o</span>
                                <span className="text-[#4285F4]">g</span>
                                <span className="text-[#34A853]">l</span>
                                <span className="text-[#EA4335]">e</span>
                            </div>
                        </Link>

                        <div className="hidden md:flex flex-1 max-w-2xl items-center bg-white border border-gray-200 rounded-full py-2.5 px-6 shadow-sm hover:shadow-md transition-shadow">
                            <input
                                type="text"
                                readOnly
                                value={searchQuery}
                                className="flex-1 outline-none text-[15px] bg-transparent font-medium"
                            />
                            <div className="flex items-center gap-3 border-l pl-3 border-gray-200">
                                <Mic size={18} className="text-[#4285F4]" />
                                <Search size={18} className="text-[#4285F4]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="hidden sm:inline-block hover:underline cursor-pointer">Gmail</span>
                        <span className="hidden sm:inline-block hover:underline cursor-pointer">Images</span>
                        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"><Grid size={20} className="text-[#5f6368]" /></div>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-lg">A</div>
                    </div>
                </div>

                {/* Search Tabs */}
                <div className="flex items-center gap-4 md:gap-8 px-4 md:px-[180px] text-sm text-[#5f6368] overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {tabs.map((tab) => (
                        <div
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`py-3 flex items-center gap-1 cursor-pointer transition-all border-b-[3px] ${activeTab === tab.name
                                ? "border-[#1a73e8] text-[#1a73e8] font-medium"
                                : "border-transparent hover:text-[#1a73e8]"
                                }`}
                        >
                            {tab.icon} {tab.name}
                        </div>
                    ))}
                    <div className="py-3 flex items-center gap-1 hover:text-[#1a73e8] cursor-pointer transition-colors">
                        <MoreVertical size={16} /> More
                    </div>
                </div>
            </header>

            {/* 2. Main Content */}
            <main className="mt-[130px] px-4 md:px-[180px] flex flex-col lg:flex-row gap-12 max-w-[1400px]">
                <div className="flex-1 max-w-[652px]">
                    <p className="text-sm text-[#70757a] mb-6">About 1 result (0.34 seconds)</p>

                    {/* Main Result: Bio/Story - Only show on 'All' */}
                    {activeTab === 'All' && (
                        <article className="mb-10 group">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">AK</div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-[#202124]">portfolio-2026.vercel.app</span>
                                    <span className="text-xs text-[#70757a] flex items-center gap-1">https://akshay.kotarya.dev › core <ChevronDown size={12} /></span>
                                </div>
                            </div>
                            <Link href="/">
                                <h3 className="text-2xl text-[#1a0dab] group-hover:underline cursor-pointer mb-2 font-medium leading-tight">
                                    Akshay Kumar Kotarya - Backend Engineer & ML Integration
                                </h3>
                            </Link>
                            <p className="text-[#4d5156] text-sm leading-6 mb-4">
                                <span className="font-bold text-gray-600 block mb-1 uppercase tracking-wider text-[11px]">The Story Behind Logic.</span>
                                I build backend systems and ML-powered products. When I&apos;m not coding I&apos;m probably making something with my hands since I&apos;ve been an artist since I was a kid. My work lives at the intersection of backend engineering and ML where I build APIs, pipelines and frontends that make intelligent products run reliably in the real world.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-black tracking-widest text-[#1a73e8] uppercase block mb-1">Recent Updates</span>
                                    <p className="text-xs text-[#4d5156] font-medium leading-relaxed italic">&quot;Recently completed the Google Cloud Arcade Program, deepened hands-on skills in DevOps, cloud infrastructure, and GCP services.&quot;</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-black tracking-widest text-[#1a73e8] uppercase block mb-1">Current Interest</span>
                                    <p className="text-xs text-[#4d5156] font-medium leading-relaxed italic">&quot;Exploring Generative AI, RAG pipelines, LLM agents, and vector architectures. Building as I learn.&quot;</p>
                                </div>
                            </div>

                            {/* Sitelinks */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 ml-2">
                                <div className="group/item">
                                    <Link href="/#journey" className="text-[#1a0dab] group-hover/item:underline font-medium">Professional Timeline</Link>
                                    <p className="text-xs text-[#7d8085] mt-1">Associate Software Engineer @ Amalgamist (Jun 2025 - Present).</p>
                                </div>
                                <div className="group/item">
                                    <Link href="/#projects" className="text-[#1a0dab] group-hover/item:underline font-medium">Crafted Logic (Projects)</Link>
                                    <p className="text-xs text-[#7d8085] mt-1">Mechanical Assistant, SpeechSync AI, and SkillNode portal.</p>
                                </div>
                                <div className="group/item">
                                    <Link href="/#skills" className="text-[#1a0dab] group-hover/item:underline font-medium">What I Work With (Skills)</Link>
                                    <p className="text-xs text-[#7d8085] mt-1">Python, Fast API, Node.js, GCP, Docker, Kubernetes, and LLM Ops.</p>
                                </div>
                                <div className="group/item">
                                    <Link href="/#contact" className="text-[#1a0dab] group-hover/item:underline font-medium">Got Something to Build?</Link>
                                    <p className="text-xs text-[#7d8085] mt-1">Direct inquiries for Backend, Full Stack or ML Engineering roles.</p>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Timeline Results */}
                    {(activeTab === 'All' || activeTab === 'Journey') && (
                        <article className="mb-10">
                            <h3 className="text-xl text-[#202124] font-medium mb-4 flex items-center gap-2">
                                <Briefcase size={20} className="text-[#1a73e8]" /> Professional Journey
                            </h3>
                            <div className="space-y-8">
                                <div className="group">
                                    <span className="text-xs text-[#70757a]">iamalgamist.com › experience</span>
                                    <h4 className="text-lg text-[#1a0dab] group-hover:underline cursor-pointer">Associate Software Engineer @ Amalgamist</h4>
                                    <p className="text-xs text-gray-500 mb-1 italic">Jun 2025 – Present | Noida, India</p>
                                    <p className="text-sm text-[#4d5156] leading-relaxed">
                                        Engineering end-to-end ML intelligence for trading diagnostics. Built 50+ production REST APIs and a 12-module system for 700+ stocks. Improved analysis speed by 98% and trade success by 40%.
                                    </p>
                                </div>
                                <div className="group">
                                    <span className="text-xs text-[#70757a]">iitbhu.ac.in › education</span>
                                    <h4 className="text-lg text-[#1a0dab] group-hover:underline cursor-pointer">Bachelor of Technology @ IIT (BHU), Varanasi</h4>
                                    <p className="text-xs text-gray-500 mb-1 italic">2021 – 2025 | Varanasi, India</p>
                                    <p className="text-sm text-[#4d5156] leading-relaxed">
                                        Mechanical Engineering. CGPA: 7.43/10. Beyond academics, I stayed active in managing events and leading teams in the college community.
                                    </p>
                                </div>
                                <div className="group">
                                    <span className="text-xs text-[#70757a]">jnv.edu.in › schooling</span>
                                    <h4 className="text-lg text-[#1a0dab] group-hover:underline cursor-pointer">Schooling @ Jawahar Navodaya Vidyalaya</h4>
                                    <p className="text-xs text-gray-500 mb-1 italic">2014 – 2021 | India</p>
                                    <p className="text-sm text-[#4d5156] leading-relaxed">
                                        Secured in top 40 position in district within 10,000 students for JNVST exam.
                                    </p>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* CP Snippet */}
                    {(activeTab === 'All' || activeTab === 'CP and POR') && (
                        <article className="mb-10 group bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Award size={20} className="text-amber-500" />
                                <h3 className="text-lg font-bold">Competitive Programming (CP)</h3>
                            </div>
                            <div>
                                <h4 className="text-[#1a0dab] font-medium group-hover:underline cursor-pointer">LeetCode Knight (Rating 1900)</h4>
                                <p className="text-sm text-[#4d5156]">Top 5% globally with 900+ problems solved. Demonstrates excellence in algorithmic problem solving and advanced data structures.</p>
                            </div>
                        </article>
                    )}

                    {/* Management/Leadership result - Position of Responsibility (POR) */}
                    {(activeTab === 'All' || activeTab === 'CP and POR') && (
                        <article className="mb-10 group">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center text-orange-500"><Share2 size={14} /></div>
                                <span className="text-sm text-[#4d5156]">Position of Responsibility (POR)</span>
                            </div>
                            <h3 className="text-xl text-[#1a0dab] group-hover:underline cursor-pointer mb-2">Leadership & Team Management</h3>
                            <p className="text-[#4d5156] text-sm leading-relaxed">
                                Marketing Manager at Spardha (managed team of 20, secured sponsorships) and Induction Mentor (guided 15+ freshmen).
                            </p>
                        </article>
                    )}

                    {/* Projects Result */}
                    {(activeTab === 'All' || activeTab === 'Projects') && (
                        <article className="mb-10">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#70757a] mb-6 flex items-center gap-2">
                                Full Projects Catalog
                            </h3>
                            <div className="space-y-6">
                                <div className="group">
                                    <h4 className="text-[17px] text-[#1a0dab] group-hover:underline cursor-pointer">Mechanical Assistant (Domain-Specific RAG)</h4>
                                    <p className="text-sm text-[#4d5156]">Production-grade RAG for engineering QA using LlamaIndex and Pinecone.</p>
                                </div>
                                <div className="group">
                                    <h4 className="text-[17px] text-[#1a0dab] group-hover:underline cursor-pointer">SpeechSync AI (Voice Conversational Agent)</h4>
                                    <p className="text-sm text-[#4d5156]">Real-time S2S platform achieving &lt;50ms latency with serverless backend.</p>
                                </div>
                                <div className="group">
                                    <h4 className="text-[17px] text-[#1a0dab] group-hover:underline cursor-pointer">SkillNode (Intelligent Job Matching)</h4>
                                    <p className="text-sm text-[#4d5156]">Full-stack portal using Dijkstra and Floyd-Warshall for optimal career paths.</p>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Skills Summary */}
                    {(activeTab === 'All' || activeTab === 'Skills') && (
                        <article className="mb-10">
                            <h3 className="text-sm text-[#70757a] font-normal mb-6 flex items-center gap-2 underline decoration-green-500/20 underline-offset-8 uppercase tracking-widest text-[10px] font-black">
                                <Code2 size={14} className="text-green-500" /> Technical Skills Summary
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                <div>
                                    <h4 className="text-xs font-black text-[#5f6368] uppercase tracking-widest mb-2">Languages</h4>
                                    <p className="text-sm text-[#4d5156]">C/C++, Python, SQL, JavaScript</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-[#5f6368] uppercase tracking-widest mb-2">Backend</h4>
                                    <p className="text-sm text-[#4d5156]">FastAPI, Node.js, Express.js</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-[#5f6368] uppercase tracking-widest mb-2">Frontend</h4>
                                    <p className="text-sm text-[#4d5156]">React.js, Next.js, TypeScript</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-[#5f6368] uppercase tracking-widest mb-2">ML & AI</h4>
                                    <p className="text-sm text-[#4d5156]">LangChain, LlamaIndex, Scikit-learn, pandas, Pinecone</p>
                                </div>
                            </div>
                        </article>
                    )}
                </div>

                {/* 3. Knowledge Panel (Right Pane - Desktop) */}
                <aside className="hidden lg:block w-[368px] flex-shrink-0 border border-gray-200 rounded-lg p-0 overflow-hidden h-fit sticky top-[150px] shadow-sm">
                    <img
                        src="/images/profile.png"
                        alt="Akshay Kumar Kotarya"
                        className="w-full h-auto max-h-[300px] object-cover border-b border-gray-200"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akshay';
                        }}
                    />
                    <div className="p-4 space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-black font-outfit uppercase tracking-tight">Akshay Kumar Kotarya</h2>
                                <Share2 size={18} className="text-[#70757a] cursor-pointer" />
                            </div>
                            <p className="text-sm text-[#70757a] font-medium italic">Backend Engineer | ML Integration</p>
                        </div>

                        <div className="h-px bg-gray-200"></div>

                        <div className="space-y-4 text-[14px]">
                            <p className="leading-snug">
                                <span className="font-bold">Expertise Focus:</span> Backend engineer who builds, integrates, and ships ML systems end to end from API to frontend to deployment.
                            </p>
                            <p className="leading-snug">
                                <span className="font-bold">Education:</span> <a href="#" className="text-[#1a0dab] hover:underline">IIT (BHU), Varanasi</a> (B.Tech 2025)
                            </p>
                            <p className="leading-snug">
                                <span className="font-bold">CP and POR:</span> LeetCode Knight (Rating 1900) & Marketing Manager
                            </p>
                            <p className="leading-snug">
                                <span className="font-bold">Current:</span> Associate Software Engineer @ Amalgamist
                            </p>
                        </div>

                        <div className="h-px bg-gray-200"></div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#1a73e8] mb-4">Core Skills</h3>
                            <div className="flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-wider">
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">Python</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">GCP</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">FastAPI</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">Docker</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">PostgreSQL</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-default">Redis</span>
                            </div>
                        </div>

                        <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=akshaykotaryaofficial@gmail.com&su=Let's%20Build%20Something%20Amazing!" target="_blank">
                            <button className="w-full mt-4 bg-blue-600 text-white rounded-full py-4 font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                                <MessageSquare size={18} /> Message Akshay
                            </button>
                        </Link>
                    </div>
                </aside>
            </main>

            {/* 4. Footer */}
            <footer className="mt-20 bg-[#f8f9fa] border-t border-gray-200 text-[#70757a] text-[13px]">
                <div className="px-4 md:px-[180px] py-4 border-b border-[#dadce0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-blue-500 uppercase tracking-widest flex-shrink-0">Currently Open To</span>
                        <span className="text-xs">Backend Engineer • Full Stack Engineer • ML Engineer</span>
                    </div>
                    <div className="flex italic items-center">
                        Made with&nbsp;<Heart size={14} className="fill-red-500 text-red-500" />&nbsp;by akshay
                    </div>
                </div>
                <div className="px-4 md:px-[180px] py-6 flex flex-wrap justify-between gap-8">
                    <div className="flex flex-wrap gap-8 items-center">
                        <span className="text-xs font-black tracking-widest uppercase text-blue-500">© 2026 Akshay Kumar Kotarya</span>
                        <div className="flex gap-6">
                            <span className="hover:text-[#3c4043] cursor-pointer">Privacy</span>
                            <span className="hover:text-[#3c4043] cursor-pointer">Terms</span>
                            <span className="hover:text-[#3c4043] cursor-pointer">Advertising</span>
                            <span className="hover:text-[#3c4043] cursor-pointer">Business</span>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800;900&display=swap');
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
