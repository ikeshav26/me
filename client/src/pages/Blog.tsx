import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface BlogData {
  _id: string;
  subject: string;
  description: string;
  createdAt: string;
}

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data.blog);
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className={`w-8 h-8 border-4 border-t-blue-500 rounded-full animate-spin ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-red-400 font-mono text-sm underline">{error || 'Blog not found'}</div>
        <Link to="/blogs" className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}>
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto w-full pt-10 pb-20"
    >
      <Link 
        to="/blogs" 
        className={`inline-flex items-center gap-2 text-xs font-mono mb-12 uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'} transition-colors group`}
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to the collection
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <SectionLabel icon={<BookOpen size={10} />} label="Detailed Article" />
        </div>
        
        <h1 className={`oswald-font text-4xl md:text-6xl tracking-tight leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-black'} m-0 uppercase mb-8`}>
          {blog.subject}
        </h1>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-blue-500" />
            <span className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-orange-400" />
            <span className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {Math.ceil(blog.description.split(' ').length / 200)} min read
            </span>
          </div>
        </div>
      </header>

      <div className={`w-full h-px mb-12 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

      <article className={`text-base md:text-lg leading-relaxed font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2 border-gray-500/30" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
            p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-500 hover:text-blue-400 no-underline hover:underline transition-all" target="_blank" rel="noopener noreferrer" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="" {...props} />,
            code({node, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  style={theme === 'dark' ? atomDark : (prism as any)}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg border border-white/10 my-6 text-sm !bg-zinc-900/50"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`bg-gray-500/20 text-orange-400 font-mono text-sm rounded-md px-1.5 py-0.5 ${className || ''}`} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {blog.description}
        </ReactMarkdown>
      </article>

      <div className={`w-full h-px mt-20 mb-12 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

      <footer className="flex flex-col items-center justify-center p-12 text-center">
        <Link 
          to="/blogs" 
          className={`px-8 py-3 rounded-full border text-xs font-bold tracking-widest uppercase transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-black'} active:scale-95`}
        >
          Explore More Articles
        </Link>
      </footer>
    </motion.div>
  )
}

const SectionLabel = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
    const { theme } = useTheme();
    return (
      <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono`}>
        {icon}
        {label}
      </div>
    );
  };

export default Blog