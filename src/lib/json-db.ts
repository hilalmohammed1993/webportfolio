import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'src/data/portfolio.json');
const AUTH_DB_PATH = path.resolve(process.cwd(), 'src/data/secure-auth.json');

export function readDB() {
    if (!fs.existsSync(DB_PATH)) {
        throw new Error('Database file not found');
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export function writeDB(data: any) {
    console.log('[writeDB] Writing to:', DB_PATH);
    console.log('[writeDB] Data keys:', Object.keys(data));
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log('[writeDB] Write complete');
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
    setExperience: (items: any[]) => {
        const db = readDB();
        db.experience = items;
        writeDB(db);
    },
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

    getEducation: () => readDB().education || [],
    setEducation: (items: any[]) => {
        const db = readDB();
        db.education = items;
        writeDB(db);
    },
    addEducation: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.education = db.education || [];
        db.education.push(newItem);
        writeDB(db);
        return newItem;
    },
    updateEducation: (id: number, data: any) => {
        const db = readDB();
        db.education = (db.education || []).map((i: any) => i.id === id ? { ...i, ...data } : i);
        writeDB(db);
    },
    deleteEducation: (id: number) => {
        const db = readDB();
        db.education = (db.education || []).filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getAchievements: () => readDB().achievements || [],
    setAchievements: (items: any[]) => {
        const db = readDB();
        db.achievements = items;
        writeDB(db);
    },
    addAchievement: (item: any) => {
        const db = readDB();
        const newItem = { ...item, id: Date.now() };
        db.achievements = db.achievements || [];
        db.achievements.push(newItem);
        writeDB(db);
        return newItem;
    },
    updateAchievement: (id: number, data: any) => {
        const db = readDB();
        db.achievements = (db.achievements || []).map((i: any) => i.id === id ? { ...i, ...data } : i);
        writeDB(db);
    },
    deleteAchievement: (id: number) => {
        const db = readDB();
        db.achievements = (db.achievements || []).filter((i: any) => i.id !== id);
        writeDB(db);
    },

    getSkills: () => readDB().skills,
    setSkills: (items: any[]) => {
        const db = readDB();
        db.skills = items;
        writeDB(db);
    },
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
    updateSkill: (id: number, data: any) => {
        const db = readDB();
        db.skills = db.skills.map((i: any) => i.id === id ? { ...i, ...data } : i);
        writeDB(db);
    },

    getProjects: () => readDB().projects,
    setProjects: (items: any[]) => {
        const db = readDB();
        db.projects = items;
        writeDB(db);
    },
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

    getUser: () => {
        if (!fs.existsSync(AUTH_DB_PATH)) {
            throw new Error('Auth database file not found');
        }
        const data = fs.readFileSync(AUTH_DB_PATH, 'utf-8');
        return JSON.parse(data);
    },
};
