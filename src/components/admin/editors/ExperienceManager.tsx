'use client';

import { useState } from 'react';
import { Plus, Edit, Trash, X, ArrowLeft } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useRouter } from 'next/navigation';

export default function ExperienceManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        description_html: ''
    });

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const resetForm = () => {
        setFormData({
            company: '',
            role: '',
            start_date: '',
            end_date: '',
            description_html: ''
        });
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            company: item.company,
            role: item.role,
            start_date: item.start_date,
            end_date: item.end_date,
            description_html: item.description_html
        });
        setIsCreating(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/content/experience/${id}`, { method: 'DELETE' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleSave = async () => {
        if (editingItem) {
            await fetch(`/api/content/experience/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            updateState(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
        } else {
            const res = await fetch('/api/content/experience', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            updateState([{ ...formData, id: data.id }, ...items]);
        }
        resetForm();
        router.refresh();
    };

    if (isCreating || editingItem) {
        return (
            <div className="space-y-6">
                <button onClick={resetForm} className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <ArrowLeft size={16} /> Back to List
                </button>
                <h3 className="text-xl font-bold text-white">{isCreating ? 'Add Experience' : 'Edit Experience'}</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Company</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Role</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Start Date</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.start_date}
                            onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">End Date</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.end_date}
                            onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 mb-1">Description</label>
                    <div className="text-black">
                        <RichTextEditor value={formData.description_html} onChange={val => setFormData({ ...formData, description_html: val })} />
                    </div>
                </div>

                <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                    {editingItem ? 'Update' : 'Create'}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Experience List</h3>
                <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white">
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="bg-black/20 border border-white/10 p-4 rounded flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-white">{item.role} @ {item.company}</h4>
                            <p className="text-sm text-gray-500">{item.start_date} - {item.end_date}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="p-2 hover:bg-white/10 rounded text-indigo-400">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-white/10 rounded text-red-400">
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
