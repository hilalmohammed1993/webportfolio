'use client';

import { useState } from 'react';
import { Plus, Trash, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SkillsManager({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({ category: '', name: '' });

    const resetForm = () => {
        setFormData({ category: '', name: '' });
        setIsCreating(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete skill?')) return;
        await fetch(`/api/content/skills/${id}`, { method: 'DELETE' });
        setItems(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleCreate = async () => {
        const res = await fetch('/api/content/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        setItems([...items, { ...formData, id: data.id }]);
        resetForm();
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Skills</h3>
            </div>

            {/* Inline Create Form */}
            <div className="bg-white/5 p-4 rounded-lg flex gap-4 items-end">
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Category</label>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                        placeholder="e.g. Technical"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Skill Name</label>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                        placeholder="e.g. React"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <button onClick={handleCreate} disabled={!formData.name || !formData.category} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2">
                    <Plus size={16} /> Add
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map(item => (
                    <div key={item.id} className="bg-black/20 border border-white/10 p-3 rounded flex justify-between items-center group hover:bg-white/5 transition-colors">
                        <div>
                            <span className="text-xs text-indigo-400 block">{item.category}</span>
                            <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all">
                            <Trash size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
