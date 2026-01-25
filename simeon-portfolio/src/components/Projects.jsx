import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, desc, tags, className, size = "small" }) => (
    <div className={`relative bg-[#0f0f0f] border border-white/10 rounded-xl p-6 hover:border-accent-green/50 transition-colors group overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />

        <div className="relative z-20 h-full flex flex-col justify-end">
            <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-green transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-3">
                    {desc}
                </p>
                <div className="flex gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/5">{tag}</span>
                    ))}
                </div>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Github size={18} /></button>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><ExternalLink size={18} /></button>
                </div>
            </div>
        </div>
    </div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold"><span className="text-accent-green">./</span> projects</h2>
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="hidden md:block text-xs font-mono text-gray-500">Featured Projects. New modules added regularly.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {/* Main Feature */}
                    <ProjectCard
                        className="md:col-span-2 md:row-span-2 bg-[url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80')] bg-cover bg-center"
                        title="TouristAI: RAG Travel Concierge"
                        desc="A context-aware travel assistant for Lagos, Nigeria. The architecture employs a hybrid retrieval strategy: managing structured data in Supabase (PostgreSQL) and unstructured knowledge via FAISS vector stores. Uniquely, the inference pipeline is cost-optimized by tunneling requests to a Natlas LLM hosted on Kaggle via Ngrok, demonstrating distributed inference capabilities."
                        tags={['Python', 'LangChain', 'React', 'Supabase', 'FAISS', 'FastAPI', 'HuggingFace']}
                        size="large"
                    />

                    {/* Secondary 1 */}
                    <ProjectCard
                        className="md:col-span-1 md:row-span-1 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover bg-center"
                        title="Speech Coach AI"
                        desc="Real-time speech analysis tool providing feedback on pace, tone, and clarity."
                        tags={['WebRTC', 'OpenAI', 'FastAPI']}
                    />

                    {/* Secondary 2 */}
                    <ProjectCard
                        className="md:col-span-1 md:row-span-1 bg-[url('https://i.ibb.co/m5HY5Jgb/smart-portfolio.png')] bg-cover bg-top bg-no-repeat bg-center bg-[#0a0a0a]"
                        title="Smart Portfolio"
                        desc="The website you are currently viewing. High-performance, agentic-designed."
                        tags={['Vite', 'Tailwind', 'Framer', 'LangGraph']}
                    />

                </div>

                
                <div className="mt-4">
                    <div className="w-full border border-dashed border-white/10 bg-white/5 rounded-xl p-8 flex items-center justify-center text-center group cursor-wait">
                        <div className="space-y-2 animate-pulse">
                            <h3 className="font-mono text-lg text-gray-400">Initializing Next Project...</h3>
                            <p className="text-xs font-mono text-accent-green">// Work in Progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
