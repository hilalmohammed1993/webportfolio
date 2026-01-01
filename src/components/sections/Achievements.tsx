'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function Achievements({ achievements }: { achievements: any }) {
    // Basic HTML parser to extract list items if content is in <ul> format
    const extractItems = (html: string) => {
        if (!html) return [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const items = Array.from(doc.querySelectorAll('li')).map(li => li.textContent);
        if (items.length === 0) {
            // Fallback for non-list content, just split by newlines or return raw text
            return [doc.body.textContent];
        }
        return items;
    };

    // Safe extraction relying on hydration (client-side only parsing)
    // For SSR safety in Next.js, we might need to rely on the fact that this is a 'use client' component
    // However, DOMParser is not available on server.
    // Solution: Parse in useEffect or just regex for simple list items to avoid hydration mismatch
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
        <section id="achievements" className="section bg-slate-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Achievements</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 flex items-start gap-4 hover:shadow-lg transition-shadow bg-white text-gray-800 border-none"
                        >
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full flex-shrink-0">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-lg leading-relaxed">{item}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
