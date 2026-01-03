'use client';

import { GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education({ education }: { education: any[] }) {
    if (!education || !Array.isArray(education)) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                EDUCATION
            </h2>

            <div className="grid grid-cols-1 gap-6">
                {education.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        key={item.id || index}
                        className="group relative bg-[#FAFAFA] border border-gray-100 p-8 rounded-[24px] hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 w-full"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap size={22} />
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                    <Calendar size={12} strokeWidth={2.5} />
                                    {item.from_date} — {item.to_date}
                                </div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <div
                                    className="text-lg font-bold text-[#1C1C1C] leading-tight institute-name"
                                    dangerouslySetInnerHTML={{ __html: item.institute_html }}
                                />
                                <div
                                    className="text-sm font-medium text-indigo-600/80 leading-relaxed degree-info"
                                    dangerouslySetInnerHTML={{ __html: item.degree_score_html }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
