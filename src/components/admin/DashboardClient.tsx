'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, Briefcase, GraduationCap, Award, Code, Share2 } from 'lucide-react';
import ProfileEditor from './editors/ProfileEditor';
import SingleContentEditor from './editors/SingleContentEditor';
import ExperienceManager from './editors/ExperienceManager';
import ProjectManager from './editors/ProjectManager';
import SkillsManager from './editors/SkillsManager';
import SocialsManager from './editors/SocialsManager';

export default function DashboardClient({ initialData }: { initialData: any }) {
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'achievements', label: 'Achievements', icon: Award },
        { id: 'projects', label: 'Projects', icon: Share2 },
        { id: 'socials', label: 'Socials', icon: Share2 },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileEditor initialData={initialData.profile} />;
            case 'education':
                return <SingleContentEditor initialData={initialData.education} endpoint="/api/content/education" />;
            case 'achievements':
                return <SingleContentEditor initialData={initialData.achievements} endpoint="/api/content/achievements" />;
            case 'experience':
                return <ExperienceManager initialData={initialData.experience} />;
            case 'projects':
                return <ProjectManager initialData={initialData.projects} />;
            case 'skills':
                return <SkillsManager initialData={initialData.skills} />;
            case 'socials':
                return <SocialsManager initialData={initialData.socials} />;
            default:
                return <div className="text-gray-500">Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen bg-black flex font-sans">
            <aside className="w-64 glass border-r border-white/10 flex flex-col fixed h-full">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold premium-gradient-text tracking-wider">CMS Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 ml-64">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white capitalize">{activeTab} Manager</h2>
                    <div className="text-gray-500 text-sm">Welcome back, Admin</div>
                </header>

                <div className="glass p-8 rounded-xl min-h-[500px] border border-white/5">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
