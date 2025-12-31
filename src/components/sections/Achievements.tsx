'use client';

import { motion } from 'framer-motion';

export default function Achievements({ achievements }: { achievements: any }) {
    return (
        <section id="achievements" className="section bg-black/50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center premium-gradient-text">Achievements</h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-10 max-w-4xl mx-auto border-indigo-500/20"
                >
                    <div
                        className="text-gray-300 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-3"
                        dangerouslySetInnerHTML={{ __html: achievements?.content_html || '<p>No Achievements Listed</p>' }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
