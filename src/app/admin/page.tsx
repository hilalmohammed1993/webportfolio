import { db } from '@/lib/json-db';
import DashboardClient from '@/components/admin/DashboardClient';

export default function AdminPage() {
    // Direct read from JSON DB (Server Side)
    const profile = db.getProfile();
    const experience = db.getExperience();
    const education = db.getEducation();
    const achievements = db.getAchievements();
    const skills = db.getSkills();
    const projects = db.getProjects();
    const socials = db.getSocials();

    const data = {
        profile,
        experience,
        education,
        achievements,
        skills,
        projects,
        socials
    };

    return <DashboardClient initialData={data} />;
}
