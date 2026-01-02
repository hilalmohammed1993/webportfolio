'use client';

export default function Achievements({ achievements }: { achievements: any }) {
    // Basic extraction logic
    const getItems = (htmlContent: string) => {
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(htmlContent)) !== null) {
            matches.push(match[1]);
        }
        return matches.length > 0 ? matches : [htmlContent?.replace(/<[^>]*>?/gm, '')];
    };

    const items = getItems(achievements?.content_html || '');

    return (
        <div className="space-y-4">
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 font-medium">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
