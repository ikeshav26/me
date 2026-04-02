import TextType from "../components/TextType"
import { motion } from "framer-motion"
import { Copy, Check, MapPin, GitCommitHorizontal, BookOpen, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GithubIcon } from "../icons/GithubIcon"
import { InstagramIcon } from "../icons/InstagramIcon"
import { DiscordIcon } from "../icons/DiscordIcon"
import Form from "../components/Form"

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

const SectionLabel = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-2">
    {icon}
    {label}
  </div>
)

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/3 border border-white/6 rounded-xl p-4 ${className}`}>
    {children}
  </div>
)

const Me = () => {
  const [copied, setCopied] = useState(false);
  const [discordStatus, setDiscordStatus] = useState<string>("offline");
  const [discordActivity, setDiscordActivity] = useState<string | null>(null);
  const [discordError, setDiscordError] = useState(false);
  const [lastCommit, setLastCommit] = useState<{ message: string; repo: string; url: string; time: string } | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<{ _id: string; subject: string; description: string; createdAt: string }[]>([]);

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
      }
    };
    fetchCommit();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/blogs/all')
      .then(r => r.json())
      .then(data => {
        const all = data.blogs ?? [];
        setRecentBlogs(all.slice(-2).reverse());
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
          <h1 className="oswald-font text-5xl md:text-7xl tracking-wide text-white m-0 uppercase">
            Keshav Gilhotra
          </h1>
        </motion.div>


        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center text-lg md:text-2xl text-gray-300 font-mono">
            <span className="mr-3 text-gray-600 select-none">~</span>
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
              className="text-gray-300 tracking-tight"
            />
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <p className="text-base md:text-lg text-gray-400/80 leading-relaxed font-light max-w-2xl">
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
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-lg px-4 py-3 transition-colors group cursor-pointer text-left w-full sm:w-auto"
            aria-label="Copy to clipboard"
            title="npx who-keshav"
          >
            <span className="font-mono text-gray-400 text-base group-hover:text-gray-300 transition-colors">
              <span className="text-gray-600 mr-2 select-none">{'>_'}</span>
              npx who-keshav
            </span>
            <span className="ml-4 text-gray-500 group-hover:text-gray-300 transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </button>

          <div className="flex items-center gap-5 mt-2 sm:mt-0 text-gray-500">
            <Link to="#" className="hover:text-white transition-colors duration-200" aria-label="GitHub">
              <GithubIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-200" aria-label="Instagram">
              <InstagramIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-200" aria-label="Discord">
              <DiscordIcon className="w-[22px] h-[22px]" />
            </Link>
          </div>
        </motion.div>


        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center justify-start gap-5 mt-16">
            <div className="oswald-font text-2xl uppercase tracking-widest text-white">Education</div>
            <div className="flex-1 h-[1px] bg-gray-500/50"></div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex flex-col justify-center gap-6 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-base md:text-lg font-semibold text-white leading-tight">
                  Baba Farid College of Engineering &amp; Technology
                </span>
                <span className="text-sm text-gray-500 font-mono shrink-0">2024 – 2028</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                Bachelor of Technology <span className="text-orange-400/80">(B.Tech)</span>
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-base md:text-lg font-semibold text-white leading-tight">
                  Rose Mary Convent School
                </span>
                <span className="text-sm text-gray-500 font-mono shrink-0">2023 – 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                Senior Secondary School <span className="text-orange-400/80">(Non-Med)</span>
              </p>
            </div>
          </div>
        </motion.div>

        
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center justify-start gap-5 mt-17">
            <div className="oswald-font text-2xl uppercase tracking-widest text-white">Activity Feed</div>
            <div className="flex-1 h-[1px] bg-gray-500/50"></div>
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
                  <p className="text-white text-sm font-medium leading-snug group-hover/link:text-gray-300 transition-colors line-clamp-2">
                    {lastCommit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-white/5 border border-white/10 text-gray-400 font-mono px-2 py-0.5 rounded-md">
                      {lastCommit.repo}
                    </span>
                    <span className="text-gray-600 text-xs font-mono">{lastCommit.time}</span>
                  </div>
                </a>
              ) : (
                <p className="text-gray-500 text-sm">Loading...</p>
              )}
            </Card>

            <Card className="hover:border-white/10 transition-all duration-300">
              <SectionLabel icon={<MapPin size={10} />} label="Location" />
              <p className="text-white text-sm font-medium leading-tight">Punjab, India</p>
              <p className="text-gray-500 text-xs font-mono mt-1">IST · UTC+5:30</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

            <Card className="hover:border-white/10 transition-all duration-300">
              <SectionLabel icon={<DiscordIcon className="w-2.5 h-2.5" />} label="Discord Status" />
              {discordError ? (
                <div>
                  <p className="text-gray-400 text-sm font-medium">Not tracked yet</p>
                  <a
                    href="https://discord.gg/lanyard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-400 text-xs mt-1 flex items-center gap-1 transition-colors group/link"
                  >
                    Join discord.gg/lanyard to enable
                    <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusColors[discordStatus]}`} />
                    <span className="text-white text-sm font-semibold">{statusLabels[discordStatus]}</span>
                  </div>
                  {discordActivity ? (
                    <p className="text-gray-500 text-xs mt-1.5 truncate">Playing: {discordActivity}</p>
                  ) : (
                    <p className="text-gray-600 text-xs mt-1.5">No active activity</p>
                  )}
                </>
              )}
            </Card>


            <Card className="hover:border-white/10 transition-all duration-300 cursor-pointer">
              <SectionLabel icon={<BookOpen size={10} />} label="Guestbook" />
              <Link to="/guestbook" className="flex items-start justify-between group/link">
                <div>
                  <p className="text-white text-sm font-medium group-hover/link:text-gray-300 transition-colors">
                    Sign my guestbook ✨
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Leave a message for me!</p>
                </div>
                <ArrowUpRight size={14} className="text-gray-600 group-hover/link:text-white transition-colors shrink-0 mt-0.5" />
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
            <div className="oswald-font text-2xl uppercase tracking-widest text-white">Recent Blogs</div>
            <div className="flex-1 h-[1px] bg-gray-500/50"></div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex flex-col gap-3">
            {recentBlogs.length === 0 ? (
              <p className="text-gray-600 text-sm py-4">No blogs yet.</p>
            ) : recentBlogs.map((blog) => {
              const date = new Date(blog.createdAt);
              const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  className="group relative flex flex-col gap-2.5 p-5 rounded-xl border border-white/5 hover:border-white/10 bg-white/3 hover:bg-white/5 transition-all duration-300"
                >
                  <ArrowUpRight
                    size={15}
                    className="absolute top-4 right-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                  <p className="text-gray-600 text-[11px] font-mono uppercase tracking-widest">
                    {formatted}
                  </p>
                  <h3 className="text-white font-semibold text-base md:text-lg leading-snug pr-6 group-hover:text-gray-200 transition-colors">
                    {blog.subject}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {blog.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors mt-4 group/link"
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