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

            <div className="grid grid-cols-1 gap-4 max-w-3xl">
                {achievements.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        key={item.id || index}
                        className="flex items-start gap-5 p-5 bg-white border border-gray-50 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300 group"
                    >
                        <div className="mt-0.5 p-2 bg-yellow-50 text-yellow-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                            <Medal size={22} />
                        </div>
                        <div
                            className="text-[#1C1C1C] font-semibold leading-relaxed achievement-text pt-0.5"
                            dangerouslySetInnerHTML={{ __html: item.text_html }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
