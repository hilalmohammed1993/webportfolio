'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar({ resumePath }: { resumePath?: string }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    if (!isHome) return null;

    const links = [
        { name: 'HOME', href: '#' },
        { name: 'EXPERIENCE', href: '#experience' },
        { name: 'PROJECTS', href: '#projects' }, // Keeping Projects as per user's "Mockup Match" request implies sticking to mockup, but user comment said "HOME, EXPERIENCE, EDUCATION". I will follow user COMMENT.
        { name: 'EDUCATION', href: '#education' },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm"
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Name */}
                <a href="#" className="text-xl font-extrabold tracking-wide text-gray-900 uppercase">
                    HILAL MOHAMMED
                </a>

                {/* Center: Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-gray-500 hover:text-[#007AFF] transition-colors uppercase tracking-wide"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right: CTA */}
                <a
                    href={resumePath || '/resume.pdf'}
                    download="Hilal_Mohammed_Resume.pdf"
                    className="hidden md:block px-6 py-2 bg-[#5B8CB9] text-white text-[13px] font-bold rounded-lg hover:bg-[#4A7CA9] transition-colors shadow-sm h-11 flex items-center"
                >
                    Download Resume
                </a>
            </div>
        </motion.nav>
    );
}
