'use client'

import Header from '@/components/resume/Header'
import Introduce from '@/components/resume/Introduce'
import WorkExperience from '@/components/resume/WorkExperience'
import Project from '@/components/resume/Project'
import OtherExperience from '@/components/resume/OtherExperience'
import Skill from '@/components/resume/Skill'
import Etc from '@/components/resume/Etc'

const Resume = () => {
  return (
    <div className="mx-auto max-w-[768px] py-[60px] font-sans text-gray-700">
      <Header />
      <Introduce />
      <Skill />
      <WorkExperience />
      <Project />
      <OtherExperience />
      <Etc />
    </div>
  )
}

export default Resume
