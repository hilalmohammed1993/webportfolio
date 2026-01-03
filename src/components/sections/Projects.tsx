'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import Image from 'next/image';

export default function Projects({ projects }: { projects: any[] }) {
    if (!projects || !Array.isArray(projects)) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4 uppercase">
                PASSION PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                    >
                        {/* Project Image / Placeholder */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-50">
                            {project.image_url ? (
                                <Image
                                    src={project.image_url}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                                    <Folder size={48} strokeWidth={1.5} className="mb-2" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Project</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow text-left">
                            <h3 className="text-2xl font-bold text-[#1C1C1C] mb-3 group-hover:text-indigo-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                {project.description}
                            </p>

                            {/* CTA Link */}
                            {project.link && (
                                <div className="flex justify-center mt-auto">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-10 h-14 bg-[#5B8CB9] text-white text-[14px] font-bold rounded-xl hover:bg-[#4A7CA9] transition-all hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95 gap-2 min-w-[180px]"
                                    >
                                        {project.link_text || 'View Project'}
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
