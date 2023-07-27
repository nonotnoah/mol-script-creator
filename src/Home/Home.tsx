import React from 'react'
import '../App.scss'
import { Grid } from '@mui/material'
import { ScriptStore, Store } from '../types'
import Project from './Project'
import { Add, } from '@mui/icons-material'
import { Outlet, Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default function Home() {
  const [scripts, setScripts] = React.useState<ScriptStore[]>([])
  const [show, setShow] = React.useState(false)
  const load = () => {
    // const stor = localStorage.getItem('scripts')
    // console.log("🚀 ~ file: Home.tsx:14 ~ load ~ stor:", stor)
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    if (scripts) {
      console.log("🚀 ~ file: Home.tsx:15 ~ load ~ scripts:", scripts)
      setScripts(Object.values(scripts))
    }
    return false
  }
  React.useEffect(() => {
    load()
  }, [])

  return (
    <>
      <div className="home-wrapper">
        <div className="title-wrapper">
          <h1>Scripts</h1>
        </div>
        <div className="projects-wrapper">
          <Grid container spacing={2}>
            <Grid item xs={3} key='new'>
              <Link to={`script/new`} state={{
                id: nanoid(5),
                script: [],
                title: 'Untitled Script'
              }}>
                <div
                  className="project-wrapper"
                // onClick={() => setShow(!show)}
                >
                  <h2 className="new-project-title">
                    <Add />
                  </h2>
                </div>
              </Link>
            </Grid>
            {scripts.map((script, idx) => (
              <Grid item xs={3} key={idx}>
                <Project script={script}></Project>
              </Grid>
            ))}

            <Grid item key='del'>
              <div onClick={() => localStorage.clear()} className="project-wrapper">
                delete
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}
