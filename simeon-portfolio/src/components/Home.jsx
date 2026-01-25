import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import TechTicker from './TechTicker';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Robot from './Robot';
import ChatModal from './ChatModal';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showHeroRobot, setShowHeroRobot] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Logic: If user scrolled past Hero (heuristic value)
            if (window.scrollY > 450) {
                setShowHeroRobot(false);
            } else {
                setShowHeroRobot(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <main className="relative z-10">
                <Hero showRobot={showHeroRobot} onChatOpen={() => setIsChatOpen(true)} />
                <TechTicker />
                <Projects />
                <About />
                <Contact />
            </main>

            {/* Persistent Robot (Fixed Position) */}
            <AnimatePresence>
                {!showHeroRobot && (
                    <motion.div
                        layoutId="robot-mascot"
                        className="fixed bottom-6 right-6 z-40"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <Robot
                            onClick={() => setIsChatOpen(true)}
                            className="scale-75 origin-bottom-right"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default Home;
