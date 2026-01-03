'use client';

import { useState } from 'react';
import { Plus, Edit, Trash, X, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useRouter } from 'next/navigation';

export default function AchievementsManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData || []);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        text_html: ''
    });

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const resetForm = () => {
        setFormData({
            text_html: ''
        });
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            text_html: item.text_html || ''
        });
        setIsCreating(false);
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const newArr = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newArr.length) return;

        const temp = newArr[index];
        newArr[index] = newArr[targetIndex];
        newArr[targetIndex] = temp;

        try {
            const res = await fetch('/api/content/achievements', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newArr),
            });
            if (res.ok) {
                updateState(newArr);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (editingItem) {
            await fetch(`/api/content/achievements/${editingItem.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            updateState(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
        } else {
            const res = await fetch('/api/content/achievements', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            updateState([...items, { ...formData, id: data.id }]);
        }
        resetForm();
        router.refresh();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/content/achievements/${id}`, { method: 'DELETE', credentials: 'include' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    if (isCreating || editingItem) {
        return (
            <div className="space-y-6">
                <button onClick={resetForm} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={16} /> Back to List
                </button>
                <h3 className="text-xl font-bold text-gray-800">{isCreating ? 'Add Achievement/Award' : 'Edit Achievement/Award'}</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Description</label>
                        <RichTextEditor
                            value={formData.text_html}
                            onChange={val => setFormData({ ...formData, text_html: val })}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button onClick={handleSave} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 transition-all font-bold">
                        {editingItem ? 'Update Achievement' : 'Create Achievement'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Achievements & Awards</h3>
                <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white shadow-lg shadow-indigo-200 transition-all font-bold">
                    <Plus size={18} /> Add New
                </button>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                        No achievements found. Add your first one above!
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div key={item.id} className="bg-white border border-gray-100 p-6 rounded-2xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => handleMove(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all"
                                    >
                                        <ArrowUp size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleMove(index, 'down')}
                                        disabled={index === items.length - 1}
                                        className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all"
                                    >
                                        <ArrowDown size={18} />
                                    </button>
                                </div>
                                <div>
                                    <div className="text-gray-800 leading-relaxed achievement-content" dangerouslySetInnerHTML={{ __html: item.text_html }} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2.5 hover:bg-indigo-50 rounded-xl text-indigo-400 transition-colors">
                                    <Edit size={20} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2.5 hover:bg-red-50 rounded-xl text-red-400 transition-colors">
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
