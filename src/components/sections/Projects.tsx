'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <section id="projects" className="section">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center premium-gradient-text">Passion Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass overflow-hidden group hover:border-indigo-500/50 transition-colors"
                        >
                            {project.image_url && (
                                <div className="h-48 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
