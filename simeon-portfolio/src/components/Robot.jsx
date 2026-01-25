import React from 'react';
import { motion } from 'framer-motion';

const Robot = ({ onClick, className }) => {
    return (
        <motion.button
            onClick={onClick}
            className={`relative flex items-center justify-center group cursor-pointer ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-xl animate-pulse-slow" />

            {/* Robot Head Container */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#0f0f0f] border border-accent-green/30 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-colors group-hover:border-accent-green/60">

                {/* Antenna */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-500">
                    <div className="absolute -top-1.5 -left-1 w-3 h-3 bg-accent-green rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -top-1.5 -left-1 w-3 h-3 bg-accent-green rounded-full"></div>
                </div>

                {/* Screen/Face */}
                <div className="w-[85%] h-[70%] bg-[#050505] rounded-lg border border-white/5 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                    {/* Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/10 to-transparent w-full h-full animate-scanline pointer-events-none" />

                    {/* Eyes */}
                    <div className="flex gap-4">
                        <motion.div
                            initial={{ height: 8 }}
                            animate={{ height: [8, 2, 8] }}
                            transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
                            className="w-8 h-3 bg-accent-green rounded-sm shadow-[0_0_8px_rgba(0,255,65,0.8)]"
                        />
                        <motion.div
                            initial={{ height: 8 }}
                            animate={{ height: [8, 2, 8] }}
                            transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
                            className="w-8 h-3 bg-accent-green rounded-sm shadow-[0_0_8px_rgba(0,255,65,0.8)]"
                        />
                    </div>

                    {/* Mouth (optional, maybe just a line/waveform) */}
                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent-green/50 w-full"
                            animate={{ x: [-20, 20] }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        />
                    </div>
                </div>
            </div>
        </motion.button>
    );
};

export default Robot;
