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
    <main className="bg-[#FAFAFA] min-h-screen pb-20 text-gray-900">
      <Navbar resumePath={profile.resume_path} />

      {/* Container */}
      <div className="container mx-auto px-6 py-8 space-y-32">
        {/* Row 1: Hero */}
        <Hero profile={profile} />

        {/* Row 2: Experience & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div id="experience" className="scroll-mt-24">
            <Experience experience={experience} />
          </div>
          <div id="projects" className="scroll-mt-24">
            <Projects projects={projects} />
          </div>
        </div>

        {/* Row 3: Achievements+Education & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-32">
            <div id="achievements">
              <Achievements achievements={achievements} />
            </div>
            <div id="education" className="scroll-mt-24">
              <Education education={education} />
            </div>
          </div>
          <div id="skills" className="scroll-mt-24">
            <Skills skills={skills} />
          </div>
        </div>
      </div>
      <Footer profile={profile} />
    </main>
  );
}
