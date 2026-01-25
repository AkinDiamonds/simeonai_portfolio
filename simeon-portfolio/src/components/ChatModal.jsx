import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2 } from 'lucide-react';

const ChatModal = ({ isOpen, onClose }) => {
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Dummy history for now
    const [messages, setMessages] = React.useState([
        { role: 'assistant', text: "Systems online. initialising_intro_sequence()...\nHello! I'm Akin's AI Assistant. Ask me anything about his projects, skills, or experience." }
    ]);
    const [inputValue, setInputValue] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', text: "I am a demo AI for now. Integration pending..." }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-2xl h-[600px] flex flex-col bg-[#0f0f0f] border border-white/10 rounded-lg shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-white/5">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <Terminal size={16} className="text-accent-green" />
                                    <span className="text-sm font-mono text-gray-300">AI Assistant @ Akin_Portfolio ~</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <X size={16} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar bg-page/50">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg border ${msg.role === 'user'
                                                    ? 'bg-white/5 border-white/10 text-primary'
                                                    : 'bg-accent-green/5 border-accent-green/20 text-accent-green'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-2 p-3 text-accent-green/50">
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>processing...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-[#1a1a1a] border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-accent-green font-mono">{'>'}</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a command..."
                                        className="flex-1 bg-transparent border-none outline-none text-primary font-mono placeholder:text-gray-600"
                                        autoComplete="off"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className="p-2 text-gray-400 hover:text-accent-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ChatModal;
