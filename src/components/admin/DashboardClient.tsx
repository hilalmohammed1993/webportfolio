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
import EducationManager from './editors/EducationManager';
import AchievementsManager from './editors/AchievementsManager';

export default function DashboardClient({ initialData }: { initialData: any }) {
    const [activeTab, setActiveTab] = useState('profile');
    const [data, setData] = useState(initialData);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const handleUpdate = async (section: string, newData: any) => {
        // Update local state immediately for responsive UI
        setData((prev: any) => ({ ...prev, [section]: newData }));

        // Fetch fresh data from server to ensure sync
        try {
            const response = await fetch(`/api/content/${section}`);
            if (response.ok) {
                const freshData = await response.json();
                setData((prev: any) => ({ ...prev, [section]: freshData }));
            }
        } catch (error) {
            console.error('Failed to fetch fresh data:', error);
        }

        // Also trigger a router refresh for server components
        router.refresh();
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
                return <ProfileEditor initialData={data.profile} onUpdate={(d: any) => handleUpdate('profile', d)} />;
            case 'education':
                return <EducationManager initialData={data.education} onUpdate={(d: any) => handleUpdate('education', d)} />;
            case 'achievements':
                return <AchievementsManager initialData={data.achievements} onUpdate={(d: any) => handleUpdate('achievements', d)} />;
            case 'experience':
                return <ExperienceManager initialData={data.experience} onUpdate={(d: any) => handleUpdate('experience', d)} />;
            case 'projects':
                return <ProjectManager initialData={data.projects} onUpdate={(d: any) => handleUpdate('projects', d)} />;
            case 'skills':
                return <SkillsManager initialData={data.skills} onUpdate={(d: any) => handleUpdate('skills', d)} />;
            case 'socials':
                return <SocialsManager initialData={data.socials} onUpdate={(d: any) => handleUpdate('socials', d)} />;
            default:
                return <div className="text-gray-500">Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <aside className="w-64 glass border-r border-gray-200 flex flex-col h-screen sticky top-0 bg-white">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold premium-gradient-text tracking-wider">CMS Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 h-screen overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 capitalize">{activeTab} Manager</h2>
                    <div className="text-gray-500 text-sm">Welcome back, Admin</div>
                </header>

                <div className="glass p-8 rounded-xl min-h-[500px] border border-gray-200 bg-white/50">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
