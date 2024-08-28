import { useState } from 'react'

const NewBlog = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    const changedAuthor = event.target.value
    setAuthor(changedAuthor)
  }

  const handleTitleChange = (event) => {
    const changedTitle = event.target.value
    setTitle(changedTitle)
  }

  const handleUrlChange = (event) => {
    const changedUrl = event.target.value
    setUrl(changedUrl)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(
      {
        author: author,
        title: title,
        url: url
      }
    )
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <h2>Add new</h2>
      <form onSubmit={addBlog}>
        <p>title: <input value={title} onChange={handleTitleChange} placeholder='Title'></input></p>
        <p>author: <input value={author} onChange={handleAuthorChange} placeholder='Author'></input></p>
        <p>url: <input value={url} onChange={handleUrlChange} placeholder='URL'></input></p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog