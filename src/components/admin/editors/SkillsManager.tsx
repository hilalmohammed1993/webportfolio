'use client';

import { useState } from 'react';
import { Plus, Trash, Edit, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SkillsManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData);
    const [formData, setFormData] = useState({ category: '', name: '' });

    // Edit Mode State
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ category: '', name: '' });

    const router = useRouter();

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const resetForm = () => {
        setFormData({ category: '', name: '' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete skill?')) return;
        await fetch(`/api/content/skills/${id}`, { method: 'DELETE' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleCreate = async () => {
        const res = await fetch('/api/content/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        updateState([...items, { ...formData, id: data.id }]);
        resetForm();
        router.refresh();
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm({ category: item.category, name: item.name });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const saveEdit = async (id: number) => {
        await fetch(`/api/content/skills/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm)
        });
        updateState(items.map(i => i.id === id ? { ...i, ...editForm } : i));
        setEditingId(null);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Skills</h3>
            </div>

            {/* Inline Create Form */}
            <div className="bg-white p-4 rounded-lg flex gap-4 items-end shadow-sm border border-gray-100">
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Category</label>
                    <input
                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-gray-800 outline-none focus:border-indigo-500"
                        placeholder="e.g. Technical"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Skill Name</label>
                    <input
                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-gray-800 outline-none focus:border-indigo-500"
                        placeholder="e.g. React"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <button onClick={handleCreate} disabled={!formData.name || !formData.category} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2 transition-colors">
                    <Plus size={16} /> Add
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 p-3 rounded flex justify-between items-center group shadow-sm hover:shadow-md transition-all">
                        {editingId === item.id ? (
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    value={editForm.category}
                                    onChange={e => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-1/3 text-xs p-1 border rounded"
                                />
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-1/2 text-sm p-1 border rounded font-medium"
                                />
                                <button onClick={() => saveEdit(item.id)} className="text-green-600 hover:bg-green-50 p-1 rounded"><Check size={14} /></button>
                                <button onClick={cancelEdit} className="text-gray-400 hover:bg-gray-100 p-1 rounded"><X size={14} /></button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <span className="text-xs text-indigo-500 block font-medium">{item.category}</span>
                                    <span className="text-gray-800 font-medium">{item.name}</span>
                                </div>
                                <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(item)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
