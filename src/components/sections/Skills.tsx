'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function Skills({ skills }: { skills: any[] }) {
    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="section bg-[#F5F5F7]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-16">
                    <Cpu className="text-[#007AFF]" size={32} />
                    <h2 className="text-4xl font-bold text-[#1C1C1C]">Skills</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedSkills).map(([category, items]: [string, any], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                        >
                            {/* Decorative Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-xl font-bold text-[#007AFF] mb-6">{category}</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {items.map((skill: any) => (
                                    <span key={skill.id} className="px-4 py-1.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 border border-gray-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-colors">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
