'use client';

import { useState } from 'react';

export default function ProfileEditor({ initialData }: { initialData: any }) {
    const [summary, setSummary] = useState(initialData?.summary || '');
    const [resumePath, setResumePath] = useState(initialData?.resume_path || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/content/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ summary, resume_path: resumePath }),
        });
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-gray-400 mb-2">Summary (Intro Text)</label>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full h-32 bg-black/20 border border-white/10 rounded p-4 text-white outline-none focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-2">Resume Path (Optional URL)</label>
                <input
                    type="text"
                    value={resumePath}
                    onChange={(e) => setResumePath(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded p-4 text-white outline-none focus:border-indigo-500"
                />
            </div>
            <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
}
