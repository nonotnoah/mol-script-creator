import React from 'react'
import { Message, ScriptStore } from '../types'
import { Link } from 'react-router-dom'
interface ProjectProps {
  // navigate: (script: ScriptStore) => void,
  script: ScriptStore
}
export default function Project({ script }: ProjectProps) {

  return (
    <Link
      to={`script/${script.id}`}
      state={{
        id: script.id,
        script: script.script,
        info: { ...script.info }
      }}>
      <div
        className="project-wrapper"
      >
        <h2 className="project-title">
          title: {script.info.title}
        </h2>
      </div>
    </Link>
  )
}
