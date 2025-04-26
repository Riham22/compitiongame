
// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GameBoard from './components/gameBoard'
import PlayerSetup from './components/playerSetup'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PlayerSetup />,
    },
    {
      path: "/game",
      element: <GameBoard />,
    },
  ]);
  return (
    <>
    <RouterProvider router={routes}>
<PlayerSetup/>
    </RouterProvider>
    
      
    </>
  )
}

export default App
