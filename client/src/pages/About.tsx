import { motion } from "framer-motion";
import ScrollVelocity from "../components/ScrollVelocity";
import { 
  SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNextdotjs, SiExpress,
  SiGit, SiGithub, SiPostman, SiArchlinux, SiOpenai,
  SiMongodb, SiPostgresql,
  SiDocker, SiDigitalocean, SiApachekafka, SiNginx,
  SiGithubactions,
  SiPrisma, SiGooglegemini,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { DiMysql } from "react-icons/di";
import { GitHubCalendar } from 'react-github-calendar';
import DecryptedText from "../components/DecryptedText";

const TechItem = ({ Icon, name, color }: { Icon: any; name: string; color: string }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-xl mx-0.5 hover:bg-white/10 transition-colors">
    <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
    <span className="text-lg md:text-xl font-medium tracking-tight text-white">{name}</span>
  </div>
);

const stackItems = [
  <div className="flex items-center justify-center gap-4">
    <TechItem Icon={SiJavascript} name="JavaScript" color="#F7DF1E" />
    <TechItem Icon={SiTypescript} name="TypeScript" color="#3178C6" />
    <TechItem Icon={SiReact} name="React" color="#61DAFB" />
    <TechItem Icon={SiNextdotjs} name="Next.js" color="#FFFFFF" />
    <TechItem Icon={SiTailwindcss} name="Tailwind" color="#06B6D4" />
    <TechItem Icon={SiExpress} name="Express" color="#FFFFFF" />
  </div>,
  <div className="flex items-center gap-4">
    <TechItem Icon={SiGit} name="Git" color="#F05032" />
    <TechItem Icon={SiGithub} name="GitHub" color="#FFFFFF" />
    <TechItem Icon={VscVscode} name="VS Code" color="#007ACC" />
    <TechItem Icon={SiPostman} name="Postman" color="#FF6C37" />
    <TechItem Icon={SiArchlinux} name="Arch Linux" color="#1793D1" />
    <TechItem Icon={SiOpenai} name="OpenAI" color="#FFFFFF" />
    <TechItem Icon={SiGooglegemini} name="Generative AI" color="#4285F4" />
  </div>,
  <div className="flex items-center gap-4">
    <TechItem Icon={SiMongodb} name="MongoDB" color="#47A248" />
    <TechItem Icon={SiPostgresql} name="PostgreSQL" color="#4169E1" />
    <TechItem Icon={DiMysql} name="MySQL" color="#00758F" />
    <TechItem Icon={SiPrisma} name="Prisma" color="#2D3748" />
  </div>,
  <div className="flex items-center gap-4">
    <TechItem Icon={SiDocker} name="Docker" color="#2496ED" />
    <TechItem Icon={FaAws} name="AWS" color="#FF9900" />
    <TechItem Icon={SiDigitalocean} name="DigitalOcean" color="#0080FF" />
    <TechItem Icon={SiApachekafka} name="Kafka" color="#FFFFFF" />
    <TechItem Icon={SiGithubactions} name="CI/CD" color="#2088FF" />
    <TechItem Icon={SiNginx} name="Nginx" color="#009639" />
  </div>
];

const About = () => {
  return (
    <div className="w-full mt-17 mb-8 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="flex flex-col gap-8"
      >
        <div className="max-w-3xl mx-auto w-full px-4 md:px-0">
          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <h1 className="oswald-font text-5xl md:text-7xl tracking-wide text-white m-0 uppercase">
              <DecryptedText text="WHO AM I?" animateOn="repeat" delay={5000} />
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl font-light leading-relaxed">
              I'm Keshav — a builder who loves connecting the dots between complex backend logic 
              and beautiful, intuitive user interfaces. I thrive on creating digital experiences 
              that are as powerful on the inside as they are elegant on the outside.
            </p>
          </motion.div>

        

           <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-start gap-5 mt-22 mb-11">
              <div className="oswald-font text-2xl uppercase tracking-widest text-white">My Contributions</div>
              <div className="flex-1 h-px bg-gray-500/50"></div>
            </div>
          </motion.div>

           <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <GitHubCalendar username="ikeshav26" />
           </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-start gap-5 mt-20 mb-6">
              <div className="oswald-font text-2xl uppercase tracking-widest text-white">Tech Stack</div>
              <div className="flex-1 h-px bg-gray-500/50"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="relative py-2 mt-4 bg-white/2">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black via-black/80 to-transparent z-10" />
            
            <ScrollVelocity 
              texts={stackItems} 
              velocity={50} 
              numCopies={4}
            />
          </div>
        </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-start gap-5 mt-22 mb-11">
              <div className="oswald-font text-2xl uppercase tracking-widest text-white">My Interests</div>
              <div className="flex-1 h-px bg-gray-500/50"></div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex flex-col justify-center gap-6 group mb-14">
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-base md:text-lg font-semibold text-white leading-tight">
                    Software Developer
                  </span>
                  <span className="text-sm text-gray-500 font-mono shrink-0">Role</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Building efficient and high-performance applications.
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-base md:text-lg font-semibold text-white leading-tight">
                    Open Source Contributor
                  </span>
                  <span className="text-sm text-gray-500 font-mono shrink-0">Interest</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Actively reviewing, engaging, and contributing to the community.
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-base md:text-lg font-semibold text-white leading-tight">
                    System Design Enthusiast
                  </span>
                  <span className="text-sm text-gray-500 font-mono shrink-0">Passion</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Loves to study system design to build architectures for highly scalable products.
                </p>
              </div>

            </div>
          </motion.div>

      </motion.div>
    </div>
  )
}

export default About