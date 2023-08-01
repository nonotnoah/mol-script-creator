import { Fab } from '@mui/material'
import { ScriptStore, Store } from '../types'
import { Link } from 'react-router-dom'
import { DeleteOutline } from '@mui/icons-material'
interface ProjectProps {
  // navigate: (script: ScriptStore) => void,
  script: ScriptStore
  load: () => void
}
export default function Project({ load, script }: ProjectProps) {
  const deleteProject = (id: string) => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    if (scripts != null) {
      delete scripts[id]
      const updated = { ...scripts }
      localStorage.setItem('scripts', JSON.stringify(updated))
      load()
    }
  }

  return (
    <div
      className="project-wrapper"
    >
      <div className="project-delete-btn-wrapper hide">
        <Fab size='small' onClick={() => deleteProject(script.id)} className='delete-project-btn hide'>
          <DeleteOutline color='error' />
        </Fab>
      </div>
      <Link
        to={`script/${script.id}`}
        state={{
          id: script.id,
          script: script.script,
          info: { ...script.info }
        }}>
        <h2 className="project-title">
          {script.info.title}
        </h2>
        <p>{script.info.characters}</p>
      </Link>
    </div>
  )
}
