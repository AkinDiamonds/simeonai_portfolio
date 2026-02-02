import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Robot from './Robot';

const SUGGESTIONS = [
    "What are your technical skills?",
    "Show me the simeon-portfolio project",
    "Tell me about your experience",
    "Do you have a demo video for ai_chatbot?",
    "What is your contact info?"
];

const ChatModal = ({ isOpen, onClose }) => {
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Initial State
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: "Systems online. initialising_intro_sequence()...\n\nHello! I'm **Nexus**, Akin's AI Assistant. Ask me anything about his projects, skills, or experience."
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false); // Track if currently generating
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    // Focus input on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setFilteredSuggestions(SUGGESTIONS);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, isStreaming]);

    // Filter suggestions
    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredSuggestions(SUGGESTIONS);
        } else {
            const filtered = SUGGESTIONS.filter(s =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        }
    }, [inputValue]);

    const handleSend = async (text = inputValue) => {
        if (!text.trim() || isStreaming) return; // Prevent double send

        const userMsg = text;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue("");
        setIsTyping(true);
        setIsStreaming(true);
        setFilteredSuggestions([]);

        try {
            const response = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMsg }),
            });

            if (!response.ok) throw new Error('Failed to connect to AI service');

            // Initialize empty assistant message
            setMessages(prev => [...prev, { role: 'assistant', text: "" }]);
            setIsTyping(false); // Remove "processing..." loader, start streaming text

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // Update the last message with the new chunk
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsgIndex = newMessages.length - 1;
                    newMessages[lastMsgIndex] = {
                        ...newMessages[lastMsgIndex],
                        text: newMessages[lastMsgIndex].text + chunk
                    };
                    return newMessages;
                });
            }

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "⚠️ **ERROR:** Connection to neural link failed. Please ensure the backend server is running."
            }]);
            setIsTyping(false);
        } finally {
            setIsStreaming(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        handleSend(suggestion);
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
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-2xl h-[650px] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-accent-green/20">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                                    <span className="text-sm font-mono text-gray-300">Nexus AI v2.0</span>
                                </div>
                                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md transition-colors">
                                    <X size={16} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm scrollbar-brand bg-black/40">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                        {/* Avatar Icons */}
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-white/10' : 'bg-accent-green/10 border border-accent-green/20'
                                            }`}>
                                            {msg.role === 'user' ? (
                                                <User size={14} className="text-white" />
                                            ) : (
                                                <div className="scale-[0.4] origin-center -mb-2">
                                                    <Robot />
                                                </div>
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div className={`max-w-[85%] p-3 rounded-lg border transition-all ${msg.role === 'user'
                                            ? 'bg-white/5 border-white/10 text-gray-100'
                                            : 'bg-accent-green/5 border-accent-green/20 text-gray-200 shadow-[0_0_15px_rgba(0,255,65,0.05)]'
                                            }`}>
                                            {/* RENDER MARKDOWN PROPERLY */}
                                            <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/5">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        // Brand-themed headings
                                                        h1: ({ node, ...props }) => <h1 {...props} className="text-accent-green font-bold text-lg mb-2 mt-4" />,
                                                        h2: ({ node, ...props }) => <h2 {...props} className="text-accent-green font-semibold text-md mb-2 mt-3" />,
                                                        h3: ({ node, ...props }) => <h3 {...props} className="text-accent-green/90 font-medium text-sm mb-1 mt-2" />,
                                                        // Style links to look like terminal commands
                                                        a: ({ node, ...props }) => <a {...props} className="text-accent-green hover:underline cursor-pointer font-bold" target="_blank" rel="noopener noreferrer" />,
                                                        // Style code blocks
                                                        code: ({ node, inline, className, children, ...props }) => {
                                                            const content = String(children);
                                                            const isCommand = content.trim().startsWith('$');

                                                            if (isCommand && !inline) {
                                                                return (
                                                                    <div className="my-2 bg-black/80 border border-accent-green/30 rounded px-3 py-2 font-mono text-xs shadow-[0_0_10px_rgba(0,255,65,0.1)]">
                                                                        <div className="flex items-center gap-2 mb-1 border-b border-white/5 pb-1 opacity-50">
                                                                            <Terminal size={10} className="text-accent-green" />
                                                                            <span className="text-[10px]">EXECUTIVE_SHELL</span>
                                                                        </div>
                                                                        <div className="text-accent-green">
                                                                            <span className="mr-2 opacity-50">$</span>
                                                                            {content.trim().substring(1).trim()}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            return inline ? (
                                                                <code className="bg-white/10 px-1 py-0.5 rounded text-accent-green text-xs" {...props}>{children}</code>
                                                            ) : (
                                                                <code className="block bg-[#050505] p-3 rounded border border-white/10 text-xs overflow-x-auto my-3 text-gray-300" {...props}>{children}</code>
                                                            )
                                                        }
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            </div>

                                            {/* Blinking Cursor for latest AI message while streaming */}
                                            {msg.role === 'assistant' && idx === messages.length - 1 && isStreaming && (
                                                <span className="inline-block w-2 h-4 bg-accent-green animate-pulse ml-1 align-middle"></span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-center gap-2 text-gray-500 text-xs ml-12">
                                        <Loader2 size={12} className="animate-spin" />
                                        <span>Nexus is thinking...</span>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggestions & Input Area */}
                            <div className="bg-[#111] border-t border-white/5 flex flex-col p-2">
                                {/* Auto-Suggestions */}
                                {filteredSuggestions.length > 0 && !isStreaming && (
                                    <div className="px-2 py-2 flex gap-2 overflow-x-auto scrollbar-hide mb-2">
                                        {filteredSuggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="whitespace-nowrap px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-400 hover:text-accent-green hover:border-accent-green/50 transition-colors"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Input */}
                                <div className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-lg px-3 py-2 focus-within:border-accent-green/50 transition-colors">
                                    <Terminal size={16} className="text-gray-500" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask Nexus about projects..."
                                        className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-gray-600 text-sm"
                                        autoComplete="off"
                                        disabled={isStreaming}
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!inputValue.trim() || isStreaming}
                                        className="p-2 text-gray-400 hover:text-accent-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={16} />
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