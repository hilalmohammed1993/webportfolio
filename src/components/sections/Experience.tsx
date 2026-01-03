'use client';

import { motion } from 'framer-motion';

export default function Experience({ experience }: { experience: any[] }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {experience.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden"
                >
                    <div className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight break-words max-w-full">
                                {item.company} | {item.role}
                            </h3>
                            <p className="text-[#4A90E2] font-semibold text-sm whitespace-nowrap">
                                {item.start_date} - {item.end_date}
                            </p>
                        </div>
                    </div>

                    <div
                        className="text-gray-600 text-sm leading-relaxed break-words [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1"
                        dangerouslySetInnerHTML={{ __html: item.description_html }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
