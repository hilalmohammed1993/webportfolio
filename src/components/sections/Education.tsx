'use client';

export default function Education({ education }: { education: any }) {
    return (
        <div className="bg-white p-0 rounded-none shadow-none">
            <div
                className="text-gray-700 space-y-4
                [&>p]:mb-4 
                [&>p>strong]:block [&>p>strong]:text-gray-900 [&>p>strong]:font-bold [&>p>strong]:text-base
                [&>p]:text-sm [&>p]:text-gray-600"
                dangerouslySetInnerHTML={{ __html: education?.content_html || '<p>No Education Listed</p>' }}
            />
        </div>
    );
}
