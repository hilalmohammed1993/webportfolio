'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="glass container mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="text-xl font-bold font-heading premium-gradient-text">
                    HM
                </Link>

                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                    <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
                    <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors">Experience</button>
                    <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Projects</button>
                    <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors">Skills</button>
                </div>


            </div>
        </motion.nav>
    );
}
