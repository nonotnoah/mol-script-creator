import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ScriptEditor from './ScriptEditor.tsx'
import Loading from './Loading.tsx'
import Home from './Home/Home.tsx'
// const ScriptEditor = React.lazy(() => import('./ScriptEditor.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Home />
  },
  {
    path: 'script/new',
    element:
      // <Suspense fallback={<Loading></Loading>}>
      <ScriptEditor />,
    // </Suspense >,
  },
  {
    path: 'script/:scriptId',
    element:
      // <Suspense fallback={<Loading></Loading>}>
      <ScriptEditor />,
    // </Suspense >,
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>,
)
