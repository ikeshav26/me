import { motion } from "framer-motion";
import ScrollVelocity from "../components/ScrollVelocity";
import { 
  SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNextdotjs, SiExpress,
  SiGithub, SiPostman, SiArchlinux,
  SiMongodb, SiPostgresql,
  SiDocker, SiDigitalocean, SiApachekafka, SiNginx,
  SiGrafana, SiPrometheus,
  SiGithubactions,
  SiPrisma, SiGooglegemini,
  SiCplusplus, SiC, SiPython,SiSpringboot
} from 'react-icons/si';
import { DiRedis } from "react-icons/di";
import { FaAws, FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { DiMysql } from "react-icons/di";
import { GitHubCalendar } from 'react-github-calendar';
import DecryptedText from "../components/DecryptedText";
import { useTheme } from "../context/ThemeContext";
import { Zustand } from "../icons/Zustand";

const TechItem = ({ Icon, name, color }: { Icon: any; name: string; color: string }) => {
  const { theme } = useTheme();
  const iconColor = color.toUpperCase() === '#FFFFFF' 
    ? (theme === 'dark' ? '#FFFFFF' : '#1a1a1a') 
    : color;

  return (
    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} border px-5 py-3 rounded-xl mx-0.5 transition-colors`}>
      <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconColor }} />
      <span className={`text-lg md:text-xl font-medium tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{name}</span>
    </div>
  );
};

const techCategories = [
  {
    title: "Frontend Development",
    icon: "🌐",
    items: [
      { Icon: SiJavascript, name: "JavaScript", subtitle: "Languages of the web", color: "#F7DF1E" },
      { Icon: SiTypescript, name: "TypeScript", subtitle: "JavaScript with Types", color: "#3178C6" },
      { Icon: SiReact, name: "ReactJS", subtitle: "A JavaScript Library", color: "#61DAFB" },
      { Icon: SiTailwindcss, name: "Tailwind CSS", subtitle: "CSS Frameworks", color: "#06B6D4" },
       { Icon: SiNextdotjs, name: "NextJS", subtitle: "React Framework", color: "#FFFFFF" },
      {Icon: Zustand, name:"Zustand", subtitle:"State Management", color:"#FFFFFF"}
    ]
  },
  {
    title: "Backend Development",
    icon: "🌐",
    items: [
      { Icon: FaJava, name: "Java", subtitle: "Enterprise Software", color: "#E76F51" },
      { Icon: SiExpress, name: "ExpressJS", subtitle: "Web Framework for Node.js", color: "#FFFFFF" },
      { Icon: SiSpringboot, name: "Springboot", subtitle: "Java Framework", color: "#47A248"},
      { Icon: SiGrafana, name: "Grafana", subtitle: "Observability Platform", color: "#F46800" },
      { Icon: SiPrometheus, name: "Prometheus", subtitle: "Metrics Monitoring", color: "#E6522C" },
      { Icon: DiRedis, name: "Redis", subtitle: "In-memory Data Store", color: "#DC382D" },
      { Icon: SiApachekafka, name: "Kafka", subtitle: "Event Streaming", color: "#FFFFFF" },

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
  const { theme } = useTheme();
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
            <h1 className={`oswald-font text-5xl md:text-7xl tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'} m-0 uppercase`}>
              <DecryptedText text="WHO AM I?" animateOn="repeat" delay={2000} />
            </h1>
            <p className={`text-lg mt-4 max-w-2xl font-light leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm Keshav — a builder who loves connecting the dots between complex backend logic 
              and beautiful, intuitive user interfaces. I thrive on creating digital experiences 
              that are as powerful on the inside as they are elegant on the outside.
            </p>
          </motion.div>

        

           <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-start gap-5 mt-22 mb-11">
              <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>My Contributions</div>
              <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className={`flex justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            <GitHubCalendar 
              username="ikeshav26" 
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-start gap-5 mt-20 mb-6">
              <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Tech Stack</div>
              <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className={`relative py-2 mt-4 ${theme === 'dark' ? 'bg-white/2' : 'bg-black/2'} hidden md:block`}>
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r ${theme === 'dark' ? 'from-black via-black/80' : 'from-white via-white/20'} to-transparent z-10`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l ${theme === 'dark' ? 'from-black via-black/80' : 'from-white via-white/20'} to-transparent z-10`} />
            
            <ScrollVelocity 
              texts={stackItems} 
              velocity={30} 
              numCopies={4}
            />
          </div>

          <div className="md:hidden flex flex-col gap-10 px-4 mt-8 pb-4">
            {techCategories.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-mono text-sm tracking-wide flex items-center gap-2 mb-2 px-1`}>
                  {category.title} {category.icon}
                </div>
                <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-3">
                  {category.items.map((item, i) => {
                    const { Icon } = item;
                    return (
                      <div key={i} className={`flex items-center gap-4 ${theme === 'dark' ? 'bg-[#111111] hover:bg-[#1a1a1a] border-white/5' : 'bg-[#f0f0f0] hover:bg-[#e8e8e8] border-black/10'} transition-colors border p-4 rounded-xl cursor-default`}>
                        <div className={`p-2.5 rounded-lg flex-shrink-0 border shadow-inner ${theme === 'dark' ? 'bg-black/50 border-white/5' : 'bg-white border-black/5'}`}>
                          <Icon 
                            className="w-6 h-6 md:w-7 md:h-7" 
                            style={{ 
                              color: item.color.toUpperCase() === '#FFFFFF' 
                                ? (theme === 'dark' ? '#FFFFFF' : '#1a1a1a') 
                                : item.color 
                            }} 
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className={`font-semibold text-[15px] truncate tracking-tight ${theme === 'dark' ? 'text-[#e2e2e2]' : 'text-[#1a1a1a]'}`}>{item.name}</span>
                          <span className={`${theme === 'dark' ? 'text-[#888888]' : 'text-[#666666]'} text-[12px] truncate`}>{item.subtitle}</span>
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
              <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>My Interests</div>
              <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex flex-col justify-center gap-6 group mb-14">
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-950'} leading-tight`}>
                    Software Developer
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono shrink-0`}>Role</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-0.5`}>
                  Building efficient and high-performance applications.
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-950'} leading-tight`}>
                    Open Source Contributor
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono shrink-0`}>Interest</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-0.5`}>
                  Actively reviewing, engaging, and contributing to the community.
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-950'} leading-tight`}>
                    System Design Enthusiast
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono shrink-0`}>Passion</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-0.5`}>
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