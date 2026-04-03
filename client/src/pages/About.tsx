import { motion } from "framer-motion";
import ScrollVelocity from "../components/ScrollVelocity";
import { 
  SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNextdotjs, SiExpress,
  SiGithub, SiPostman, SiArchlinux,
  SiMongodb, SiPostgresql,
  SiDocker, SiDigitalocean, SiApachekafka, SiNginx,
  SiGithubactions,
  SiPrisma, SiGooglegemini,
  SiCplusplus, SiC, SiPython
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
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

const techCategories = [
  {
    title: "Development",
    icon: "🌐",
    items: [
      { Icon: SiJavascript, name: "JavaScript", subtitle: "Languages of the web", color: "#F7DF1E" },
      { Icon: SiTypescript, name: "TypeScript", subtitle: "JavaScript with Types", color: "#3178C6" },
      { Icon: SiReact, name: "ReactJS", subtitle: "A JavaScript Library", color: "#61DAFB" },
      { Icon: SiTailwindcss, name: "Tailwind CSS", subtitle: "CSS Frameworks", color: "#06B6D4" },
      { Icon: SiNextdotjs, name: "NextJS", subtitle: "React Framework", color: "#FFFFFF" },
      { Icon: SiExpress, name: "ExpressJS", subtitle: "Web Framework for Node.js", color: "#FFFFFF" },
    ]
  },{
    title: "Databases & ORM",
    icon: "🗄️",
    items: [
      { Icon: SiMongodb, name: "MongoDB", subtitle: "NoSQL Database", color: "#47A248" },
      { Icon: SiPostgresql, name: "PostgreSQL", subtitle: "Relational Database", color: "#4169E1" },
      { Icon: DiMysql, name: "MySQL", subtitle: "Relational Database", color: "#00758F" },
      { Icon: SiPrisma, name: "Prisma", subtitle: "Next-generation ORM", color: "#2D3748" },
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    items: [
      { Icon: SiDocker, name: "Docker", subtitle: "Containerization", color: "#2496ED" },
      { Icon: FaAws, name: "AWS", subtitle: "Cloud Computing", color: "#FF9900" },
      { Icon: SiDigitalocean, name: "DigitalOcean", subtitle: "Cloud Hosting", color: "#0080FF" },
      { Icon: SiApachekafka, name: "Kafka", subtitle: "Event Streaming", color: "#FFFFFF" },
      { Icon: SiGithubactions, name: "CI/CD", subtitle: "Automation", color: "#2088FF" },
      { Icon: SiNginx, name: "Nginx", subtitle: "Web Server", color: "#009639" },
    ]
  },
  {
    title: "Programming Languages",
    icon: "💻",
    items: [
      { Icon: SiCplusplus, name: "C++", subtitle: "Systems Programming", color: "#00599C" },
      { Icon: SiC, name: "C", subtitle: "Low-level Programming", color: "#A8B9CC" },
      { Icon: FaJava, name: "Java", subtitle: "Enterprise Software", color: "#E76F51" },
      { Icon: SiPython, name: "Python", subtitle: "General Purpose", color: "#3776AB" },
    ]
  },{
    title: "Tools and Platforms",
    icon: "🛠️",
    items: [
      { Icon: SiGithub, name: "Git & GitHub", subtitle: "Version Control", color: "#FFFFFF" },
      { Icon: VscVscode, name: "VS Code", subtitle: "Code Editor", color: "#007ACC" },
      { Icon: SiPostman, name: "Postman", subtitle: "API Testing", color: "#FF6C37" },
      { Icon: SiArchlinux, name: "Arch Linux", subtitle: "Linux Distribution", color: "#1793D1" },
      { Icon: SiGooglegemini, name: "Generative AI", subtitle: "AI Assistance", color: "#4285F4" },
    ]
  },
];

const stackItems = techCategories.map((cat, idx) => (
  <div key={idx} className="flex items-center justify-center gap-4">
    {cat.items.map((item, i) => (
      <TechItem key={i} Icon={item.Icon} name={item.name} color={item.color} />
    ))}
  </div>
));
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
          <div className="relative py-2 mt-4 bg-white/2 hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black via-black/80 to-transparent z-10" />
            
            <ScrollVelocity 
              texts={stackItems} 
              velocity={30} 
              numCopies={4}
            />
          </div>

          {/* Mobile Tech Stack (Grid Layout) */}
          <div className="md:hidden flex flex-col gap-10 px-4 mt-8 pb-4">
            {techCategories.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="text-gray-400 font-mono text-sm tracking-wide flex items-center gap-2 mb-2 px-1">
                  {category.title} {category.icon}
                </div>
                <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-3">
                  {category.items.map((item, i) => {
                    const { Icon } = item;
                    return (
                      <div key={i} className="flex items-center gap-4 bg-[#111111] hover:bg-[#1a1a1a] transition-colors border border-white/5 p-4 rounded-xl cursor-default">
                        <div className="bg-black/50 p-2.5 rounded-lg flex-shrink-0 border border-white/5 shadow-inner">
                          <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: item.color }} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[#e2e2e2] font-semibold text-[15px] truncate tracking-tight">{item.name}</span>
                          <span className="text-[#888888] text-[12px] truncate">{item.subtitle}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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