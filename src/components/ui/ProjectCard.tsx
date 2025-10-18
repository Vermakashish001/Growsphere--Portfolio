'use client'

import { useState } from 'react'
import { Project } from '@/types'
import { formatDate } from '@/utils'
import AnimatedCard from './AnimatedCard'
import Button from './Button'
import Icon from './Icon'

interface ProjectCardProps {
  project: Project
  index: number
  onViewProject?: (project: Project) => void
}

const ProjectCard = ({ project, index, onViewProject }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleViewProject = () => {
    if (onViewProject) {
      onViewProject(project)
    } else {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <AnimatedCard
      delay={index * 100}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        {/* Project Image */}
        <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {project.status === 'completed' && (
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      <Icon name="check" size={12} />
                      Completed
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="external-link"
                  onClick={handleViewProject}
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                />
              </div>
            </div>
          </div>

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                {project.title}
              </h3>
              {project.clientName && (
                <p className="text-sm text-gray-500">Client: {project.clientName}</p>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Icon name="clock" size={12} />
              {project.completedDate && formatDate(project.completedDate)}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies && project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-600">
                    <Icon name="check" size={12} className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <Button
            variant="outline"
            size="sm"
            fullWidth
            icon="eye"
            iconPosition="right"
            onClick={handleViewProject}
            className="group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600"
          >
            View Project
          </Button>
        </div>
      </div>
    </AnimatedCard>
  )
}

export default ProjectCard
