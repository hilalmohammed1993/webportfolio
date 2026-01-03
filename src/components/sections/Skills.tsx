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

    // Chunk categories for 2-row layout: [Col1: [Cat1, Cat2], Col2: [Cat3, Cat4], ...]
    const categoryColumns = [];
    for (let i = 0; i < categories.length; i += 2) {
        categoryColumns.push(categories.slice(i, i + 2));
    }

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        const timer = setTimeout(checkScroll, 500);
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
            setTimeout(checkScroll, 600);
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
        <section className="w-full space-y-12">
            {/* Unified Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                SKILLS & TOOLS
            </h2>

            <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 relative border border-gray-50 overflow-hidden">
                <div className="relative group/carousel">
                    {/* Navigation Arrows */}
                    <AnimatePresence>
                        {canScrollLeft && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => handleScroll('left')}
                                className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-400 hover:text-indigo-600 transition-all active:scale-95 hidden md:flex"
                            >
                                <ChevronLeft size={24} strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {canScrollRight && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => handleScroll('right')}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-400 hover:text-indigo-600 transition-all active:scale-95 hidden md:flex"
                            >
                                <ChevronRight size={24} strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto gap-8 pb-4 no-scrollbar scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categoryColumns.map((column, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-8 flex-shrink-0">
                                {column.map((category) => {
                                    const config = CATEGORY_CONFIG[category] || DEFAULT_CONFIG;
                                    const Icon = config.icon;
                                    const isActive = selectedCategory === category;

                                    return (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`flex items-center gap-5 px-6 py-6 rounded-[24px] transition-all duration-300 w-[380px] md:w-[420px] text-left h-[100px] border border-transparent ${isActive
                                                ? 'shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
                                                : 'bg-white shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
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
                                            <div className="flex flex-col justify-center gap-0.5 overflow-hidden">
                                                <span
                                                    className="block font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis transition-colors leading-tight"
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
                        ))}
                        {/* Peek spacer to ensure the last column peeks if there are more */}
                        <div className="flex-shrink-0 w-20" />
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
                            <div className="p-10 lg:p-12">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-5">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
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
                                            className="px-6 py-3 bg-[#EEEEEE] text-[#4A4A4A] rounded-full text-sm font-semibold hover:bg-gray-200 transition-all cursor-default border border-transparent shadow-sm"
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
        </section>
    );
}
