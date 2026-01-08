'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export default function Navbar({ resumePath }: { resumePath?: string }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    if (!isHome) return null;

    const links = [
        { name: 'HOME', href: '#' },
        { name: 'EXPERIENCE', href: '#experience' },
        { name: 'PROJECTS', href: '#projects' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'EDUCATION', href: '#education' },
    ];

    const handleResumeDownload = () => {
        trackEvent('resume_download', {
            resume_url: resumePath,
            location: 'navbar',
            timestamp: new Date().toISOString()
        });
    };

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
                    href={resumePath?.startsWith('/') ? resumePath.slice(1) : (resumePath || 'resume.pdf')}
                    download="Hilal_Mohammed_Resume.pdf"
                    onClick={handleResumeDownload}
                    className="hidden md:flex items-center justify-center transition-all hover:opacity-90 active:scale-95"
                    style={{
                        backgroundColor: '#5B8CB9',
                        color: 'white',
                        width: '160px',
                        height: '32px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Download Resume
                </a>
            </div>
        </motion.nav>
    );
}
