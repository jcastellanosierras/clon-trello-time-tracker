import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from './components/Board.tsx'
import Pomodoro from './components/Pomodoro.tsx'
import Home from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/board/:boardId',
        element: <Board />
      },
      {
        path: '/pomodoro',
        element: <Pomodoro />
      }
   ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
