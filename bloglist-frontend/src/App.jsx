import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(sortBlogsByLikes(blogs)))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('localUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const sortBlogsByLikes = (blogsToSort) => {
    return blogsToSort.toSorted((a, b) => b.likes - a.likes);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const createBlog = async (newBlog) => {
    const { title, author, url } = newBlog
    try {
      const blog = { title, author, url }
      const response = await blogService.saveNewBlog(blog)
      setBlogs(sortBlogsByLikes(blogs.concat(response)))
      setMessage(`Successfully added blog ${response.title} by ${response.author}`)
      newBlogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to create blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLikesCount = async (updatedBlog) => {
    try {
      const response = await blogService.updateLikesCount(updatedBlog)
      const updatedBlogs = blogs.map(blog => blog.id === response.data.id ? { ...blog, likes: response.data.likes } : blog)
      const sortedBlogs = sortBlogsByLikes(updatedBlogs)
      setBlogs(sortedBlogs)
      setMessage(`You liked blog ${updatedBlog.title} by ${updatedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to update like count')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete.id)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
      setBlogs(sortBlogsByLikes(updatedBlogs))
      setMessage(`Successfully deleted blog ${blogToDelete.title} by ${blogToDelete.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception) {
      setMessage('Failed to delete blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('localUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('localUser')
    setUser(null)
    setMessage('Logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs list</h1>
      <Notification message={message} />
      {user === null ?
        <Login handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} /> :
        <Blogs
          createBlog={createBlog}
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          newBlogFormRef={newBlogFormRef}
          updateLikesCount={updateLikesCount}
          deleteBlog={deleteBlog}
        />}
    </div>
  )
}

export default App
