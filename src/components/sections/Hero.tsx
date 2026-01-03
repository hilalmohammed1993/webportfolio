'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero({ profile }: { profile: any }) {
    const [cacheBuster, setCacheBuster] = React.useState('');

    React.useEffect(() => {
        setCacheBuster(`?v=${Date.now()}`);
    }, []);

    return (
        <section id="about" className="min-h-[50vh] flex items-center pt-12 pb-12 relative overflow-hidden">
            {/* Background Glow */}
            {/* Container */}
            <div className="container mx-auto px-6 py-6 md:py-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

                    {/* Left Side: Circular Headshot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0"
                    >
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src="assets/word_cloud.png"
                                alt="Profile"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Text Content */}
                    <div className="flex-grow w-full md:w-auto text-center md:text-left pt-4 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#007AFF] max-w-full overflow-hidden break-words"
                            dangerouslySetInnerHTML={{ __html: profile?.summary || '<h1>Product Manager</h1><p>Welcome to my portfolio.</p>' }}
                        />

                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center md:justify-start gap-3 mt-8"
                        >
                            <a
                                href="https://linkedin.com/in/hilalmohammed1993"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-[#0077B5] hover:border-[#0077B5] hover:bg-blue-50 transition-all"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/hilalmohammed1993"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition-all"
                            >
                                <Github size={20} />
                            </a>
                            {profile?.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all"
                                >
                                    <Mail size={20} />
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
