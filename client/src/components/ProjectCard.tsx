import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps extends Project {
  delay?: number;
}

const ProjectCard = ({ title, description, longDescription, image, tags, link, github, delay = 0 }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay * 0.1, ease: 'easeOut' }}
        onClick={() => setModalOpen(true)}
        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:border-white/20 transition-all duration-300 flex flex-col h-full cursor-pointer hover:shadow-lg hover:shadow-orange-300/5"
      >
        {/* Image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5">
          <AnimatePresence mode="wait">
            {!imageLoaded && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white/10 animate-pulse rounded-xl"
              />
            )}
          </AnimatePresence>
          <img
            src={image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col grow">
          <h3 className="text-xl font-bold font-['Oswald'] tracking-wide text-white mb-2 group-hover:text-orange-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 font-['JetBrains_Mono'] text-sm mb-4 leading-relaxed grow line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-md whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-xs font-medium px-2 py-1 bg-orange-300/10 border border-orange-300/20 text-orange-300 rounded-md whitespace-nowrap">
                +{tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="w-full aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold font-['Oswald'] text-white tracking-wide mb-4">
                  {title}
                </h2>
                <p className="text-gray-400 font-['JetBrains_Mono'] text-sm leading-relaxed mb-6">
                  {longDescription || description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-orange-300 hover:bg-orange-300/80 hover:scale-105  text-black font-bold font-['Oswald'] rounded-lg transition-all text-sm tracking-wide"
                    >
                      <ExternalLink size={16} />
                      LIVE DEMO
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold font-['Oswald'] rounded-lg border border-white/10 transition-colors text-sm tracking-wide"
                    >
                      <FaGithub size={16} />
                      SOURCE CODE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
