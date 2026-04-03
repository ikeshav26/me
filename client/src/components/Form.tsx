import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";

const Form = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: import.meta.env.VITE_EMAIL_TO,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-17 mb-8">
      <div className={`max-w-2xl mx-auto rounded-xl p-1 ${theme === 'dark' ? 'bg-white/3 border-white/5' : 'bg-black/3 border-black/10'} border`}>
        <div className={`${theme === 'dark' ? 'bg-[#080808]' : 'bg-white'} rounded-xl p-6 sm:p-8 transition-colors duration-300`}>
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Send me a message</h2>
            <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} text-sm`}>
              Have a question or want to work together? Drop a message below.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' : 'bg-black/5 border-black/10 text-black focus:bg-black/8 focus:border-black/20'} border rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none transition-all duration-300`}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="hello@example.com"
                  className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' : 'bg-black/5 border-black/10 text-black focus:bg-black/8 focus:border-black/20'} border rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none transition-all duration-300`}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Let's work together!"
                className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' : 'bg-black/5 border-black/10 text-black focus:bg-black/8 focus:border-black/20'} border rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none transition-all duration-300`}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={`text-[11px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="What's on your mind?"
                rows={4}
                className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white focus:bg-white/10' : 'bg-black/5 border-black/10 text-black focus:bg-black/8 focus:border-black/20'} border rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none transition-all duration-300 resize-none`}
                required
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                <CheckCircle2 size={16} />
                Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                <AlertCircle size={16} />
                Failed to send message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-2 group relative w-full flex justify-center py-3 px-4 border ${theme === 'dark' ? 'border-white/10 bg-[#E5E5E5] hover:bg-white text-black' : 'bg-[#1a1a1a] hover:bg-black text-white'} text-sm font-medium rounded-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className={`animate-spin ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight size={16} className={`${theme === 'dark' ? 'text-gray-500 group-hover:text-black' : 'text-gray-400 group-hover:text-white'} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300`} />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
