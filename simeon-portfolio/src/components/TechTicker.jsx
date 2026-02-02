import React from 'react';
import { motion } from 'framer-motion';
import {
    SiReact, SiPython, SiPytorch, SiTensorflow, SiTypescript,
    SiNodedotjs, SiNextdotjs, SiDocker, SiKubernetes, SiAmazon,
    SiTailwindcss, SiPostgresql, SiMongodb, SiGit
} from 'react-icons/si';

const techs = [
    { name: 'React', icon: SiReact },
    { name: 'Python', icon: SiPython },
    { name: 'PyTorch', icon: SiPytorch },
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Docker', icon: SiDocker },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'AWS', icon: SiAmazon },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Git', icon: SiGit },
];

const TechTicker = () => {
    return (
        <div className="relative w-full py-10 overflow-hidden bg-page border-y border-white/5">
            {/* Fade masks - narrower on mobile */}
            <div className="absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-page to-transparent" />
            <div className="absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-page to-transparent" />

            <div className="flex">
                <motion.div
                    className="flex gap-16 min-w-full pr-16"
                    animate={{ x: '-50%' }}
                    transition={{
                        duration: 45,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...techs, ...techs].map((tech, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2 group cursor-default">
                            <tech.icon
                                className="text-4xl text-gray-600 transition-all duration-300 group-hover:text-accent-green group-hover:scale-110"
                            />
                            <span className="text-xs font-mono text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechTicker;
