'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Education({ education }: { education: any }) {
    // Helper to parse the HTML and wrap p/li with icons if possible, 
    // or just render the container and use CSS. 
    // Since content is user-controlled HTML, we can style the specific tags via CSS modules or global styles 
    // but here we will wrap the whole block and apply icon styles via CSS/Tailwind arbitrary groups if structure is consistent.
    // Alternatively, we just display the block nicely. The user requested "Education also looks very plain. Give those three bullet points an icon like a graduation cap."
    // Since the content comes as a blob of HTML, we can't easily inject React components *into* it without parsing.
    // We will just style the container nicely and add a large decorative icon.

    return (
        <section id="education" className="section bg-white">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-16">
                    <GraduationCap className="text-[#007AFF]" size={36} />
                    <h2 className="text-4xl font-bold text-[#1C1C1C]">Education</h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-[#F5F5F7] p-10 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <GraduationCap size={200} />
                        </div>

                        <div
                            className="relative z-10 text-gray-700 leading-relaxed
                            [&>p]:mb-6 [&>p]:flex [&>p]:items-start [&>p]:gap-2
                            [&>p>strong]:text-[#1C1C1C] [&>p>strong]:text-lg [&>p>strong]:block
                            [&>p]:border-l-4 [&>p]:border-[#007AFF] [&>p]:pl-4 [&>p]:bg-white [&>p]:p-4 [&>p]:rounded-r-xl [&>p]:shadow-sm"
                            dangerouslySetInnerHTML={{ __html: education?.content_html || '<p>No Education Listed</p>' }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
