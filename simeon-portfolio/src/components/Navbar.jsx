import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const links = ['Home', 'Projects', 'About', 'Blog', 'Contact'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-page/80 backdrop-blur-md">
            {/* Left: Brand */}
            <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-800 rounded-full ring-2 ring-white/10">
                    {/* Placeholder for Avatar */}
                    <img src="https://i.ibb.co/4nPR0kht/IMG-20260119-WA0015.jpg" alt="Simeon Akinrinola" className="w-full h-full object-cover object-top" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white hover:text-accent-green transition-colors duration-300 cursor-pointer">
                    Akin
                </span>
            </Link>

            {/* Right: Links */}
            <ul className="hidden gap-8 md:flex">
                {links.map((link) => {
                    const isPage = link === 'Blog';
                    const href = isPage ? '/blog' : `/#${link.toLowerCase()}`;

                    return (
                        <li key={link}>
                            <a
                                href={href}
                                className="relative text-sm font-medium text-gray-400 font-mono transition-colors duration-300 hover:text-accent-green group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-green transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile Menu Icon (Placeholder) */}
            <button className="md:hidden text-white/70 hover:text-accent-green">
                Menu
            </button>
        </nav>
    );
};

export default Navbar;
