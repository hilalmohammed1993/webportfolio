'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function Experience({ experience }: { experience: any[] }) {
    return (
        <section id="experience" className="section bg-[#F5F5F7]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Briefcase className="text-[#007AFF]" size={32} />
                    <h2 className="text-4xl font-bold text-[#1C1C1C]">Professional Experience</h2>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#1C1C1C] mb-1">{item.role}</h3>
                                    <p className="text-lg font-bold text-[#007AFF]">{item.company}</p>
                                </div>
                                <div className="mt-2 md:mt-0 px-4 py-1.5 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
                                    {item.start_date} - {item.end_date}
                                </div>
                            </div>

                            <div
                                className="text-gray-600 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:mb-2"
                                dangerouslySetInnerHTML={{ __html: item.description_html }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
