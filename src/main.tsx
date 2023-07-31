import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ScriptEditor from './ScriptEditor.tsx'
import Home from './Home/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Home />
  },
  {
    path: 'script/new',
    element:
      <ScriptEditor />,
  },
  {
    path: 'script/:scriptId',
    element:
      <ScriptEditor />,
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
