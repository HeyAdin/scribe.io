import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { ViewBlogs } from './pages/ViewBlogs'
import { Profile } from './pages/Profile'
import { Publish } from './pages/Publish'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path='sign-up' />
          <Route element={<Signin />} path='sign-in' />
          <Route path='blogs' >
            <Route index element={<Blogs />} />
            <Route path=':id' element={<ViewBlogs />} />
          </Route>
          <Route path='profile'>
            <Route path=':id' element={<Profile />} />
            <Route path='publish' element={<Publish />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
