'use client';

import { motion } from 'framer-motion';

export default function Experience({ experience }: { experience: any[] }) {
    return (
        <section id="experience" className="section bg-black/50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center premium-gradient-text">Professional Experience</h2>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                    <p className="text-indigo-400">{item.company}</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                                    {item.start_date} - {item.end_date}
                                </p>
                            </div>

                            <div
                                className="text-gray-300 [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-2"
                                dangerouslySetInnerHTML={{ __html: item.description_html }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
