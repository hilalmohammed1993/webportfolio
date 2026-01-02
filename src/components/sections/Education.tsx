'use client';

import { GraduationCap } from 'lucide-react';

export default function Education({ education }: { education: any }) {
    // Basic extraction logic to get individual items from the HTML list
    const getItems = (htmlContent: string) => {
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(htmlContent)) !== null) {
            matches.push(match[1]);
        }
        return matches.length > 0 ? matches : [htmlContent?.replace(/<[^>]*>?/gm, '')].filter(Boolean);
    };

    const items = getItems(education?.content_html || '');

    return (
        <div className="space-y-4">
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl transition-all hover:shadow-sm">
                        <div className="mt-0.5 p-1.5 bg-blue-100 rounded-lg text-blue-600">
                            <GraduationCap size={18} />
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
