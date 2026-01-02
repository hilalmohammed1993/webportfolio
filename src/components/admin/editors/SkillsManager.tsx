'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit, X, Check, ArrowUp, ArrowDown } from 'lucide-react';
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
        await fetch(`/api/content/skills/${id}`, { method: 'DELETE', credentials: 'include' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleAddSkill = async (category: string) => {
        const skillName = skillInputs[category]?.trim();
        if (!skillName) return;

        const res = await fetch('/api/content/skills', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, name: skillName })
        });
        const data = await res.json();

        updateState([...items, { category, name: skillName, id: data.id }]);
        setSkillInputs(prev => ({ ...prev, [category]: '' })); // Clear input for this category
        router.refresh();
    };

    // Derived list of categories
    const allCategories = Array.from(new Set([...Object.keys(groupedSkills), ...Object.keys(skillInputs)]))
        .filter(c => c !== 'undefined');

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

    const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
        const categories = allCategories;
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= categories.length) return;

        const newCats = [...categories];
        const temp = newCats[index];
        newCats[index] = newCats[targetIndex];
        newCats[targetIndex] = temp;

        // Reconstruct items array in new category order
        const newItems = newCats.flatMap(cat => groupedSkills[cat] || []);

        try {
            const res = await fetch('/api/content/skills', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItems)
            });
            if (res.ok) {
                updateState(newItems);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleMoveSkill = async (category: string, index: number, direction: 'up' | 'down') => {
        const catSkills = [...(groupedSkills[category] || [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= catSkills.length) return;

        const temp = catSkills[index];
        catSkills[index] = catSkills[targetIndex];
        catSkills[targetIndex] = temp;

        // Reconstruct items array
        const newItems = allCategories.flatMap(cat =>
            cat === category ? catSkills : (groupedSkills[cat] || [])
        );

        try {
            const res = await fetch('/api/content/skills', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItems)
            });
            if (res.ok) {
                updateState(newItems);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (category: string) => {
        if (!confirm(`Delete category "${category}"?`)) return;
        const newItems = items.filter(i => i.category !== category);

        try {
            const res = await fetch('/api/content/skills', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItems)
            });
            if (res.ok) {
                updateState(newItems);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    const handleRenameCategory = async (oldName: string) => {
        const newName = editCategoryName.trim();
        if (!newName || newName === oldName) {
            setEditingCategory(null);
            return;
        }

        const newItems = items.map(item =>
            item.category === oldName ? { ...item, category: newName } : item
        );

        try {
            const res = await fetch('/api/content/skills', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItems)
            });
            if (res.ok) {
                updateState(newItems);
                setEditingCategory(null);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center text-black">
                <h3 className="text-xl font-bold text-gray-800">Skills Library</h3>
                <div className="flex gap-2">
                    {isAddingCategory ? (
                        <>
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name..."
                                className="p-2 border rounded text-black text-sm w-48"
                            />
                            <button
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm flex items-center gap-2"
                            >
                                <Plus size={16} /> Add
                            </button>
                        </>
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

            <div className="grid grid-cols-1 gap-6">
                {allCategories.map((category, catIndex) => (
                    <div key={category} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6 pb-2 border-b">
                            <div className="flex items-center gap-4 flex-grow">
                                {editingCategory === category ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                            className="p-1 border rounded text-black font-bold uppercase tracking-wider text-lg"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleRenameCategory(category);
                                                if (e.key === 'Escape') setEditingCategory(null);
                                            }}
                                        />
                                        <button onClick={() => handleRenameCategory(category)} className="text-green-600 p-1">
                                            <Check size={20} />
                                        </button>
                                        <button onClick={() => setEditingCategory(null)} className="text-gray-400 p-1">
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-bold text-indigo-600 uppercase tracking-wider">{category}</h4>
                                        <button
                                            onClick={() => {
                                                setEditingCategory(category);
                                                setEditCategoryName(category);
                                            }}
                                            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                            title="Rename Category"
                                        >
                                            <Edit size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-1 ml-2">
                                    <button
                                        onClick={() => handleMoveCategory(catIndex, 'up')}
                                        disabled={catIndex === 0}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                                        title="Move Category Up"
                                    >
                                        <ArrowUp size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleMoveCategory(catIndex, 'down')}
                                        disabled={catIndex === allCategories.length - 1}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                                        title="Move Category Down"
                                    >
                                        <ArrowDown size={16} />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(category)}
                                className="text-red-400 hover:text-red-600 p-1.5 transition-colors"
                                title="Delete Category"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6 flex-grow content-start">
                            {(groupedSkills[category] || []).map((skill, skillIndex) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg group"
                                >
                                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity border-l pl-2 ml-1">
                                        <button
                                            onClick={() => handleMoveSkill(category, skillIndex, 'up')}
                                            disabled={skillIndex === 0}
                                            className="text-gray-400 hover:text-indigo-600 disabled:opacity-0"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveSkill(category, skillIndex, 'down')}
                                            disabled={skillIndex === (groupedSkills[category] || []).length - 1}
                                            className="text-gray-400 hover:text-indigo-600 disabled:opacity-0"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="ml-1 text-gray-400 hover:text-red-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
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
