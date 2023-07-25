import React from 'react'
import { Message, ScriptStore } from '../types'
interface ProjectProps {
  navigate: (script: ScriptStore) => void,
  script: ScriptStore
}
export default function Project({ navigate, script }: ProjectProps) {

  return (
    <div
      className="project-wrapper"
      onClick={() => navigate(script)}
    >
      <h2 className="project-title">
        title: {script.title}
      </h2>
    </div>
  )
}
