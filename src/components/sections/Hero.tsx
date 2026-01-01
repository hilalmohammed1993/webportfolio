'use client';

import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero({ profile }: { profile: any }) {
    return (
        <section id="about" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Container with max-width for neatness */}
            <div className="container max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">

                    {/* Left Side: Word Cloud Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex justify-center md:justify-start"
                    >
                        <div className="relative w-[350px] md:w-[450px] aspect-square">
                            <Image
                                src="/assets/word_cloud.png"
                                alt="Product Manager Skills Word Cloud"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Text Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900"
                        >
                            Hi, I am <br />
                            <span className="premium-gradient-text">Hilal Mohammed</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light"
                        >
                            {profile?.summary || 'Product Manager & Strategist'}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row items-center gap-4"
                        >
                            <a
                                href="/resume.pdf"
                                download="Hilal_Mohammed_Resume.pdf"
                                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-indigo-500/30"
                            >
                                <Download size={20} />
                                Download Resume
                            </a>

                            <div className="flex gap-4">
                                <a href="https://linkedin.com/in/hilalmohammed1993" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://github.com/hilalmohammed1993" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all">
                                    <Github size={20} />
                                </a>
                                <a href="mailto:contact@example.com" className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
