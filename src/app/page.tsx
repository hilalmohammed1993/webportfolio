import { db } from '@/lib/json-db';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Achievements from '@/components/sections/Achievements';
import Projects from '@/components/sections/Projects';

// Force static generation
export const dynamic = 'force-static';

export default function Home() {
  // Direct read from JSON DB at build time
  const profile = db.getProfile();
  const experience = db.getExperience();
  const education = db.getEducation();
  const achievements = db.getAchievements();
  const skills = db.getSkills();
  const projects = db.getProjects();
  const socials = db.getSocials();

  return (
    <main className="bg-img min-h-screen text-white selection:bg-indigo-500/30">
      <Navbar />
      <Hero profile={profile} />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Education education={education} />
      <Skills skills={skills} />
      <Achievements achievements={achievements} />
      <Footer socials={socials} />
    </main>
  );
}
