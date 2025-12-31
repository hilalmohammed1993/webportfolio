'use client';

import { motion } from 'framer-motion';

export default function Skills({ skills }: { skills: any[] }) {
    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="section">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center premium-gradient-text">Skills</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedSkills).map(([category, items]: [string, any], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6"
                        >
                            <h3 className="text-xl font-bold text-indigo-400 mb-6 border-b border-white/10 pb-2">{category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill: any) => (
                                    <span key={skill.id} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
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
