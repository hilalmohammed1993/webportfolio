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
        <section id="about" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Container with max-width for neatness */}
            <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">

                    {/* Left Side: Word Cloud Image - Thinner and Optimized */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-[35%] flex justify-center md:justify-start"
                    >
                        {/* Constrain width to prevent it from taking too much space */}
                        <div className="relative w-[280px] md:w-full max-w-[320px] aspect-[3/4] md:aspect-auto md:h-[500px]">
                            <Image
                                src="/assets/word_cloud.png"
                                alt="Product Manager Skills Word Cloud"
                                fill
                                className="object-contain drop-shadow-xl"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Text Content - Wider */}
                    <div className="w-full md:w-[65%] text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#1C1C1C]"
                        >
                            Hi, I am <br />
                            <span className="text-[#007AFF]">Hilal Mohammed</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-normal max-w-3xl prose prose-lg prose-headings:text-[#1C1C1C] prose-p:text-gray-600"
                            dangerouslySetInnerHTML={{ __html: profile?.summary || 'Product Manager & Strategist' }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row items-center gap-4"
                        >
                            <a
                                href={`${profile?.resume_path || '/resume.pdf'}${cacheBuster}`}
                                download="Hilal_Mohammed_Resume.pdf"
                                className="group px-8 py-3 bg-gray-200 text-gray-900 font-bold rounded-xl hover:bg-[#007AFF] hover:text-white transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                            >
                                <Download size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                                Download Resume
                            </a>

                            <div className="flex gap-3">
                                <a href="https://linkedin.com/in/hilalmohammed1993" target="_blank" rel="noopener noreferrer" className="group p-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-[#007AFF] hover:text-white hover:shadow-md transition-all duration-300">
                                    <Linkedin size={22} className="group-hover:stroke-current" />
                                </a>
                                <a href="https://github.com/hilalmohammed1993" target="_blank" rel="noopener noreferrer" className="group p-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-[#007AFF] hover:text-white hover:shadow-md transition-all duration-300">
                                    <Github size={22} className="group-hover:stroke-current" />
                                </a>
                                <a href="mailto:contact@example.com" className="group p-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-[#007AFF] hover:text-white hover:shadow-md transition-all duration-300">
                                    <Mail size={22} className="group-hover:stroke-current" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
