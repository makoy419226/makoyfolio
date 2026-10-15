import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImmersiveSection from "./ImmersiveSection";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js & Express.js",
  "API Integration",
  "ERP & CRM Development",
  "Business Process Automation",
  "Reporting & Data Management",
  "SQL",
  "Git & GitHub",
  "Vercel, Hostinger & GoDaddy",
  "Cloudflare & DNS Configuration",
  "Production Support",
  "AI-Assisted Development",
];

const Skills = () => {
  return (
    <ImmersiveSection id="skills" className="section-atmosphere relative px-4 py-24">
      <div className="mx-auto max-w-7xl space-y-10 md:space-y-12">
        <SectionHeading eyebrow="02" title="Skills" />

        <Reveal variant="up" amount={0.12}>
          <div className="skills-pill-shell" aria-label={`${skills.length} skills`}>
            <div className="skills-pill-header">
              <span>Skills</span>
              <span>{skills.length} skills</span>
            </div>

            <ul className="skills-pill-list">
              {skills.map((skill) => (
                <li className="skills-pill" key={skill} tabIndex={0}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </ImmersiveSection>
  );
};

export default Skills;
