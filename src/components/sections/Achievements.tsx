'use client';

import { Medal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Achievements({ achievements }: { achievements: any[] }) {
    if (!achievements || !Array.isArray(achievements)) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                ACHIEVEMENTS & AWARDS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        key={item.id || index}
                        className="flex items-center gap-4 p-4 bg-[#F0F7FF] border border-blue-100/50 rounded-xl hover:shadow-md transition-all duration-300 group"
                    >
                        <div className="shrink-0 p-2.5 bg-white text-blue-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Medal size={20} />
                        </div>
                        <div
                            className="text-[#1C1C1C] font-bold text-[14px] leading-tight achievement-text"
                            dangerouslySetInnerHTML={{ __html: item.text_html }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
