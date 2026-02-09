import React from 'react';
import { Cpu, Zap, HardDrive, Activity } from 'lucide-react';

const PROFILE_IMAGE_URL = "https://i.ibb.co/4nPR0kht/IMG-20260119-WA0015.jpg";

const StatRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 font-mono text-sm hover:bg-white/5 px-2 transition-colors rounded">
    <div className="flex items-center gap-3 text-gray-400">
      <Icon size={16} className="text-accent-green" />
      <span>{label}</span>
    </div>
    <span className="text-primary text-right">{value}</span>
  </div>
);

const SkillBar = ({ name, level, color = "bg-accent-green", label }) => (
  <div className="flex flex-col gap-1 mb-3">
    <div className="flex justify-between items-end">
      <span className="font-mono text-xs text-gray-300">{name}</span>
      {label && <span className="font-mono text-[10px] bg-accent-green/20 text-accent-green px-1 rounded">{label}</span>}
    </div>
    <div className="flex gap-0.5 h-2">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`flex-1 rounded-xs transition-all duration-500 ${i < level
              ? `${color} shadow-[0_0_5px_currentColor]`
              : 'bg-white/5'
            }`}
        />
      ))}
    </div>
  </div>
);

const SkillMonitor = () => (
  <div className="mt-8 pt-6 border-t border-white/10">
    <h4 className="font-mono text-sm text-gray-400 mb-6 flex items-center gap-2">
      <Activity size={16} className="text-accent-green" />
      RESOURCE_MONITOR // Tech Stack
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Column 1: Core Engine */}
      <div>
        <h5 className="font-bold text-white text-sm mb-4 border-b border-white/10 pb-2">Core AI Engine</h5>
        <SkillBar name="Python" level={10} label="High Priority" />
        <SkillBar name="LangChain" level={10} />
        <SkillBar name="LangGraph" level={10} />
        <SkillBar name="LlamaIndex" level={10} />
        <SkillBar name="LLMs" level={10} />
      </div>

      {/* Column 2: Web Interface & Infra */}
      <div>
        <h5 className="font-bold text-white text-sm mb-4 border-b border-white/10 pb-2">Frontend Interface</h5>
        <SkillBar name="React (Vite)" level={10} />
        <SkillBar name="TailwindCSS" level={10} />
        <SkillBar name="Vanilla JS" level={10} />

        <h5 className="font-bold text-white text-sm mt-6 mb-4 border-b border-white/10 pb-2">Backend & Infra</h5>
        <SkillBar name="Next.js" level={7} color="bg-accent-green/60" />
        <SkillBar name="Node.js" level={7} color="bg-accent-green/60" />
        <SkillBar name="FastAPI" level={7} color="bg-accent-green/60" />
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold"><span className="text-accent-green">./ about</span></h2>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Image / Visual */}
          <div className="relative group top-0 md:sticky md:top-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-green to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 max-w-sm mx-auto"></div>
            <div className="relative w-full aspect-[4/5] bg-[#0f0f0f] rounded-lg border border-white/10 overflow-hidden flex items-center justify-center max-w-sm mx-auto">
              <img
                src={PROFILE_IMAGE_URL}
                alt="Simeon Akinrinola"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform"
              />

              {/* Overlay Scan Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/5 to-transparent animate-scanline pointer-events-none" />
            </div>
            <div className="mt-4 text-center">
              <p className="font-mono text-xs text-accent-green animate-pulse"> Nexus found: ...jpeg</p>
            </div>
          </div>

          {/* Right: Specs */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs text-gray-500">system_specs.json</span>
            </div>

            <div className="space-y-1">
              <StatRow icon={Cpu} label="Architecture" value="Full Stack AI Engineer" />
              <StatRow icon={Zap} label="Processing Power" value="High-Speed Execution" />
              <StatRow icon={HardDrive} label="Memory" value="Continuous Learning" />
              <StatRow icon={Activity} label="Status" value="Online & Ready" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-gray-400 text-sm leading-relaxed mb-4 space-y-4">
                <p>
                  <span className="text-accent-green font-mono">{'>'}</span> Professional Background initialized.<br />
                  Passionate about building intelligent systems that enhance human capabilities. Experienced in Python, React, and AI Development.
                </p>

                <p>
                  <span className="text-accent-green font-mono">{'>'}</span> I believe in practicing what I preach. That's why I built <span className="text-accent-green font-bold">Nexus</span>—not just as a chatbot, but as a digital pet that runs on my personal knowledge base. While I focus on architecture and strategy, Nexus handles the memory. It's a live demonstration of the RAG systems and Agentic workflows I build for clients.
                </p>
              </div>
            </div>

            <SkillMonitor />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
