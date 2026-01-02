import { Medal } from 'lucide-react';

export default function Achievements({ achievements }: { achievements: any }) {
    // Basic extraction logic
    const getItems = (htmlContent: string) => {
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(htmlContent)) !== null) {
            matches.push(match[1]);
        }
        return matches.length > 0 ? matches : [htmlContent?.replace(/<[^>]*>?/gm, '')].filter(Boolean);
    };

    const items = getItems(achievements?.content_html || '');

    return (
        <div className="space-y-4">
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl transition-all hover:shadow-sm">
                        <div className="mt-0.5 p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
                            <Medal size={18} />
                        </div>
                        <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
