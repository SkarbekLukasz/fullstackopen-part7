import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!isVisible)
  }

  const addLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(updatedBlog)
  }

  const isUserCreator = () => {
    const user = JSON.parse(window.localStorage.getItem('localUser'))
    console.log(user)
    return user.name === blog.user.name ? true : false
  }

  const deleteThis = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog)
    }
  }

  const styles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={styles} className='blog'>
      <p>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      </p>
      {isVisible && (
        <div className='blogDetails'>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLikes}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
      {isVisible && isUserCreator && (
        <button onClick={deleteThis}>remove</button>
      )}
    </div>
  )
}

export default Blog
