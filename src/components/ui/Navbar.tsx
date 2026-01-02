'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Only show nav on home page or admin (though admin has its own layout usually)
    // For now assuming this is the public nav.
    if (!isHome) return null;

    const links = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
        >
            <div className="glass pointer-events-auto px-2 py-2 rounded-full flex items-center justify-between gap-2 shadow-lg shadow-black/5 bg-white/70 backdrop-blur-xl border border-white/20 max-w-fit mx-auto">
                {/* Logo / Name */}
                <a href="#" className="px-6 py-2 font-bold text-lg tracking-tight text-[#1C1C1C] hover:text-[#007AFF] transition-colors">
                    HM
                </a>

                {/* Divider */}
                <div className="w-[1px] h-6 bg-gray-300/50" />

                {/* Links */}
                <div className="flex items-center gap-1 pr-2">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-200/50 hover:text-black transition-all duration-300 ease-out"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
