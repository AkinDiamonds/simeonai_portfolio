import React, { useState } from "react";
import { FaReact, FaHtml5, FaJs, FaCss3Alt, FaRobot } from "react-icons/fa";
import { SiTailwindcss, SiOpenai } from "react-icons/si";
import { IoClose, IoSend } from "react-icons/io5";

export default function Hero({ scrollToWorks }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setShowPanel(true);
    setResponse(null); // Clear previous response while loading

    try {
      // Assuming backend is running on default port 8000
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse({ answer: "I apologize, but I'm having trouble connecting to my brain right now. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const closePanel = () => {
    setShowPanel(false);
    setQuery("");
    setResponse(null);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 text-accent-white overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient */}
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(135deg, #4B46FF, #0D0D0E)",
          }}
        />

        {/* Abstract floating circles / shapes */}
        <div className="absolute w-72 h-72 bg-major opacity-20 rounded-full top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 bg-support opacity-15 rounded-full bottom-20 right-16 animate-pulse-slow"></div>

        {/* Tech icons in background */}
        <FaReact className="absolute top-24 left-1/4 text-support text-6xl opacity-10 animate-pulse-slow" />
        <FaJs className="absolute top-40 right-1/3 text-support text-6xl opacity-10" />
        <FaHtml5 className="absolute bottom-32 left-1/3 text-support text-6xl opacity-10" />
        <SiTailwindcss className="absolute bottom-24 right-1/4 text-support text-6xl opacity-10" />
      </div>

      {/* Hero Text */}
      <div className={`relative z-10 text-center transition-all duration-500 ${showPanel ? '-mt-10' : '-mb-10'}`}>
        <h1 className="text-5xl md:text-6xl font-bold font-display drop-shadow-lg text-support mb-4">
          Simeon Akinrinola
        </h1>
        <p className="text-xl md:text-2xl drop-shadow-md text-accent-white mb-8">
          High-end Frontend Developer. Interfaces crafted with intent.
        </p>

        {/* AI Chat Interface - Redesigned Layout */}
        <div className="w-full relative z-20 flex flex-col items-center">

          {/* 1. LARGE INPUT with META STYLE SEND BUTTON */}
          <form
            onSubmit={handleSearch}
            className={`
              relative transition-all duration-500 ease-out z-30
              ${showPanel ? 'w-full max-w-xl' : 'w-full max-w-2xl hover:max-w-3xl'}
            `}
          >
            <div className={`
              relative flex items-center bg-black/30 backdrop-blur-md border border-white/10 
              rounded-full shadow-2xl transition-all duration-300
              ${loading ? 'border-support/50 shadow-support/10' : 'hover:border-white/20 hover:bg-black/40'}
            `}>
              {/* Robot Icon */}
              <div className="pl-6 pr-4 text-support/80">
                <FaRobot size={24} />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about my skills, projects, or background..."
                className="w-full py-5 bg-transparent text-white placeholder-white/40 focus:outline-none text-lg font-medium tracking-wide"
              />

              {/* Send Button - FITTED & COMPACT */}
              <div className="pr-2">
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-md
                    ${query.trim() && !loading
                      ? 'bg-support text-black scale-100 cursor-pointer hover:bg-white'
                      : 'bg-white/10 text-white/20 scale-90 cursor-not-allowed'}
                  `}
                >
                  <IoSend size={18} className={query.trim() ? "ml-0.5" : ""} />
                </button>
              </div>
            </div>
          </form>

          {/* 2. SPACIOUS & WIDE OUTPUT PANEL */}
          {/* This breaks out of the input's width constraint using fixed/absolute positioning logic relative to the center */}
          <div
            className={`
              absolute top-16 left-1/2 -translate-x-1/2 
              w-[95vw] max-w-4xl
              bg-[#080808]/95 backdrop-blur-3xl border border-white/10 rounded-3xl 
              shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
              overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 origin-top
              ${showPanel ? 'opacity-100 translate-y-2 scale-100 visible' : 'opacity-0 -translate-y-4 scale-95 invisible pointer-events-none'}
            `}
          >
            {/* Elegant Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase font-display">
                  Simeon's AI Assistant v2.0
                </span>
              </div>

              <button
                onClick={closePanel}
                className="group flex items-center gap-2 text-xs font-medium text-white/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <span>CLOSE</span>
                <div className="p-1 rounded-full group-hover:bg-white/10">
                  <IoClose size={16} />
                </div>
              </button>
            </div>

            {/* Massive Content Area */}
            <div className="p-8 md:p-10 text-left min-h-[200px] max-h-[60vh] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 mb-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                    <SiOpenai className="text-2xl text-white/20 animate-pulse" />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="h-2 w-32 bg-white/10 rounded-full animate-pulse mx-auto"></div>
                    <div className="h-2 w-24 bg-white/5 rounded-full animate-pulse mx-auto"></div>
                  </div>
                </div>
              ) : response?.answer ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div
                    className="prose prose-invert prose-lg max-w-none ai-response leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: response.answer }}
                  />

                  {/* Floating Sources Tags */}
                  {response.sources && response.sources.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-dashed border-white/10 flex flex-wrap gap-3">
                      {response.sources.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] sm:text-xs text-white/50 hover:text-white/80 transition-colors uppercase tracking-wider cursor-default">
                          <span className="w-1 h-1 rounded-full bg-support/50 mr-2"></span>
                          {s.section_type.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center opacity-40">
                  <p className="text-sm">Ready to explore.</p>
                </div>
              )}
            </div>

            {/* Subtle Gradient Line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-support/20 to-transparent"></div>
          </div>
        </div>

        <button onClick={scrollToWorks} className="mt-12 px-11 py-3 bg-transparent border-2 border-support rounded-lg text-lg text-support font-body font-bold hover:bg-support hover:text-accent-black cursor-pointer shadow-[0_0_15px_rgba(75,70,255,0.3)] hover:shadow-[0_0_25px_rgba(75,70,255,0.6)] hover:scale-105 transition-all duration-300">
          EXPLORE WORK
        </button>
      </div>


      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 
        bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
    </section>
  );
}
