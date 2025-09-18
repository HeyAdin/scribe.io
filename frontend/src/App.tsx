import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Signup />} path='sign-up'/>
      <Route element={<Signin />} path='sign-in' />
      <Route element ={<Blog />} path='blogs' />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
