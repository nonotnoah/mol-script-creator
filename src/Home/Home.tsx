import React from 'react'
import ScriptEditor from '../ScriptEditor'
import { Fab, Grid } from '@mui/material'
import { Message, ScriptStore } from '../types'
import Project from './Project'
import { Add, PlusOne } from '@mui/icons-material'

export default function Home() {
  const [scripts, setScripts] = React.useState<ScriptStore[]>([])
  const [showScript, setShowScript] = React.useState<boolean>(false)
  const [newScript, setNewScript] = React.useState<boolean>(false)
  const script = React.useRef<ScriptStore>([])
  const load = () => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'false') as ScriptStore[] | boolean
    if (typeof scripts === 'object') {
      setScripts(scripts)
    }
    return false
  }
  React.useEffect(() => {
    load()
  }, [])

  const navigate = (chosenScript: ScriptStore) => {
    console.log(chosenScript)
    script.current = chosenScript
    setShowScript(true)
  }

  const createNewScript = () => {
    script.current = { script: [], title: '' }
    setShowScript(true)
  }

  return (
    <>
      <div className="home-wrapper">
        {!showScript && (
          <>
            <div className="title-wrapper">
              <h1>Scripts</h1>
            </div>
            <div className="projects-wrapper">
              <Grid container spacing={2}>
                <Grid item xs={3}key='new'>
                  <div
                    className="project-wrapper"
                    onClick={() => createNewScript()}
                  >
                    <h2 className="new-project-title">
                      <Add />
                    </h2>
                  </div>
                </Grid>
                {scripts.map((script, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Project script={script} navigate={(script) => navigate(script)}></Project>
                  </Grid>
                ))}
              </Grid>
            </div>
          </>
        )}
        {showScript && (
          <ScriptEditor loadedScript={script.current} />
        )}
      </div>
    </>
  )
}
