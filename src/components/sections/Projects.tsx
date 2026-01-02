'use client';

import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <section id="projects" className="section bg-white">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-16">
                    <FolderGit2 className="text-[#007AFF]" size={32} />
                    <h2 className="text-4xl font-bold text-[#1C1C1C]">Passion Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <a
                                href={project.link || '#'}
                                target={project.link ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={`block h-full bg-[#F5F5F7] rounded-2xl p-8 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 ${!project.link && 'cursor-default'}`}
                            >
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300">
                                        <FolderGit2 size={24} />
                                    </div>
                                    {project.link && (
                                        <ExternalLink size={20} className="text-gray-400 group-hover:text-[#007AFF] transition-colors" />
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#007AFF] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {project.description}
                                </p>

                                {project.link && (
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="text-[#007AFF]" size={20} />
                                    </div>
                                )}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
