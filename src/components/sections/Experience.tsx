'use client';

import { motion } from 'framer-motion';

export default function Experience({ experience }: { experience: any[] }) {
    return (
        <div className="space-y-4">
            {experience.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                    <div className="mb-3">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900 text-lg">{item.company} | {item.role}</h3>
                        </div>
                        <p className="text-[#4A90E2] font-semibold text-sm">{item.start_date} - {item.end_date}</p>
                    </div>

                    <div
                        className="text-gray-600 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1"
                        dangerouslySetInnerHTML={{ __html: item.description_html }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
