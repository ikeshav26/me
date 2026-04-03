import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Send, MessageSquare, AlertCircle, Clock, CheckCircle2, Trash2, Pin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

interface GuestbookEntry {
  _id: string;
  reviewText: string;
  createdAt: string;
  reviewedBy: {
    name: string;
    avatarUrl: string;
    googleProviderId: string;
    isAuthor: boolean;
  };
}

const Guestbook = () => {
  const { theme } = useTheme();
  const { user, login, logout } = useAuth();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/all`);
      if (!res.ok) throw new Error('Failed to fetch guestbook messages');
      const data = await res.json();
      setEntries(data.reviews ?? []);
      setError(null);
    } catch (err) {
      console.error('Error fetching guestbook:', err);
      setError('Could not load guestbook. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!user || !message.trim() || posting) return;

    try {
      setPosting(true);
      const payload = {
        googleProviderId: user.googleProviderId,
        userId: user.userId,
        reviewText: message.trim()
      };
      
      console.log('Posting review with:', payload);
      
      if (!payload.googleProviderId && !payload.userId) {
          throw new Error('Authentication data is incomplete. Please try logging out and in again.');
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to post message');
      }

      await fetchEntries();
      setMessage("");
    } catch (err: any) {
      console.error('Error posting review:', err);
      alert(err.message || 'Failed to post message. Please try again.');
    } finally {
      setPosting(false);
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

  const handleDelete = async (reviewId: string) => {
    if (!user || posting) return;
    
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setPosting(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/delete/${reviewId}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'x-google-provider-id': user.googleProviderId
        },
        body: JSON.stringify({ googleProviderId: user.googleProviderId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete message');
      }

      await fetchEntries();
    } catch (err: any) {
      console.error('Error deleting review:', err);
      alert(err.message || 'Failed to delete message. Please try again.');
    } finally {
      setPosting(false);
    }
  };
console.log(entries.length)
  return (
    <div className="min-h-screen pt-18 pb-20 px-4 md:px-0 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className={`oswald-font text-5xl md:text-6xl tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} m-0 uppercase mb-4`}>
          GUESTBOOK
        </h1>
        <p className={`text-base md:text-lg font-['JetBrains_Mono'] max-w-xl font-light leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Leave a feedback, share your thoughts, or just say hi. Your words will stay here forever.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mb-12 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/5' : 'bg-black/3 border-black/5'} backdrop-blur-sm shadow-xl`}
      >
        {user ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-orange-300/50" />
                <div>
                  <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{user.name}</div>
                </div>
              </div>
              <button 
                onClick={logout}
                className={`flex cursor-pointer items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-black/10 text-gray-500 hover:text-black hover:bg-black/5'}`}
              >
                <LogOut size={14} />
                SIGN OUT
              </button>
            </div>

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something nice..."
                maxLength={500}
                className={`w-full h-32 p-4 rounded-xl text-sm md:text-base border focus:outline-none transition-all duration-300 resize-none ${
                    theme === 'dark' 
                        ? 'bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:bg-black/60' 
                        : 'bg-white/50 border-black/10 text-black placeholder:text-gray-400 focus:border-black/20 focus:bg-white/80'
                }`}
              />
              <div className={`absolute bottom-3 right-4 text-[10px] font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                {message.length}/500
              </div>
            </div>

            <button
              onClick={handlePost}
              disabled={!message.trim() || posting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold tracking-widest transition-all ${
                !message.trim() || posting
                  ? 'opacity-50 cursor-not-allowed bg-gray-500 text-white'
                  : 'bg-orange-300 text-gray-950 hover:bg-orange-400 active:scale-[0.98]'
              }`}
            >
              {posting ? "POSTING..." : "SIGN GUESTBOOK"}
              <Send size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Please sign in with Google to leave a message.
            </p>
            <button
              onClick={login}
              className={`inline-flex items-center gap-3 px-8 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 ${
                theme === 'dark' 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
              } active:scale-[0.98]`}
            >
              <LogIn size={20} />
              LOGIN WITH GOOGLE
            </button>
          </div>
        )}
      </motion.div>

      {/* Messages List */}
      <div className="mt-34">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="text-orange-300" size={20} />
          <h2 className={`oswald-font text-2xl uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-black'}`}>RECENT SIGNATURES</h2>
          <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
        </div>

        {error ? (
          <div className="text-center py-10 opacity-50 font-mono text-xs">
            <AlertCircle className="mx-auto mb-2" size={24} />
            {error}
          </div>
        ) : loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className={`h-32 rounded-2xl animate-pulse ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}></div>
          ))
        ) : entries.length > 0 ? (
          <AnimatePresence initial={false}>
            {entries.map((entry, index) => {
              if (!entry.reviewedBy) return null;
              
              return (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative py-6 ${index !== entries.length - 1 ? 'border-b' : ''} ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar src={entry.reviewedBy.avatarUrl} alt={entry.reviewedBy.name} className="w-10 h-10 rounded-full  opacity-60 group-hover:opacity-100 transition-all duration-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`font-semibold text-base truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          {entry.reviewedBy.name}
                        </div>
                        
                        {entry.reviewedBy.isAuthor && (
                          <div className="flex items-center gap-2 shrink-0">
                            <Pin size={14} className="text-blue-500 fill-blue-500/20 rotate-45" />
                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">
                              Author
                            </span>
                          </div>
                        )}
                        
                        <CheckCircle2 size={12} className="text-gray-400 shrink-0" />
                      </div>
                      
                      <div className={`flex items-center gap-1 text-[10px] font-mono shrink-0 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                        <Clock size={10} />
                        {getTimeAgo(entry.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className={`text-sm md:text-base leading-relaxed overflow-wrap-anywhere ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-black'} transition-colors`}>
                        {entry.reviewText}
                      </p>
                      
                      {user && user.googleProviderId === entry.reviewedBy.googleProviderId && (
                        <button 
                          onClick={() => handleDelete(entry._id)}
                          disabled={posting}
                          className={`p-2 rounded-lg transition-all hover:cursor-pointer ${
                            theme === 'dark' 
                              ? 'text-gray-600 hover:text-red-400 ' 
                              : 'text-gray-400 hover:text-red-500 '
                          }`}
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 opacity-30">
            <MessageSquare className="mx-auto mb-4" size={48} />
            <p className="font-mono text-sm">NO SIGNATURES YET. BE THE FIRST!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guestbook;