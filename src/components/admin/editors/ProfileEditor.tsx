'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function ProfileEditor({ initialData, onUpdate }: { initialData: any, onUpdate: (d: any) => void }) {
    const [summary, setSummary] = useState(initialData?.summary || '');
    const [resumePath, setResumePath] = useState(initialData?.resume_path || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [saving, setSaving] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingCloud, setUploadingCloud] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, destination: string, setUploading: (v: boolean) => void, onComplete?: (url: string) => void) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const body = new FormData();
        body.append('file', e.target.files[0]);
        // Send destination to API to overwrite existing file
        body.append('destination', destination);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = await res.json();
            if (res.ok) {
                if (onComplete) onComplete(data.url);
                alert(`Uploaded successfully to ${data.url}`);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        const newData = { summary, resume_path: resumePath, email, location };
        await fetch('/api/content/profile', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
        onUpdate(newData);
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-800 font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md text-black"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-gray-800 font-medium mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border rounded-md text-black"
                        placeholder="City, Country"
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-800 font-medium mb-2">Summary (Intro Text)</label>
                <div className="text-black">
                    <RichTextEditor value={summary} onChange={setSummary} />
                </div>
            </div>

            {/* ... (Rest of file) ... */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-800 font-medium mb-2">Resume File (PDF)</label>
                    <p className="text-sm text-gray-500 mb-2">Upload a new PDF to replace the current resume.</p>
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded flex items-center gap-2 transition-colors">
                            <Upload size={16} />
                            {uploadingResume ? 'Uploading...' : 'Upload Resume PDF'}
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleUpload(e, 'resume.pdf', setUploadingResume, (url) => setResumePath(url))}
                                accept="application/pdf"
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-800 font-medium mb-2">Word Cloud Image</label>
                    <p className="text-sm text-gray-500 mb-2">Upload a new image to replace the Hero word cloud.</p>
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded flex items-center gap-2 transition-colors">
                            <Upload size={16} />
                            {uploadingCloud ? 'Uploading...' : 'Upload Image'}
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleUpload(e, 'assets/word_cloud.png', setUploadingCloud, (url) => {
                                    // Trigger a re-render/refresh for image if needed, or just save path
                                    console.log('Word cloud uploaded to', url);
                                })}
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors shadow-lg shadow-indigo-500/30"
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
}
