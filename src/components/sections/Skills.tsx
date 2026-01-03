'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map,
    Brain,
    LineChart,
    Settings,
    Lightbulb,
    Laptop,
    Link as LinkIcon,
    ChevronRight,
    ChevronLeft,
    X
} from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { icon: any, color: string }> = {
    'Product Management': { icon: Map, color: '#2D7A78' }, // Muted Teal
    'AI & ML': { icon: Brain, color: '#6A5ACD' }, // Soft Lavender
    'Growth & Analytics': { icon: LineChart, color: '#E67E22' }, // Pale Orange
    'Tools and Tech': { icon: Settings, color: '#27AE60' }, // Light Mint
    'UX and Engagement': { icon: Lightbulb, color: '#2980B9' }, // Light Sky Blue
    'Tech Stack': { icon: Laptop, color: '#D4AC0D' }, // Soft Beige/Gold
    'Methodologies': { icon: LinkIcon, color: '#C0392B' }, // Muted Pink
};

const DEFAULT_CONFIG = { icon: Settings, color: '#4A4A4A' };

// Helper to convert hex to rgba with opacity
const getRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function Skills({ skills }: { skills: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const categories = Object.keys(groupedSkills);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        // Additional check after a short delay for font/layout settlement
        const timer = setTimeout(checkScroll, 300);
        return () => {
            window.removeEventListener('resize', checkScroll);
            clearTimeout(timer);
        };
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            // Re-check after animation
            setTimeout(checkScroll, 500);
        }
    };

    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    return (
        <section className="w-full my-[100px] px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 md:p-10 lg:p-12">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] mb-12 flex items-center gap-4">
                            <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                            SKILLS & TOOLS
                        </h2>

                        {/* Horizontal Carousel Container */}
                        <div className="relative group/carousel">
                            {/* Navigation Arrows Container - Positioned outside the track but inside the padding */}
                            <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 z-30 flex items-center h-full pointer-events-none">
                                <AnimatePresence>
                                    {canScrollLeft && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => handleScroll('left')}
                                            className="p-3 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-gray-400 hover:text-indigo-600 transition-all pointer-events-auto active:scale-95"
                                        >
                                            <ChevronLeft size={24} strokeWidth={2.5} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 z-30 flex items-center h-full pointer-events-none">
                                <AnimatePresence>
                                    {canScrollRight && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => handleScroll('right')}
                                            className="p-3 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-gray-400 hover:text-indigo-600 transition-all pointer-events-auto active:scale-95"
                                        >
                                            <ChevronRight size={24} strokeWidth={2.5} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mask for peek effect at the edges if needed, but here we use padding */}
                            <div
                                ref={scrollRef}
                                onScroll={checkScroll}
                                className="flex overflow-x-auto gap-8 pb-8 px-2 no-scrollbar scroll-smooth"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    paddingRight: '10%' // Peek effect: next tile slightly visible
                                }}
                            >
                                {categories.map((category) => {
                                    const config = CATEGORY_CONFIG[category] || DEFAULT_CONFIG;
                                    const Icon = config.icon;
                                    const isActive = selectedCategory === category;

                                    return (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`flex-shrink-0 flex items-center gap-4 px-6 py-6 rounded-2xl transition-all duration-300 min-w-[260px] text-left h-[100px] border border-transparent ${isActive
                                                    ? 'shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
                                                    : 'bg-white shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
                                                }`}
                                            style={{
                                                backgroundColor: isActive ? getRgba(config.color, 0.12) : '#FFFFFF'
                                            }}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-colors"
                                                style={{
                                                    backgroundColor: isActive ? 'transparent' : getRgba(config.color, 0.1),
                                                    color: config.color
                                                }}
                                            >
                                                <Icon size={28} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex flex-col justify-center gap-0.5">
                                                <span
                                                    className="block font-bold text-lg whitespace-nowrap transition-colors leading-tight"
                                                    style={{ color: isActive ? config.color : '#1C1C1C' }}
                                                >
                                                    {category}
                                                </span>
                                                <span className="text-[12px] text-[#1C1C1C] font-extrabold uppercase tracking-widest">
                                                    {groupedSkills[category].length} Skills
                                                </span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sliding Detail Panel */}
                    <AnimatePresence mode="wait">
                        {selectedCategory && (
                            <motion.div
                                key={selectedCategory}
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-[#FFFFFF] rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="flex items-center gap-5">
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                                style={{
                                                    backgroundColor: getRgba(CATEGORY_CONFIG[selectedCategory]?.color || DEFAULT_CONFIG.color, 0.1),
                                                    color: CATEGORY_CONFIG[selectedCategory]?.color || DEFAULT_CONFIG.color
                                                }}
                                            >
                                                {React.createElement(CATEGORY_CONFIG[selectedCategory]?.icon || DEFAULT_CONFIG.icon, { size: 28, strokeWidth: 2.5 })}
                                            </div>
                                            <h3
                                                className="text-3xl font-bold"
                                                style={{ color: CATEGORY_CONFIG[selectedCategory]?.color || DEFAULT_CONFIG.color }}
                                            >
                                                {selectedCategory}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className="p-3 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={28} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-x-4 gap-y-5">
                                        {groupedSkills[selectedCategory].map((skill: any, idx: number) => (
                                            <motion.div
                                                key={skill.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.02 }}
                                                className="px-5 py-2.5 bg-[#EEEEEE] text-[#4A4A4A] rounded-full text-sm font-semibold hover:bg-gray-200 transition-all cursor-default border border-transparent shadow-sm"
                                            >
                                                {skill.name}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
