import React from 'react'
import Heading from '../components/Heading'
import Project from '../components/Project'
import { projectsData } from '../assets/assets'


const Projects = () => {
  

  return (
    <div className='min-h-screen w-full py-12 sm:py-16 md:py-20'>
      <Heading text={"MY PROJECTS"}/>
      
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-12'>
        {projectsData.map((project, index) => (
          <Project
            key={index}
            number={project.number}
            title={project.title}
            tech={project.tech}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
