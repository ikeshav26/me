import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, AlertCircle, Trash2, Inbox } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const Messages = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthor = user?.isAuthor || localStorage.getItem('isAuthor') === 'true';

  useEffect(() => {
    document.title = "Messages - Keshav Gilhotra";
    if (isAuthor) {
      fetchMessages();
    }
  }, [isAuthor]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/all`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setError(null);
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Could not load messages.');
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  const handleDelete = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages/${msgId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages(prev => prev.filter(m => m._id !== msgId));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Could not delete message.');
    }
  };

  if (!isAuthor) {
    return <Navigate to="/" replace />;
  }

  const cardBg = theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]';
  const cardBorder = theme === 'dark' ? 'border-white/[0.07]' : 'border-black/[0.07]';
  const cardHoverBorder = theme === 'dark' ? 'hover:border-white/[0.15]' : 'hover:border-black/[0.15]';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
            <Inbox className="text-orange-300" size={22} />
          </div>
          <h1
            className={`oswald-font text-4xl md:text-5xl tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} uppercase`}
          >
            Inbox
          </h1>
        </div>
        <p
          className={`text-sm md:text-base max-w-xl leading-relaxed font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
        >
          {messages.length > 0
            ? `${messages.length} message${messages.length !== 1 ? 's' : ''} from visitors.`
            : 'No messages yet.'}
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <AlertCircle className={`mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} size={28} />
          <p className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {error}
          </p>
        </motion.div>
      )}

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-28 rounded-2xl animate-pulse ${theme === 'dark' ? 'bg-white/[0.04]' : 'bg-black/[0.03]'}`}
            />
          ))}
        </div>
      )}

      {!loading && messages.length > 0 && (
        <div className="space-y-3 pb-12">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.25 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative p-5 md:p-6 mb-4 rounded-2xl border ${cardBg} ${cardBorder} ${cardHoverBorder} transition-all duration-300 overflow-hidden`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-all duration-500 font-bold text-lg ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`font-semibold text-base truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}
                        >
                          {msg.name}
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className={`truncate text-xs hover:underline transition-colors hidden sm:block ${theme === 'dark' ? 'text-gray-500 hover:text-orange-300' : 'text-gray-400 hover:text-orange-400'}`}
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div
                        className={`flex items-center gap-1 text-[10px] font-mono shrink-0 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}
                      >
                        <Clock size={10} />
                        {getTimeAgo(msg.createdAt)}
                      </div>
                    </div>

                    {msg.subject && (
                      <div className={`font-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`text-[10px] tracking-wider font-mono mr-2 ${theme === 'dark' ? 'text-orange-300/70' : 'text-orange-500/70'}`}>SUBJECT:</span>
                        {msg.subject}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`text-sm md:text-base leading-relaxed overflow-wrap-anywhere ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-black'} transition-colors`}
                      >
                        <span className={`text-[10px] tracking-wider font-mono mr-2 ${theme === 'dark' ? 'text-orange-300/70' : 'text-orange-500/70'}`}>MESSAGE:</span>
                        {msg.message}
                      </div>

                      <button
                        onClick={() => handleDelete(msg._id)}
                        className={`p-2 rounded-lg transition-all hover:cursor-pointer opacity-50 hover:opacity-100 shrink-0 ${theme === 'dark'
                          ? 'text-gray-600 hover:text-red-400 hover:bg-white/5'
                          : 'text-gray-400 hover:text-red-500 hover:bg-black/5'
                          }`}
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && messages.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-24"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 ${theme === 'dark' ? 'bg-white/[0.04]' : 'bg-black/[0.03]'}`}>
            <Mail className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} size={28} />
          </div>
          <p className={`font-mono text-sm tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            NO MESSAGES YET.
          </p>
          <p className={`font-mono text-[10px] mt-2 tracking-wider ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
            Your inbox is empty.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Messages;
