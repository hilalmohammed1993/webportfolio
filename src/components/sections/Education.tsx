'use client';

import { motion } from 'framer-motion';

export default function Education({ education }: { education: any }) {
    return (
        <section id="education" className="section">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center premium-gradient-text">Education</h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-10 max-w-4xl mx-auto"
                >
                    <div
                        className="text-gray-300 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-2 [&>p]:mb-4"
                        dangerouslySetInnerHTML={{ __html: education?.content_html || '<p>No Education Listed</p>' }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
