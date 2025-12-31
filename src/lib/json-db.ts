import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

export function readDB() {
    if (!fs.existsSync(DB_PATH)) {
        throw new Error('Database file not found');
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export function writeDB(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helpers to mimic SQLite structure
export const db = {
    getProfile: () => readDB().profile,
    updateProfile: (data: any) => {
        const db = readDB();
        db.profile = { ...db.profile, ...data };
        writeDB(db);
        return db.profile;
    },

    getExperience: () => readDB().experience,
    addExperience: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.experience.unshift(newItem); // Add to top
        writeDB(db);
        return newItem;
    },
    updateExperience: (id: number, data: any) => {
        const db = readDB();
        db.experience = db.experience.map((i: any) => i.id === id ? { ...i, ...data } : i);
        writeDB(db);
    },
    deleteExperience: (id: number) => {
        const db = readDB();
        db.experience = db.experience.filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getEducation: () => readDB().education,
    updateEducation: (data: any) => {
        const db = readDB();
        db.education = { ...db.education, ...data };
        writeDB(db);
    },

    getAchievements: () => readDB().achievements,
    updateAchievements: (data: any) => {
        const db = readDB();
        db.achievements = { ...db.achievements, ...data };
        writeDB(db);
    },

    getSkills: () => readDB().skills,
    addSkill: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.skills.push(newItem);
        writeDB(db);
        return newItem;
    },
    deleteSkill: (id: number) => {
        const db = readDB();
        db.skills = db.skills.filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getProjects: () => readDB().projects,
    addProject: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.projects.unshift(newItem);
        writeDB(db);
        return newItem;
    },
    updateProject: (id: number, data: any) => {
        const db = readDB();
        db.projects = db.projects.map((i: any) => i.id === id ? { ...i, ...data } : i);
        writeDB(db);
    },
    deleteProject: (id: number) => {
        const db = readDB();
        db.projects = db.projects.filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getSocials: () => readDB().socials,
    addSocial: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.socials.push(newItem);
        writeDB(db);
        return newItem;
    },
    deleteSocial: (id: number) => {
        const db = readDB();
        db.socials = db.socials.filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getUser: () => readDB().user,
};
