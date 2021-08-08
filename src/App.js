import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()


  const Blogs = () => {
    return (
      <div>
        <h2>blogs</h2>
	  <p> {user.name} is logged in <button onClick={handleLogout}>logout</button> </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const LoginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <div> username
          <input
            id='username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div> password
          <input
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button id='login-button' type="submit">login</button>
        </div>
      </form>
    )
  }


  const handleCreateBlog = async (blogObject) => {
    const newBlog = {
      title:blogObject.title,
      author:blogObject.author,
      url:blogObject.url,
      likes:0,
      user:user.Id
    }
    const blog = await blogService.create(newBlog)
    console.log(blog)
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()

  }
  const handleLogin = async (event) => {

    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      null

    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }

  },[])

  return (
    <div>
      {user === null ?
        LoginForm() :
        Blogs()}
	 {user !== null && <Togglable buttonLabel ='create blog' ref={blogFormRef}>
	 {user !== null && <BlogForm handleCreateBlog={handleCreateBlog}/>}
	 </Togglable>}


	 </div>


  )

}
export default App