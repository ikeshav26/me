import TextType from "../components/TextType"
import { motion } from "framer-motion"
import { Copy, Check, MapPin, GitCommitHorizontal, BookOpen, ArrowUpRight, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GithubIcon } from "../icons/GithubIcon"
import { DiscordIcon } from "../icons/DiscordIcon"
import Form from "../components/Form"
import { useTheme } from "../context/ThemeContext"
import { FaLinkedin } from "react-icons/fa";

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-400",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
}
const statusLabels: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
}

const LANYARD_USER_ID = import.meta.env.VITE_LANYARD_ID;

const SectionLabel = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  const { theme } = useTheme();
  return (
    <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono mb-2`}>
      {icon}
      {label}
    </div>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-white/3 border-white/6' : 'bg-black/3 border-black/10'} border rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};

const Me = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [discordStatus, setDiscordStatus] = useState<string>("offline");
  const [discordActivity, setDiscordActivity] = useState<string | null>(null);
  const [discordError, setDiscordError] = useState(false);
  const [lastCommit, setLastCommit] = useState<{ message: string; repo: string; url: string; time: string } | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<{ _id: string; subject: string; description: string; createdAt: string }[]>([]);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_USER_ID}`);
        const data = await res.json();
        if (data.success) {
          setDiscordError(false);
          setDiscordStatus(data.data.discord_status);
          const act = data.data.activities?.find((a: { type: number; name: string }) => a.type === 0);
          setDiscordActivity(act?.name ?? null);
        } else {
          setDiscordError(true);
        }
      } catch {
        setDiscordError(true);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCommit = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/search/commits?q=author:ikeshav26&sort=author-date&order=desc&per_page=1`,
          { headers: { Accept: 'application/vnd.github.cloak-preview+json' } }
        );
        const data = await res.json();
        const item = data.items?.[0];
        if (item) {
          const sha = item.sha.slice(0, 7);
          const repoName = item.repository.name;
          const date = new Date(item.commit.author.date);
          const diff = Math.round((Date.now() - date.getTime()) / 60000);
          const time = diff < 60 ? `${diff}m ago` : diff < 1440 ? `${Math.round(diff / 60)}h ago` : `${Math.round(diff / 1440)}d ago`;
          setLastCommit({
            message: item.commit.message.split('\n')[0],
            repo: repoName,
            url: item.html_url,
            time: `${sha} · ${time}`,
          });
        }
      } catch {
        // ignore nothing to do there
      }
    };
    fetchCommit();
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs/all`)
      .then(r => r.json())
      .then(data => {
        const all = data.blogs ?? [];
        setRecentBlogs(all.slice(0, 2));
      })
      .catch(() => {});

    fetch(`${import.meta.env.VITE_API_URL}/api/visitor/count`)
      .then(r => r.json())
      .then(data => {
        if (data && typeof data.visitorCount === 'number') {
          setVisitorCount(data.visitorCount);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx who-keshav");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-3xl py-14 mx-auto px-4 md:px-0">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="flex flex-col gap-8"
      >

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <h1 className={`oswald-font text-5xl md:text-7xl tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'} m-0 uppercase`}>
            Keshav Gilhotra
          </h1>
        </motion.div>


        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className={`flex items-center text-lg md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-mono`}>
            <span className={`mr-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} select-none`}>~</span>
            <TextType
              text={[
                "building scalable products_",
                "open source contributor_",
                "open for internships_"
              ]}
              typingSpeed={40}
              deletingSpeed={25}
              pauseDuration={2500}
              showCursor={true}
              cursorCharacter=""
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} tracking-tight`}
            />
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-400/80' : 'text-gray-600'} leading-relaxed font-light max-w-2xl`}>
            I create end-to-end products—from robust web applications to versatile
            mobile and desktop solutions. My focus is on performance, scalability,
            and building seamless user experiences across all platforms to deliver
            highly reliable and structured software.
          </p>
        </motion.div>


        <motion.div
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4"
        >
          <button
            onClick={handleCopy}
            className={`flex items-center gap-4 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20'} border rounded-lg px-4 py-3 transition-colors group cursor-pointer text-left w-full sm:w-auto`}
            aria-label="Copy to clipboard"
            title="npx who-keshav"
          >
            <span className={`font-mono ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'} text-base transition-colors`}>
              <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mr-2 select-none`}>{'>_'}</span>
              npx who-keshav
            </span>
            <span className={`ml-4 ${theme === 'dark' ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'} transition-colors`}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </button>

          <div className={`flex items-center gap-5 mt-2 sm:mt-0 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            <Link to="https://github.com/ikeshav26" className={`hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} aria-label="GitHub">
              <GithubIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link to="https://www.linkedin.com/in/keshavgilhotra" className={`hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} aria-label="LinkedIn">
              <FaLinkedin className="w-[22px] h-[22px]" />
            </Link>
            <Link to="https://discord.com/users/1353631480064245772" className={`hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} aria-label="Discord">
              <DiscordIcon className="w-[22px] h-[22px]" />
            </Link>
          </div>
        </motion.div>


        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center justify-start gap-5 mt-16">
            <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Education</div>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex flex-col justify-center gap-6 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-950'} leading-tight`}>
                  Baba Farid College of Engineering &amp; Technology
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono shrink-0`}>2024 – 2028</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-0.5`}>
                Bachelor of Technology <span className="text-orange-400/80">(B.Tech)</span>
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-950'} leading-tight`}>
                  Rose Mary Convent School
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono shrink-0`}>2023 – 2024</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-0.5`}>
                Senior Secondary School <span className="text-orange-400/80">(Non-Med)</span>
              </p>
            </div>
          </div>
        </motion.div>

        
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center justify-start gap-5 mt-17">
            <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Activity Feed</div>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="sm:col-span-2 hover:border-white/10 transition-all duration-300">
              <SectionLabel icon={<GitCommitHorizontal size={10} />} label="Latest Commit" />
              {lastCommit ? (
                <a
                  href={lastCommit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link block"
                >
                  <p className={`${theme === 'dark' ? 'text-white group-hover/link:text-gray-300' : 'text-gray-900 group-hover/link:text-gray-700'} text-sm font-medium leading-snug transition-colors line-clamp-2`}>
                    {lastCommit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-black/5 border-black/10 text-gray-600'} border font-mono px-2 py-0.5 rounded-md`}>
                      {lastCommit.repo}
                    </span>
                    <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-xs font-mono`}>{lastCommit.time}</span>
                  </div>
                </a>
              ) : (
                <p className="text-gray-500 text-sm">Loading...</p>
              )}
            </Card>

            <Card className={`hover:${theme === 'dark' ? 'border-white/10' : 'border-black/20'} transition-all duration-300`}>
              <SectionLabel icon={<MapPin size={10} />} label="Location" />
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm font-medium leading-tight`}>Punjab, India</p>
              <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-xs font-mono mt-1`}>IST · UTC+5:30</p>
            </Card>

            <Card className={`hover:${theme === 'dark' ? 'border-white/10' : 'border-black/20'} transition-all duration-300`}>
              <SectionLabel icon={<DiscordIcon className="w-2.5 h-2.5" />} label="Discord Status" />
              {discordError ? (
                <div>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>Not tracked yet</p>
                  <a
                    href="https://discord.gg/lanyard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme === 'dark' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} text-xs mt-1 flex items-center gap-1 transition-colors group/link`}
                  >
                    Join discord.gg/lanyard to enable
                    <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusColors[discordStatus]}`} />
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-950'} text-sm font-semibold`}>{statusLabels[discordStatus]}</span>
                  </div>
                  {discordActivity ? (
                    <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} text-xs mt-1.5 truncate`}>Playing: {discordActivity}</p>
                  ) : (
                    <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-xs mt-1.5`}>No active activity</p>
                  )}
                </>
              )}
            </Card>

            <Card className={`hover:${theme === 'dark' ? 'border-white/10' : 'border-black/20'} transition-all duration-300`}>
              <SectionLabel icon={<Eye size={10} />} label="Visitors" />
              <div className="flex items-baseline gap-2">
                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-950'} text-xl font-bold font-mono`}>
                  {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
                </span>
                <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-[10px] font-mono shrink-0`}>visits</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} text-[9px] mt-1.5 uppercase tracking-tighter`}>Live Tracker</p>
            </Card>

            <Card className={`hover:${theme === 'dark' ? 'border-white/10' : 'border-black/20'} transition-all duration-300 cursor-pointer`}>
              <SectionLabel icon={<BookOpen size={10} />} label="Guestbook" />
              <Link to="/guestbook" className="flex items-start justify-between group/link">
                <div>
                  <p className={`${theme === 'dark' ? 'text-white group-hover/link:text-gray-300' : 'text-gray-900 group-hover/link:text-gray-700'} text-sm font-medium transition-colors`}>
                    Sign guestbook ✨
                  </p>
                  <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-xs mt-1`}>Leave a note!</p>
                </div>
                <ArrowUpRight size={14} className={`${theme === 'dark' ? 'text-gray-600 group-hover/link:text-white' : 'text-gray-400 group-hover/link:text-black'} transition-colors shrink-0 mt-0.5`} />
              </Link>
            </Card>
          </div>
        </motion.div>


        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="p-3! col-span-full">
            <SectionLabel icon={<GithubIcon className="w-2.5 h-2.5" />} label="Contributions" />
            <div className="overflow-hidden rounded-lg mt-1">
              <img
                src="https://raw.githubusercontent.com/ikeshav26/ikeshav26/output/game.gif"
                alt="GitHub Contributions"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center justify-start gap-5 mt-17">
            <div className={`oswald-font text-2xl uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Recent Blogs</div>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-500/50' : 'bg-gray-300/80'}`}></div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex flex-col gap-3">
            {recentBlogs.length === 0 ? (
              Array(2).fill(0).map((_, i) => (
            <div key={i} className={`h-32 rounded-2xl animate-pulse mb-8 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}></div>
          ))
            ) : recentBlogs.map((blog) => {
              const date = new Date(blog.createdAt);
              const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <Link
                  key={blog._id}
                  to={`/blogs/${blog._id}`}
                  className={`group relative flex flex-col gap-2.5 p-5 rounded-xl border ${theme === 'dark' ? 'border-white/5 hover:border-white/10 bg-white/3 hover:bg-white/5' : 'border-black/10 hover:border-black/20 bg-black/3 hover:bg-black/5'} transition-all duration-300`}
                >
                  <ArrowUpRight
                    size={15}
                    className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-gray-600 group-hover:text-white' : 'text-gray-400 group-hover:text-black'} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200`}
                  />
                  <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-[11px] font-mono uppercase tracking-widest`}>
                    {formatted}
                  </p>
                  <h3 className={`text-blue-500 hover:text-blue-400 font-semibold text-base md:text-lg leading-snug pr-6 transition-colors underline-offset-4 hover:underline`}>
                    {blog.subject}
                  </h3>
                </Link>
              );
            })}
          </div>

          <Link
            to="/blogs"
            className={`inline-flex items-center gap-1.5 text-sm ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors mt-4 group/link`}
          >
            View All Posts
            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

<Form/>
      </motion.div>
    </div>
  )
}

export default Me