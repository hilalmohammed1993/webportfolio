'use client';

import { motion } from 'framer-motion';

export default function Experience({ experience }: { experience: any[] }) {
    if (!experience || !Array.isArray(experience)) return null;

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase" style={{ marginBottom: '32px' }}>
                PROFESSIONAL EXPERIENCE
            </h2>

            <div className="relative">
                {experience.map((item, index) => {
                    const isLast = index === experience.length - 1;

                    return (
                        <div key={item.id || index} className="relative" style={{ marginBottom: isLast ? '0px' : '20px' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative"
                            >
                                {/* Timeline Marker Dot */}
                                <div
                                    className="rounded-full bg-white border-indigo-600 shadow-sm z-10"
                                    style={{
                                        position: 'absolute',
                                        left: '-58px',
                                        top: '24px',
                                        width: '16px',
                                        height: '16px',
                                        borderWidth: '3px',
                                        borderStyle: 'solid'
                                    }}
                                />

                                {/* Experience Card */}
                                <div className="bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group" style={{ padding: '30px' }}>
                                    <div className="flex flex-col">
                                        {/* Header */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4" style={{ marginBottom: '12px' }}>
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
                                        <div style={{ height: '16px' }} />

                                        {/* Description */}
                                        <div
                                            className="text-gray-600 text-[14px] leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-strong:text-gray-900"
                                            style={{
                                                wordBreak: 'keep-all',
                                                overflowWrap: 'normal',
                                                hyphens: 'none'
                                            }}
                                            dangerouslySetInnerHTML={{ __html: item.description_html.replace(/&nbsp;/g, ' ') }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Segmented Dashed Line - Properly connects between dots */}
                            {!isLast && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '-50px',
                                        top: '40px',  // Start below current dot (24px dot top + 16px dot height)
                                        width: '0px',
                                        height: 'calc(100% + 4px)',  // Extend to next card's dot position
                                        borderLeft: '1.5px dashed rgba(79, 70, 229, 0.5)',
                                        zIndex: 0
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
