'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function SingleContentEditor({ initialData, endpoint }: { initialData: any, endpoint: string }) {
    const [content, setContent] = useState(initialData?.content_html || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content_html: content }),
        });
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="text-black">
                <RichTextEditor value={content} onChange={setContent} />
            </div>
            <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
            >
                {saving ? 'Saving...' : 'Save Content'}
            </button>
        </div>
    );
}
