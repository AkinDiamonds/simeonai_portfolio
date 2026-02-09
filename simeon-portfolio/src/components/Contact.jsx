import React, { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        alert('Message sent! Nexus has logged your request.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold"><span className="text-accent-green">./</span> contact</h2>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white">Let Me Help You Build Something Intelligent</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Do you need an AI-powered application, a full-stack renovation, or just want to talk about GenAI, I'm open for _________.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/5 rounded-lg text-accent-green">
                                    <Mail size={20} />
                                </div>
                                <span>simeonakinrinola7@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/5 rounded-lg text-accent-green">
                                    <MapPin size={20} />
                                </div>
                                <span>Lagos, Nigeria (Remote Worldwide)</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0f0f0f] p-8 rounded-xl border border-white/10">
                        <div>
                            <label className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Chika Ayinla Musa"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project/offer..."
                                rows="4"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 transition-all resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-accent-green text-black font-bold rounded-lg hover:bg-emerald-400 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-accent-green/50"
                        >
                            <Send size={18} />
                            Send Message
                        </button>

                        <p className="text-center text-xs font-mono text-gray-500 mt-4">
                            * Nexus also monitors this inbox.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
