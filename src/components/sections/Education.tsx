'use client';

import { motion } from 'framer-motion';

export default function Education({ education }: { education: any[] }) {
    if (!education || !Array.isArray(education)) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                EDUCATION
            </h2>

            <div className="relative pt-4 pb-4">
                {education.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative mb-12 last:mb-0"
                    >
                        {/* Segmented Dashed Line - Only between dots */}
                        {index !== education.length - 1 && (
                            <div
                                className="absolute left-[-42px] top-10 bottom-[-48px] w-0 border-l-[1.5px] border-dashed border-indigo-600/50 z-0"
                            />
                        )}

                        {/* Timeline Marker Dot - Pulled further left */}
                        <div className="absolute left-[-50px] top-10 w-4 h-4 rounded-full bg-white border-[3px] border-indigo-600 shadow-sm z-10" />

                        {/* Education Card */}
                        <div className="bg-white p-[30px] rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="space-y-1 flex-1 text-left">
                                        <div
                                            className="text-[18px] font-bold text-[#1C1C1C] leading-snug group-hover:text-indigo-600 transition-colors"
                                            dangerouslySetInnerHTML={{ __html: item.institute_html }}
                                        />
                                        <div
                                            className="text-[14px] text-gray-600 font-normal leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: item.degree_score_html }}
                                        />
                                    </div>
                                    <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                                        <div className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded border border-gray-100">
                                            {item.from_date} — {item.to_date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
