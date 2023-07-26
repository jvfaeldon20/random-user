import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import UserDisplay from './components/UserDisplay'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route 
        index 
        element={<UserDisplay/>}
      ></Route>
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App