import { GithubIcon } from '../icons/GithubIcon'

const Footer = () => {
  return (
    <div>
      <div className="h-px w-full mb-8" style={{ background: 'var(--divider)' }}></div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm t-dim font-mono max-w-2xl mx-auto">
        <p>© {new Date().getFullYear()} Keshav Gilhotra</p>
        
        <a 
          href="https://github.com/ikeshav26" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:t-primary transition-colors mt-4 sm:mt-0"
        >
          <GithubIcon className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  )
}

export default Footer