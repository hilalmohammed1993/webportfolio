'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function Achievements({ achievements }: { achievements: any }) {
    // Basic HTML parser to extract list items if content is in <ul> format
    /* ... (parser logic same as before) ... */
    const getItems = (htmlContent: string) => {
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(htmlContent)) !== null) {
            matches.push(match[1]);
        }
        return matches.length > 0 ? matches : [htmlContent?.replace(/<[^>]*>?/gm, '')];
    };

    const items = getItems(achievements?.content_html || '');

    return (
        <section id="achievements" className="section bg-[#F5F5F7]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-16">
                    <Trophy className="text-[#007AFF]" size={32} />
                    <h2 className="text-4xl font-bold text-[#1C1C1C]">Achievements</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-5 border border-gray-100"
                        >
                            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl flex-shrink-0">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-lg leading-relaxed text-gray-800">{item}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
