'use client';

import { motion } from 'framer-motion';

export default function Education({ education }: { education: any[] }) {
    if (!education || !Array.isArray(education)) return null;

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase" style={{ marginBottom: '32px' }}>
                EDUCATION
            </h2>

            <div className="relative">
                {education.map((item, index) => {
                    const isLast = index === education.length - 1;

                    return (
                        <div key={item.id || index} className="relative" style={{ marginBottom: isLast ? '0px' : '16px' }}>
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
                                        borderStyle: 'solid',
                                        zIndex: 10
                                    }}
                                />

                                {/* Education Card */}
                                <div className="bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group" style={{ padding: '30px' }}>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="space-y-1 flex-1 text-left">
                                                <div
                                                    className="text-[18px] font-bold text-[#1C1C1C] leading-snug group-hover:text-indigo-600 transition-colors"
                                                    style={{ wordBreak: 'keep-all', hyphens: 'none' }}
                                                    dangerouslySetInnerHTML={{ __html: item.institute_html.replace(/&nbsp;/g, ' ') }}
                                                />
                                                <div
                                                    className="text-[14px] text-gray-600 font-normal leading-relaxed"
                                                    style={{ wordBreak: 'keep-all', hyphens: 'none' }}
                                                    dangerouslySetInnerHTML={{ __html: item.degree_score_html.replace(/&nbsp;/g, ' ') }}
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

                            {/* Segmented Dashed Line */}
                            {!isLast && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '-50px',
                                        top: '40px',
                                        width: '0px',
                                        height: 'calc(100% + 4px)',
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
