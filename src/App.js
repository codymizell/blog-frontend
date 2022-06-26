import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Alert from './components/Alert'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMsg, setAlertMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => {
      setAlertMsg('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      displayAlert(`logged in as ${user.username}`)
    } catch (exception) {
      displayAlert('wrong username or password')
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      console.log(blogObject)
      const newBlog = await blogService.create(blogObject)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      displayAlert(`blog posted: "${newBlog.title}" by ${newBlog.author}`)
    } catch (exception) {
      displayAlert(exception.response.data.error)
    }
  }

  const handleLikes = async (blog, id) => {
    try {
      const updatedBlog = await blogService.update(blog, id)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
        .sort((a, b) => a.likes > b.likes ? -1 : 1))
    } catch (exception) {
      displayAlert(exception.response.data.error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      displayAlert('blog deleted')
    } catch (exception) {
      displayAlert(exception.response.data.error)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null
        ? <div>
          <h2>log in to application</h2>
          <Alert msg={alertMsg} />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>

        : <div>
          <h2>blogs</h2>
          <Alert msg={alertMsg} />
          <h4>{user.username} <button onClick={handleLogout}>logout</button></h4>
          <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} deleteBlog={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
