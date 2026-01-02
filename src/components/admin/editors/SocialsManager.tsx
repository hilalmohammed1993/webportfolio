'use client';

import { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SocialsManager({ initialData, onUpdate }: { initialData: any[], onUpdate: (d: any) => void }) {
    const [items, setItems] = useState(initialData);
    const router = useRouter();

    const [formData, setFormData] = useState({ platform: '', url: '' });

    const updateState = (newItems: any[]) => {
        setItems(newItems);
        onUpdate(newItems);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete social link?')) return;
        await fetch(`/api/content/socials/${id}`, { method: 'DELETE', credentials: 'include' });
        updateState(items.filter(i => i.id !== id));
        router.refresh();
    };

    const handleCreate = async () => {
        const res = await fetch('/api/content/socials', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        updateState([...items, { ...formData, id: data.id }]);
        setFormData({ platform: '', url: '' });
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Social Links</h3>
            </div>

            {/* Inline Create Form */}
            <div className="bg-white/5 p-4 rounded-lg flex gap-4 items-end">
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">Platform</label>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                        placeholder="e.g. LinkedIn"
                        value={formData.platform}
                        onChange={e => setFormData({ ...formData, platform: e.target.value })}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">URL</label>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-white"
                        placeholder="https://..."
                        value={formData.url}
                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                    />
                </div>
                <button onClick={handleCreate} disabled={!formData.platform || !formData.url} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2">
                    <Plus size={16} /> Add
                </button>
            </div>

            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="bg-black/20 border border-white/10 p-3 rounded flex justify-between items-center group hover:bg-white/5 transition-colors">
                        <div>
                            <span className="text-white font-medium block">{item.platform}</span>
                            <a href={item.url} target="_blank" className="text-xs text-indigo-400 hover:underline">{item.url}</a>
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
