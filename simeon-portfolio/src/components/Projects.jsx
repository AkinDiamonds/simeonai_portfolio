import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ className, title, desc, tags, githubUrl, externalUrl }) => {
    return (
        <div
            className={`relative group overflow-hidden rounded-xl border border-white/10 p-6 flex flex-col justify-end transition-all hover:scale-[1.02] ${className}`}
        >
            {/* Dark Overlay: More subtle change on hover */}
            <div className="absolute inset-0 bg-black/80 group-hover:bg-black/90 transition-colors duration-300" />

            {/* Content: Z-Index ensures it sits on top */}
            <div className="relative z-10 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-green transition-colors">{title}</h3>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-accent-green/20 hover:text-accent-green transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {externalUrl && (
                            <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-accent-green/20 hover:text-accent-green transition-colors">
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed h-16 overflow-hidden">
                    {desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono text-accent-green bg-accent-green/10 px-2 py-1 rounded border border-accent-green/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

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
                        githubUrl="https://github.com/AkinDiamonds/touristai.git"
                        externalUrl="https://drive.google.com/file/d/1R0LHZbzEqW3W4zS-svARdv2gNcbKT-vM/view?usp=drive_link"
                    />

                    {/* Secondary 1 */}
                    <ProjectCard
                        className="md:col-span-1 md:row-span-1 bg-[url('https://i.ibb.co/84nxGcXc/Taxgpt.png')] bg-cover bg-center"
                        title="TaxGPT"
                        desc="RAG-powered tax assistant for Nigerian 2025 tax laws."
                        tags={['OpenAI', 'FastAPI', 'LangChain', 'React']}
                        githubUrl="https://github.com/KudoroEsther/Tax_Project.git"

                    />

                    {/* Secondary 2 */}
                    <ProjectCard
                        className="md:col-span-1 md:row-span-1 bg-[url('https://i.ibb.co/m5HY5Jgb/smart-portfolio.png')] bg-cover bg-top bg-no-repeat bg-center bg-[#0a0a0a]"
                        title="Smart Portfolio"
                        desc="The website you are currently viewing. High-performance, agentic-designed."
                        tags={['Vite', 'Tailwind', 'Framer', 'LangGraph']}
                        githubUrl="https://github.com/AkinDiamonds/simeonai_portfolio.git"
                        externalUrl="#"
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
