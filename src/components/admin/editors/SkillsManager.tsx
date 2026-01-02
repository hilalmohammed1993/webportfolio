'use client';

import { useState } from 'react';
import { Plus, Trash, Edit, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SkillsManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData);
    const [newCategory, setNewCategory] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    // Track input values for each category separately
    const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

    const router = useRouter();

    // Group items by category
    const groupedSkills = items.reduce((acc: Record<string, any[]>, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete skill?')) return;
        await fetch(`/api/content/skills/${id}`, { method: 'DELETE' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleAddSkill = async (category: string) => {
        const skillName = skillInputs[category]?.trim();
        if (!skillName) return;

        const res = await fetch('/api/content/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, name: skillName })
        });
        const data = await res.json();

        updateState([...items, { category, name: skillName, id: data.id }]);
        setSkillInputs(prev => ({ ...prev, [category]: '' })); // Clear input for this category
        router.refresh();
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        // Just clear the input and close the modal/form. 
        // The category technically "exists" once a skill is added to it, 
        // but for UX we might want to show an empty card. 
        // However, since we group by existing items, an empty category won't show up 
        // unless we force it into the list or just immediately add a dummy/first skill.
        // Let's adopt a "Create Category" -> loads a card where you MUST add a skill to persist it.
        // Or simpler: We just add it to our local "grouped" view temporarily if valid.
        // Actually, easiest is: The backend stores SKILLS, not CATEGORIES. 
        // So a category only exists if it has skills.
        // We will mock an empty entry in the UI or ask for the first skill immediately.

        // Better UX: Just add an empty array to groupedSkills in local render state? 
        // No, let's just create a new skill in that category immediately? 
        // Let's assume the user creates a category and then immediately wants to type skills.
        // We can add a "temporary" key to the grouped view.
        setSkillInputs(prev => ({ ...prev, [newCategory]: '' }));
        setIsAddingCategory(false);
        setNewCategory('');
    };

    // Derived list of categories including any locally added (but empty) ones if we want to support that,
    // though the simplest is to just rely on existing items.
    // If a user wants a new category, they need to add the first skill.
    // Let's implement "Add Category" as "Start a new list".

    const allCategories = Array.from(new Set([...Object.keys(groupedSkills), ...Object.keys(skillInputs)]))
        .filter(c => c !== 'undefined'); // Safety check

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Skills Library</h3>
                <div className="flex gap-2">
                    {isAddingCategory ? (
                        <div className="flex items-center gap-2 bg-white p-1 rounded border border-indigo-100 shadow-sm animate-in fade-in zoom-in-95">
                            <input
                                autoFocus
                                className="px-2 py-1 text-sm border-none outline-none focus:ring-0 w-40"
                                placeholder="New Category Name..."
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleAddCategory();
                                    if (e.key === 'Escape') setIsAddingCategory(false);
                                }}
                            />
                            <button onClick={handleAddCategory} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                            <button onClick={() => setIsAddingCategory(false)} className="p-1 text-gray-400 hover:bg-gray-100 rounded"><X size={16} /></button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingCategory(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus size={16} /> New Category
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allCategories.map(category => (
                    <div key={category} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-lg text-gray-800">{category}</h4>
                            {/* Optional: Delete entire category button? Maybe too dangerous. */}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4 flex-grow content-start">
                            {(groupedSkills[category] || []).map(skill => (
                                <div key={skill.id} className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {(groupedSkills[category] || []).length === 0 && (
                                <span className="text-xs text-gray-400 italic">No skills yet</span>
                            )}
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="relative">
                                <input
                                    className="w-full pl-3 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    placeholder="Add skill + Enter..."
                                    value={skillInputs[category] || ''}
                                    onChange={e => setSkillInputs(prev => ({ ...prev, [category]: e.target.value }))}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSkill(category);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => handleAddSkill(category)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-700 p-1"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {allCategories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No skills found. Create a category to get started.</p>
                </div>
            )}
        </div>
    );
}
