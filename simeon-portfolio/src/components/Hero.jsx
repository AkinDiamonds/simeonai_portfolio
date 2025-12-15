import React, { useState } from "react";
import { FaReact, FaHtml5, FaJs, FaCss3Alt, FaPaperPlane, FaRobot } from "react-icons/fa";
import { SiTailwindcss, SiOpenai } from "react-icons/si";
import { IoClose } from "react-icons/io5";

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

        {/* AI Chat Interface */}
        <div className="w-full max-w-2xl mx-auto relative group">
          <form onSubmit={handleSearch} className="relative z-20">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-support/70">
                <FaRobot size={24} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask my AI assistant anything about me..."
                className="w-full pl-14 pr-14 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-support/50 focus:bg-white/15 transition-all shadow-xl text-lg"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 p-2 bg-support text-accent-black rounded-xl hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </form>

          {/* Expandable Response Panel */}
          <div
            className={`
                    absolute left-0 right-0 top-full mt-4 
                    bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl 
                    overflow-hidden transition-all duration-500 ease-out origin-top shadow-2xl z-10
                    ${showPanel ? 'opacity-100 max-h-[500px] visible' : 'opacity-0 max-h-0 invisible'}
                `}
          >
            <div className="p-6 text-left relative">
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <IoClose size={24} />
              </button>

              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-support to-purple-600 rounded-lg">
                  <SiOpenai className="text-white text-xl" />
                </div>
                <h3 className="text-support font-bold text-lg mt-1">Simeon's AI Assistant</h3>
              </div>

              <div className="mt-4 text-gray-200 leading-relaxed max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex items-center gap-2 text-white/50">
                    <div className="w-2 h-2 bg-support rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-support rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-support rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="ml-2">Thinking...</span>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {response?.answer || "No response generated."}
                  </div>
                )}
                {/* Source citations could go here if needed */}
                {response?.sources && response.sources.length > 0 && !loading && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
                    Sources: {response.sources.map(s => s.name).join(", ")}
                  </div>
                )}
              </div>
            </div>
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
