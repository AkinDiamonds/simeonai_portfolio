import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ArrowRight } from 'lucide-react';
import Robot from './Robot';

const Hero = ({ showRobot, onChatOpen }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 px-6 overflow-hidden">

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-green text-sm font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            Available for new projects
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Simeon <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-600">
              Akinrinola
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-mono text-gray-300">
            Full Stack Developer & AI Engineer
          </h2>

          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            Specializing in building intelligent, scalable applications.
            I bridge the gap between complex machine learning models and intuitive user interfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onChatOpen}
              className="group relative px-6 py-3 bg-accent-green/10 border border-accent-green/50 text-accent-green rounded-lg font-mono font-medium overflow-hidden transition-all hover:bg-accent-green/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent-green/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="flex items-center justify-center gap-2">
                Talk to Nexus <Terminal size={18} />
              </span>
            </button>

            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 border border-white/20 text-white rounded-lg font-mono font-medium hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center gap-2"
            >
              Download Resume <Download size={18} />
            </a>
          </div>
        </motion.div>

        {/* Robot / Visual Area */}
        <div className="order-1 lg:order-2 flex justify-center items-center relative min-h-[300px]">
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {showRobot ? (
              <motion.div layoutId="robot-mascot" className="relative group/robot">
                {/* Chat Bubble Tooltip */}
                <div className="absolute -top-16 -right-16 md:-right-24 bg-white/10 backdrop-blur-md border border-accent-green/30 p-3 rounded-lg max-w-[150px] text-xs text-white font-mono opacity-0 group-hover/robot:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  "I am Nexus, a RAG-powered assistant. Ask me questions about The Boss."
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-white/10 border-b border-l border-accent-green/30 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
                </div>

                <Robot onClick={onChatOpen} className="scale-150" />
                <p className="mt-4 font-mono text-sm text-accent-green opacity-60">Nexus.status = "ONLINE"</p>
              </motion.div>
            ) : (
              <div className="w-32 h-32 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
