'use client';

import { motion } from 'framer-motion';

export default function Experience({ experience }: { experience: any[] }) {
    if (!experience || !Array.isArray(experience)) return null;

    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                PROFESSIONAL EXPERIENCE
            </h2>

            <div className="relative pt-4 pb-4">
                {experience.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative mb-16 last:mb-0"
                    >
                        {/* Segmented Dashed Line - Only between dots */}
                        {index !== experience.length - 1 && (
                            <div
                                className="absolute left-[-42px] top-10 bottom-[-64px] w-0 border-l-[1.5px] border-dashed border-indigo-600/50 z-0"
                            />
                        )}

                        {/* Timeline Marker Dot - Pulled further left into the gutter */}
                        <div className="absolute left-[-50px] top-10 w-4 h-4 rounded-full bg-white border-[3px] border-indigo-600 shadow-sm z-10" />

                        {/* Experience Card */}
                        <div className="bg-white p-[30px] rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
                            <div className="flex flex-col">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                                    <div className="space-y-1 flex-1">
                                        <h3 className="text-[19px] font-bold text-[#1C1C1C] leading-snug group-hover:text-indigo-600 transition-colors">
                                            {item.company}
                                        </h3>
                                        <div className="text-indigo-600 font-medium text-[14px]">
                                            {item.role}
                                        </div>
                                    </div>
                                    <div className="shrink-0 self-start md:self-auto">
                                        <div className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded border border-gray-100">
                                            {item.start_date} — {item.end_date}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider/Space before content */}
                                <div className="h-4" />

                                {/* Description */}
                                <div
                                    className="text-gray-600 text-[14px] leading-relaxed break-words prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-strong:text-gray-900"
                                    dangerouslySetInnerHTML={{ __html: item.description_html }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
