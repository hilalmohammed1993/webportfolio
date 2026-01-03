'use client';

import { motion } from 'framer-motion';
import { FolderGit2, Smartphone } from 'lucide-react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] flex items-center gap-4">
                <div className="w-3.5 h-3.5 bg-indigo-600 rounded-full" />
                PASSION PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                    // Alternating icons for visual variety like mockup
                    const Icon = index % 2 === 0 ? FolderGit2 : Smartphone;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full"
                        >
                            <div className="mb-6 p-4 bg-blue-50 text-blue-500 rounded-xl">
                                <Icon size={32} />
                            </div>

                            <h3 className="font-bold text-gray-900 text-xl mb-3">{project.title}</h3>

                            <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            <a
                                href={project.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-[#5B8CB9] text-white text-[13px] font-bold rounded-lg hover:bg-[#4A7CA9] transition-colors shadow-sm text-center"
                            >
                                View on Github
                            </a>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
