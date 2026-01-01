'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    return (
        <div className="bg-white text-black rounded-lg overflow-hidden">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="h-64 mb-12"
            />
        </div>
    );
}
