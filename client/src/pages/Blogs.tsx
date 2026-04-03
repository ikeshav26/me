import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, AlertCircle, BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

interface Blog {
  _id: string;
  subject: string;
  description: string;
  createdAt: string;
  tags?: string[];
}

const BlogSkeleton = () => {
    const { theme } = useTheme();
    return (
      <div className={`w-full py-10 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} animate-pulse`}>
        <div className="flex gap-6 md:gap-10">
          <div className={`h-8 w-12 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <div className="flex-1">
            <div className={`h-10 w-3/4 rounded mb-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            <div className={`h-4 w-1/2 rounded mb-6 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            <div className={`h-4 w-full rounded mb-2 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            <div className={`h-4 w-5/6 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
          </div>
        </div>
      </div>
    );
  };

const Blogs = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/all`);
          if (!res.ok) throw new Error('Failed to fetch blogs');
          const data = await res.json();
          const enhancedBlogs = (data.blogs ?? []).map((blog: Blog) => ({
            ...blog,
          }));
          setBlogs(enhancedBlogs);
          setError(null);
        } catch (err) {
          console.error('Error fetching blogs:', err);
          setError('Could not connect to the blog server. Please make sure the backend is running.');
        } finally {
          setLoading(false);
        }
      };
      
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen pt-18 pb-20 px-4 md:px-0 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center md:text-left"
      >
        <h1 className={`oswald-font text-6xl md:text-8xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'} m-0 uppercase mb-4`}>
          BLOGS
        </h1>
        <p className={`text-lg font-['JetBrains_Mono'] max-w-2xl font-light leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          An indexed collection of technical deep-dives and development logs.
        </p>
      </motion.div>

      {error ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className={`p-10 rounded-xl border flex flex-col items-center gap-4 text-center ${theme === 'dark' ? 'bg-red-400/5 border-red-400/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}
        >
          <AlertCircle size={32} />
          <div>
            <h3 className="font-bold text-xl mb-1">DATA LINK ERROR</h3>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col">
          {loading ? (
            Array(4).fill(0).map((_, i) => <BlogSkeleton key={i} />)
          ) : (
            <AnimatePresence>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/blogs/${blog._id}`}
                      className={`group flex items-start gap-6 md:gap-10 py-10 border-b ${theme === 'dark' ? 'border-white/10 hover:border-white/25' : 'border-black/10 hover:border-black/25'} transition-all duration-300 block`}
                    >
                      <span className={`oswald-font text-xl md:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-600 group-hover:text-white' : 'text-gray-400 group-hover:text-black'} transition-colors mt-2 shrink-0`}>
                        _{String(index + 1).padStart(2, '0')}.
                      </span>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold oswald-font tracking-tighter uppercase leading-tight text-blue-500 group-hover:text-blue-400 group-hover:underline underline-offset-8 transition-all duration-300`}>
                            {blog.subject}
                          </h2>
                          <ArrowUpRight 
                            size={28} 
                            className={`text-blue-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 hidden md:block shrink-0`}
                          />
                        </div>

                        <div className={`flex flex-wrap gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} transition-colors`}>
                          {blog.tags?.join(' • ')}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20">
                    <BookOpen size={48} className={`mx-auto mb-4 opacity-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono`}>INDEX EMPTY - NO LOGS FOUND</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}

      {!loading && !error && blogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-32 mb-10 text-center"
        >
          <div className={`h-px w-12 mx-auto mb-8 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
          <p className={`text-sm font-mono tracking-widest uppercase ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
            End of Index — Digital Garden • 2026
          </p>
          <p className={`mt-4 text-xs italic ${theme === 'dark' ? 'text-gray-700' : 'text-gray-500'}`}>
            "Code is my language, but writing is my way of sharing the story behind it."
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Blogs;