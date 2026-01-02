'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function Skills({ skills }: { skills: any[] }) {
    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border border-gray-100 h-full">
            {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
                <div key={category}>
                    <h3 className="font-bold text-gray-900 mb-2">{category}</h3>
                    <ul className="space-y-1">
                        {items.map((skill: any) => (
                            <li key={skill.id} className="text-sm text-gray-600">
                                • {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
