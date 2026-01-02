'use client';

import { useState } from 'react';
import { Plus, Edit, Trash, ArrowLeft, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        image_url: ''
    });

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', link: '', image_url: '' });
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({ ...item });
        setIsCreating(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/content/projects/${id}`, { method: 'DELETE', credentials: 'include' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const body = new FormData();
        body.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = await res.json();
            if (data.url) setFormData({ ...formData, image_url: data.url });
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const newArr = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newArr.length) return;

        const temp = newArr[index];
        newArr[index] = newArr[targetIndex];
        newArr[targetIndex] = temp;

        try {
            const res = await fetch('/api/content/projects', {
                method: 'POST',
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
            await fetch(`/api/content/projects/${editingItem.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            updateState(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
        } else {
            const res = await fetch('/api/content/projects', {
                method: 'POST',
                credentials: 'include',
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
        // ... (rest of the form remains same)
        return (
            <div className="space-y-6">
                <button onClick={resetForm} className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <ArrowLeft size={16} /> Back to List
                </button>
                <h3 className="text-xl font-bold text-white">{isCreating ? 'Add Project' : 'Edit Project'}</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Title</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Link</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Image Upload</label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded flex items-center gap-2">
                                <Upload size={16} />
                                {uploading ? 'Uploading...' : 'Choose File'}
                                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                            </label>
                            {formData.image_url && <span className="text-sm text-green-400">Image Set</span>}
                        </div>
                        {formData.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={formData.image_url} alt="Preview" className="h-32 mt-2 rounded border border-white/10" />
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Description</label>
                        <textarea
                            className="w-full bg-black/20 border border-white/10 rounded p-2 text-white h-32"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
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
                <h3 className="text-xl font-bold text-white">Project List</h3>
                <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white">
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-black/20 border border-white/10 p-4 rounded flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleMove(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-gray-500 hover:text-white disabled:opacity-20"
                                >
                                    <ArrowUp size={14} />
                                </button>
                                <button
                                    onClick={() => handleMove(index, 'down')}
                                    disabled={index === items.length - 1}
                                    className="p-1 text-gray-500 hover:text-white disabled:opacity-20"
                                >
                                    <ArrowDown size={14} />
                                </button>
                            </div>
                            {item.image_url && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.image_url} alt="" className="w-16 h-16 object-cover rounded" />
                            )}
                            <div>
                                <h4 className="font-bold text-white">{item.title}</h4>
                                <a href={item.link} target="_blank" className="text-xs text-indigo-400 truncate max-w-[150px] block">{item.link}</a>
                            </div>
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
