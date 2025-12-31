import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer({ socials }: { socials: any[] }) {
    const getIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes('linkedin')) return <Linkedin size={20} />;
        if (p.includes('github')) return <Github size={20} />;
        return <Mail size={20} />;
    };

    return (
        <footer className="py-12 border-t border-white/10 mt-20">
            <div className="container mx-auto px-6 flex flex-col items-center gap-6">
                <h3 className="text-2xl font-bold premium-gradient-text">Let's Connect</h3>

                <div className="flex gap-6">
                    {socials.map((s: any) => (
                        <a
                            key={s.id}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass hover:bg-white/10 transition-all rounded-full"
                        >
                            {getIcon(s.platform)}
                        </a>
                    ))}
                </div>

                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Hilal Mohammed. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
